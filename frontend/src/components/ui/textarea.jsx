import * as React from "react";
import { cn } from "./utils";

/**
 * Textarea: Vùng nhập liệu văn bản nhiều dòng.
 * Tự động co giãn theo nội dung nhờ thuộc tính field-sizing-content.
 */
function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Layout & sizing
        "flex min-h-16 w-full rounded-md border px-3 py-2 text-base md:text-sm",
        "resize-none field-sizing-content", // Tự động co giãn, không cho phép kéo thủ công
        // Colors & Background
        "border-input bg-input-background placeholder:text-muted-foreground dark:bg-input/30",
        // Focus state (Hiệu ứng vòng ring đặc trưng)
        "outline-none transition-[color,box-shadow]",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // Error state (Khi có lỗi - aria-invalid)
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };