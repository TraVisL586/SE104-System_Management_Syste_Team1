"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "./utils";

/**
 * Label: Nhãn cho các phần tử nhập liệu.
 * Tích hợp sẵn logic xử lý trạng thái disabled từ các phần tử "peer" (như Checkbox, Input).
 */
function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        // Cấu trúc & Typography
        "text-sm font-medium leading-none select-none",
        "flex items-center gap-2",
        // Xử lý trạng thái khi Input/Checkbox bị disabled (dùng peer- của Tailwind)
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        // Xử lý trạng thái khi nằm trong một group bị disabled
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };