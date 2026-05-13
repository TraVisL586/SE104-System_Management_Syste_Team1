"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "./utils";

/**
 * InputOTP: Thành phần gốc quản lý logic nhập liệu cho toàn bộ dãy số.
 */
function InputOTP({
  className,
  containerClassName,
  ...props
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

/**
 * InputOTPGroup: Gom nhóm các ô (slot) lại với nhau.
 */
function InputOTPGroup({ className, ...props }) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

/**
 * InputOTPSlot: Đại diện cho một ô nhập ký tự đơn lẻ.
 * Xử lý hiển thị ký tự, con trỏ nhấp nháy và trạng thái focus.
 */
function InputOTPSlot({
  index,
  className,
  ...props
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md text-sm dark:bg-input/30",
        // Trạng thái Active/Focus
        "data-[active=true]:z-10 data-[active=true]:ring-[3px] data-[active=true]:border-ring data-[active=true]:ring-ring/50",
        // Trạng thái Error (Aria-invalid)
        "aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

/**
 * InputOTPSeparator: Dấu phân cách giữa các nhóm số (thường là dấu gạch ngang).
 */
function InputOTPSeparator({ ...props }) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };