'use client';

import { useState } from 'react';

interface ClinicImageProps {
  slug: string;
  name: string;
  area: string;
  className?: string;
}

export default function ClinicImage({ slug, name, area, className = '' }: ClinicImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary-500 to-accent-500 ${className}`}>
        <div className="text-center px-4">
          <svg className="w-10 h-10 mx-auto mb-2 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p className="text-white/80 text-sm font-medium line-clamp-2">{name}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={`/images/clinics/${slug}.jpg`}
      alt={`${name} - dental clinic in ${area}`}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
