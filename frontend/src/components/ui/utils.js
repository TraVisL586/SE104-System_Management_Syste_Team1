import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn: Hàm tiện ích để hợp nhất các class Tailwind CSS.
 * Kết hợp sức mạnh của 'clsx' (xử lý điều kiện) và 'twMerge' (xử lý xung đột class).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}