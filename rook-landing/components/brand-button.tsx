"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BrandButtonProps = React.ComponentProps<typeof Button> & {
  size?: "default" | "lg";
};

export function BrandButton({ size = "default", className, ...rest }: BrandButtonProps) {
  return (
    <Button
      size={size}
      className={cn(
        "bg-rook text-background hover:bg-rook-hover",
        size === "lg" && "h-12 px-8 text-[15px] font-semibold",
        className,
      )}
      {...rest}
    />
  );
}
