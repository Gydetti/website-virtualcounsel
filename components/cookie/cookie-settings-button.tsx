"use client";

import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

export default function CookieSettingsButton() {
  const { resetConsent } = useCookieConsent();

  // For Cookiebot integration
  const handleOpenCookieSettings = () => {
    // If using Cookiebot
    if (typeof window !== "undefined" && window.Cookiebot) {
      window.Cookiebot.show();
    } else {
      // If using our custom solution
      resetConsent();
    }
  };

  return (
    <Button
      variant="link"
      className="p-0 h-auto text-sm"
      onClick={handleOpenCookieSettings}
    >
      Cookie settings
    </Button>
  );
}
