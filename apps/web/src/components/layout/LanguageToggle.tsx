import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setAppLanguage } from "@/i18n";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === "hi";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setAppLanguage(isHindi ? "en" : "hi")}
      aria-label="Switch language"
    >
      <Languages />
      {isHindi ? "English" : "हिन्दी"}
    </Button>
  );
}
