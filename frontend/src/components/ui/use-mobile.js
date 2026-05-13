"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * useIsMobile: Hook để kiểm tra xem người dùng có đang sử dụng thiết bị di động hay không.
 * Dựa trên kích thước chiều rộng màn hình (viewport).
 */
export function useIsMobile() {
  // Khởi tạo state là undefined để tránh xung đột giữa Server và Client trong Next.js (Hydration)
  const [isMobile, setIsMobile] = React.useState(undefined);

  React.useEffect(() => {
    // Sử dụng matchMedia để lắng nghe sự thay đổi của kích thước màn hình
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Đăng ký sự kiện thay đổi
    mql.addEventListener("change", onChange);

    // Kiểm tra trạng thái ngay lần đầu tiên component mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Hủy đăng ký sự kiện khi component bị unmount để tránh rò rỉ bộ nhớ
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Trả về giá trị boolean (ép kiểu !! để chắc chắn không trả về undefined)
  return !!isMobile;
}