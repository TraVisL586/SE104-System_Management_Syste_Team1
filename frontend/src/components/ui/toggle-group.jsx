"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "./utils";
import { toggleVariants } from "./toggle";

// Tạo Context để quản lý style chung cho cả nhóm
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
});

/**
 * ToggleGroup: Container bọc ngoài các nút chuyển đổi.
 * @param {string} type - "single" (chọn 1) hoặc "multiple" (chọn nhiều).
 */
function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-sm",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

/**
 * ToggleGroupItem: Các nút bấm riêng lẻ trong nhóm.
 * Tự động bo góc ở hai đầu và làm phẳng ở giữa để tạo thành một khối thống nhất.
 */
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        // Logic xử lý bo góc: chỉ bo góc trái cho nút đầu tiên và góc phải cho nút cuối cùng
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10",
        // Tránh bị trùng viền (double border) khi dùng variant outline
        "data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };