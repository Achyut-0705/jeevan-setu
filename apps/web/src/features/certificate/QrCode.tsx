import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Renders the same QR payload the PDF embeds — the certificate's verification URL.
 * The encoder is loaded on demand so it never lands in the dashboard bundle.
 */
export function QrCode({ value, size = 132 }: { value: string; size?: number }) {
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    setDataUrl(null);
    setFailed(false);

    void (async () => {
      try {
        const QRCode = await import("qrcode");
        const url = await QRCode.toDataURL(value, { margin: 1, width: size * 2 });
        if (!cancelled) setDataUrl(url);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [value, size]);

  if (failed) {
    // The printed code below the QR is still usable, so a failed encode is not fatal.
    return (
      <div
        className="text-muted-foreground flex items-center justify-center text-center text-xs"
        style={{ width: size, height: size }}
      >
        {value}
      </div>
    );
  }

  if (!dataUrl) return <Skeleton style={{ width: size, height: size }} />;

  return (
    <img
      src={dataUrl}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}
