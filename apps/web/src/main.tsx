import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import "@/i18n";
import "@/index.css";
import App from "./App";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/context/AuthContext";
import { OnboardingProvider } from "@/features/onboarding/OnboardingProvider";
import { A11yProvider } from "@/context/A11yContext";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <A11yProvider>
        <TooltipProvider delayDuration={300}>
          <BrowserRouter>
            <AuthProvider>
              <OnboardingProvider>
                <App />
                <Toaster position="top-right" richColors />
              </OnboardingProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </A11yProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
