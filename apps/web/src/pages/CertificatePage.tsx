import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Download, Share2, ArrowLeft, Loader2, CircleAlert, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { api, ApiClientError, downloadFile } from "@/lib/api";
import { CertificateDocument, type CertificateView } from "@/features/certificate/CertificateDocument";

export function CertificatePage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  void i18n.language;
  const navigate = useNavigate();
  const [downloading, setDownloading] = React.useState(false);

  const certQuery = useQuery({
    queryKey: ["certificate", id],
    queryFn: () => api<{ view: CertificateView }>(`/certificates/${id}`),
    enabled: !!id,
    retry: false,
  });

  async function handleDownload() {
    setDownloading(true);
    try {
      // The server names the file (holder + issue date); we only supply a fallback.
      await downloadFile(`/certificates/${id}/download`, "life-certificate.pdf");
      toast.success(t("certificate.downloadStarted"));
    } catch (err) {
      toast.error(err instanceof ApiClientError ? err.message : t("certificate.downloadFailed"));
    } finally {
      setDownloading(false);
    }
  }

  async function handleShare() {
    const url = certQuery.data?.view.verifyUrl;
    if (!url) return;
    if (navigator.share) {
      await navigator.share({ title: t("certificate.title"), url }).catch(() => undefined);
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t("certificate.shareCopied"));
    } catch {
      toast.error(t("common.somethingWrong"));
    }
  }

  if (certQuery.isLoading) return <Skeleton className="h-[32rem] w-full rounded-xl" />;

  if (certQuery.isError) {
    const err = certQuery.error;
    return (
      <div className="mx-auto w-full max-w-2xl space-y-4">
        <Button variant="ghost" size="sm" className="-ml-2" onClick={() => navigate("/certificates")}>
          <ArrowLeft />
          {t("common.back")}
        </Button>
        <Alert variant="destructive">
          <CircleAlert className="size-4" />
          <AlertTitle>{t("certificate.notFound")}</AlertTitle>
          <AlertDescription>
            {err instanceof ApiClientError ? err.message : t("common.somethingWrong")}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const view = certQuery.data!.view;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <Button variant="ghost" size="sm" className="-ml-2" onClick={() => navigate("/certificates")}>
        <ArrowLeft />
        {t("common.back")}
      </Button>

      {view.kind === "provisional" && (
        <Alert>
          <Video className="size-4" />
          <AlertTitle>{t("certificate.callRequired")}</AlertTitle>
          <AlertDescription className="flex flex-col items-start gap-3">
            {t("certificate.provisionalNotice")}
            <Button size="sm" onClick={() => navigate("/call")}>
              <Video />
              {t("call.book")}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <CertificateDocument view={view} />

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleDownload} disabled={downloading}>
          {downloading ? <Loader2 className="animate-spin" /> : <Download />}
          {t("certificate.download")}
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 />
          {t("certificate.share")}
        </Button>
      </div>
    </div>
  );
}
