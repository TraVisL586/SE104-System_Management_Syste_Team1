import { cn } from "./utils";

/**
 * Skeleton: Hiển thị một khối mờ ảo với hiệu ứng nhấp nháy.
 * Thường dùng để thay thế ảnh, dòng chữ hoặc nút bấm trong lúc chờ tải dữ liệu.
 */
function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent animate-pulse rounded-md",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };