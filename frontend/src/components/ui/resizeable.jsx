"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "./utils";

/**
 * ResizablePanelGroup: Container chính xác định hướng (ngang/dọc) của các tấm panel.
 */
function ResizablePanelGroup({
  className,
  ...props
}) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

/**
 * ResizablePanel: Một tấm panel đơn lẻ trong nhóm.
 * Bạn có thể set defaultSize, minSize, maxSize tại đây.
 */
function ResizablePanel({
  ...props
}) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

/**
 * ResizableHandle: Thanh ngăn cách dùng để kéo thay đổi kích thước.
 * @param {boolean} withHandle - Hiển thị thêm icon dấu chấm (grip) để dễ nhận diện.
 */
function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        // Cấu trúc & Màu sắc thanh ngăn
        "bg-border relative flex w-px items-center justify-center transition-all outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        // Tạo vùng click rộng hơn (after:) để dễ cầm nắm
        "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
        // Xử lý khi hướng là theo chiều dọc (Vertical)
        "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
        // Xoay icon khi ở chế độ dọc
        "[&[data-panel-group-direction=vertical]>div]:rotate-90",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };