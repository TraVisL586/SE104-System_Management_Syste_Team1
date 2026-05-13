"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/**
 * Collapsible Root: Thành phần bao ngoài cùng để quản lý trạng thái đóng/mở.
 */
function Collapsible({ ...props }) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

/**
 * Collapsible Trigger: Nút bấm hoặc thành phần dùng để kích hoạt việc đóng/mở.
 */
function CollapsibleTrigger({ ...props }) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

/**
 * Collapsible Content: Phần nội dung sẽ được ẩn hoặc hiện dựa trên trạng thái.
 */
function CollapsibleContent({ ...props }) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };