'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const LUXURY_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80';

export default function ServiceImage({
  src,
  alt = 'Salon treatment',
  fill = true,
  className = 'object-cover',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  ...props
}) {
  const [failedSrc, setFailedSrc] = useState(null);

  // Fall back to luxury photo if src is missing or if this specific URL failed to load
  const isFailed = Boolean(src && failedSrc === src);
  const resolvedSrc = !src || isFailed ? LUXURY_FALLBACK_IMAGE : src;

  return (
    <Image
      src={resolvedSrc}
      alt={alt || 'Salon treatment'}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => {
        if (src) {
          setFailedSrc(src);
        }
      }}
      unoptimized
      {...props}
    />
  );
}
