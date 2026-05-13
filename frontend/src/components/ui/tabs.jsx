"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils";

/**
 * Tabs Root: Quản lý giá trị tab đang hoạt động.
 */
function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

/**
 * TabsList: Thanh chứa các nút chuyển đổi (Triggers).
 */
function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px]",
        className,
      )}
      {...props}
    />
  );
}

/**
 * TabsTrigger: Nút bấm để kích hoạt một tab.
 * Có hiệu ứng active tinh tế phù hợp với cả Light và Dark mode.
 */
function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all outline-none",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        // Trạng thái Active
        "data-[state=active]:bg-card data-[state=active]:text-foreground shadow-sm",
        // Dark mode adjustments
        "dark:data-[state=active]:bg-input/30 dark:data-[state=active]:border-input",
        "text-foreground dark:text-muted-foreground dark:data-[state=active]:text-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * TabsContent: Phần hiển thị nội dung tương ứng với mỗi tab.
 */
function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };