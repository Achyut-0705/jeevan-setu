const TOKEN_KEY = "jeevansetu.tokens";
const DEVICE_KEY = "jeevansetu.deviceFingerprint";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export function getDeviceFingerprint(): string {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = `web-${crypto.randomUUID()}`;
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

export function getTokens(): AuthTokens | null {
  const raw = localStorage.getItem(TOKEN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthTokens;
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
}

export function setTokens(tokens: AuthTokens | null) {
  if (tokens) localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  else localStorage.removeItem(TOKEN_KEY);
}

export class ApiClientError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
  }
}

let refreshPromise: Promise<AuthTokens | null> | null = null;

async function refreshTokens(): Promise<AuthTokens | null> {
  const current = getTokens();
  if (!current) return null;
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: current.refreshToken }),
  });
  if (!res.ok) {
    setTokens(null);
    return null;
  }
  const data = (await res.json()) as AuthTokens;
  setTokens(data);
  return data;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  /** Attach the access token when one is present. Default true. */
  auth?: boolean;
}

export async function api<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body: payload, auth = true } = options;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  headers["x-device-fingerprint"] = getDeviceFingerprint();

  if (auth) {
    const tokens = getTokens();
    if (tokens) headers["Authorization"] = `Bearer ${tokens.accessToken}`;
  }

  const doFetch = () =>
    fetch(`/api${path}`, {
      method,
      headers,
      body: payload !== undefined ? JSON.stringify(payload) : undefined,
    });

  let res = await doFetch();

  if (res.status === 401 && auth) {
    if (!refreshPromise) refreshPromise = refreshTokens().finally(() => (refreshPromise = null));
    const refreshed = await refreshPromise;
    if (refreshed) {
      headers["Authorization"] = `Bearer ${refreshed.accessToken}`;
      res = await doFetch();
    }
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = (json as { error?: { code: string; message: string } }).error;
    throw new ApiClientError(res.status, err?.code ?? "UNKNOWN", err?.message ?? "Something went wrong.");
  }
  return json as T;
}

/**
 * Downloads a file, honouring the filename the server chose in Content-Disposition.
 * Kept separate from `api()` because a PDF is not JSON and the caller wants the
 * filename, not just the bytes.
 */
export async function downloadFile(path: string, fallbackName: string): Promise<void> {
  const tokens = getTokens();
  const res = await fetch(`/api${path}`, {
    headers: {
      "x-device-fingerprint": getDeviceFingerprint(),
      ...(tokens ? { Authorization: `Bearer ${tokens.accessToken}` } : {}),
    },
  });

  if (!res.ok) {
    const json = (await res.json().catch(() => ({}))) as { error?: { code: string; message: string } };
    throw new ApiClientError(
      res.status,
      json.error?.code ?? "UNKNOWN",
      json.error?.message ?? "We could not prepare that download."
    );
  }

  const disposition = res.headers.get("Content-Disposition") ?? "";
  const match = /filename="?([^";]+)"?/i.exec(disposition);
  const filename = match?.[1] ?? fallbackName;

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke on the next tick so the click has actually started the download.
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
