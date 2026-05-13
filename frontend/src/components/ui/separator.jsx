"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "./utils";

/**
 * Separator: Đường kẻ phân cách giữa các thành phần.
 * @param {string} orientation - "horizontal" (ngang) hoặc "vertical" (dọc).
 * @param {boolean} decorative - Nếu true, trình đọc màn hình sẽ bỏ qua phần tử này.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0",
        // Kiểu dáng cho đường kẻ ngang
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        // Kiểu dáng cho đường kẻ dọc
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };