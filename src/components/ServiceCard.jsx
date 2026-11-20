'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80';

export default function ServiceCard({ service }) {
  const [imgSrc, setImgSrc] = useState(service?.image || FALLBACK_IMAGE);

  if (!service) return null;

  const formattedPrice = Number(service.price || 0).toFixed(2);
  const duration = service.duration || 60;

  return (
    <div className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      {/* Top Image Container */}
      <div className="h-56 w-full overflow-hidden relative bg-stone-100 shrink-0">
        <Image
          src={imgSrc}
          alt={service.serviceName || 'Salon Service'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          unoptimized
        />
        {/* Floating Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#FAF8F5]/95 backdrop-blur-xs text-amber-800 text-xs font-semibold px-3 py-1 rounded-full shadow-xs border border-stone-200/50">
            {service.category || 'Treatment'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
              {service.serviceName}
            </h3>
            <span className="text-amber-800 font-bold text-lg shrink-0">
              ${formattedPrice}
            </span>
          </div>

          <p className="text-stone-600 text-sm leading-relaxed line-clamp-2">
            {service.description || 'Indulge in a signature personalized salon experience with our certified therapists and stylists.'}
          </p>
        </div>

        <div className="space-y-4 pt-3 border-t border-stone-100">
          {/* Duration Badge */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <Clock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{duration} mins</span>
          </div>

          {/* Book & View Details Button */}
          <Link
            href={`/services/${service._id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-stone-900 bg-stone-100 hover:bg-amber-800 hover:text-white transition-all duration-200 group-hover:border-amber-800/20 active:scale-98"
          >
            <span>Book & View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
