"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

/**
 * Component AspectRatio giúp duy trì tỷ lệ khung hình cho nội dung bên trong (ví dụ: ảnh, video).
 */
function AspectRatio({ ...props }) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };