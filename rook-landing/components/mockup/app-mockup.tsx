"use client";

import type { ThemeColors } from "@/lib/themes";
import { TitleBar } from "./title-bar";
import { Sidebar } from "./sidebar";
import { AuthAnimatedEditor } from "./auth-editor";
import { DsaAnimatedEditor } from "./dsa-editor";
import { AwsStaticEditor } from "./aws-editor";

export type MockupVariant = "auth" | "dsa" | "aws";

export function AppMockup({ theme: t, variant = "auth" }: { theme: ThemeColors; variant?: MockupVariant; }) {
  const isLight = t.name === "Light" || t.name === "Paper";

  return (
    <div className="relative w-full max-w-[960px] mx-auto" role="presentation">
      <div
        className="relative rounded-xl shadow-2xl overflow-hidden transition-colors duration-500"
        style={{
          backgroundColor: t.bg,
          border: `1px solid ${t.border}`,
          filter: isLight ? "brightness(0.82)" : undefined,
        }}
      >
        <TitleBar t={t} />

        <div className="flex min-h-[440px]">
          <Sidebar t={t} variant={variant} />
          <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
            <div className="flex-1 overflow-hidden transition-colors duration-500" style={{ backgroundColor: t.bg }}>
              {variant === "auth" ? <AuthAnimatedEditor t={t} />
                : variant === "aws" ? <AwsStaticEditor t={t} />
                  : <DsaAnimatedEditor t={t} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
