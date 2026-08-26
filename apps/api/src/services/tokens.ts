import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { env } from "../env";
import { findRefreshTokenByHash, insertRefreshToken, refreshTokensTable } from "../db/repo";

const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
const REFRESH_TOKEN_TTL_DAYS = 30;

export interface AccessTokenClaims {
  sub: string; // userId
  mobile: string;
}

export function signAccessToken(claims: AccessTokenClaims): string {
  return jwt.sign(claims, env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL_SECONDS });
}

export function verifyAccessToken(token: string): AccessTokenClaims {
  return jwt.verify(token, env.JWT_SECRET) as AccessTokenClaims;
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function issueRefreshToken(userId: string, deviceId: string | null): string {
  const raw = `${nanoid(32)}.${jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: `${REFRESH_TOKEN_TTL_DAYS}d`,
  })}`;
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString();
  insertRefreshToken({
    id: `rt_${nanoid(8)}`,
    userId,
    tokenHash: hashToken(raw),
    deviceId,
    expiresAt,
    revokedAt: null,
  });
  return raw;
}

export function rotateRefreshToken(rawToken: string): { userId: string; newToken: string } | null {
  const hash = hashToken(rawToken);
  const record = findRefreshTokenByHash(hash);
  if (!record || record.revokedAt || new Date(record.expiresAt) < new Date()) return null;

  try {
    jwt.verify(rawToken.split(".").slice(1).join("."), env.JWT_REFRESH_SECRET);
  } catch {
    return null;
  }

  refreshTokensTable.update(record.id, { ...record, revokedAt: new Date().toISOString() });
  const newToken = issueRefreshToken(record.userId, record.deviceId);
  return { userId: record.userId, newToken };
}

export function issueTokenPair(userId: string, mobile: string, deviceId: string | null) {
  return {
    accessToken: signAccessToken({ sub: userId, mobile }),
    refreshToken: issueRefreshToken(userId, deviceId),
    expiresIn: ACCESS_TOKEN_TTL_SECONDS,
  };
}
