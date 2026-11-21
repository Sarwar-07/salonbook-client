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
    <article className="group bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#A2683A]/40 transition-all duration-300 flex flex-col h-full">
      {/* Editorial 4:3 Aspect Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <Image
          src={imgSrc}
          alt={service.serviceName || 'Salon treatment'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Frosted Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/90 backdrop-blur-md text-[#824D25] text-[10px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full shadow-xs border border-white/50">
            {service.category || 'Ritual'}
          </span>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 right-4 z-10 bg-[#181512]/90 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-xs font-serif font-bold shadow-sm">
          ${formattedPrice}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
        <div className="space-y-2.5">
          <h3 className="font-serif text-2xl font-bold text-[#181512] group-hover:text-[#824D25] transition-colors leading-snug line-clamp-1">
            {service.serviceName}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2 font-normal">
            {service.description ||
              'Indulge in a signature personalized salon experience with our certified therapists and master stylists.'}
          </p>
        </div>

        {/* Duration & Details Button Footer */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#A2683A]" />
            <span>{duration} mins</span>
          </div>

          <Link
            href={`/services/${service._id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-bold text-[#824D25] bg-[#FAF7F2] hover:bg-[#824D25] hover:text-[#FAF7F2] transition-all duration-200"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
