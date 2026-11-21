'use client';

import React from 'react';
import Link from 'next/link';
import ServiceImage from '@/components/ServiceImage';
import { Clock, ArrowRight } from 'lucide-react';
import { getMatchingProtagonist } from '@/data/gtaProtagonists';

export default function ServiceCard({ service }) {
  if (!service) return null;

  const formattedPrice = Number(service.price || 0).toFixed(0);
  const duration = service.duration || 60;
  const protagonist = getMatchingProtagonist(service);

  return (
    <article className="group bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:border-[#C89B6E]/50 transition-all duration-300 flex flex-col h-full">
      {/* Edge-to-edge 4:3 Photography */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <ServiceImage
          src={service.image}
          alt={service.serviceName || 'Salon treatment'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating Category Pill & Neon Modeled By Badge in GTA 6 mode */}
        <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1.5">
          <span className="bg-white/90 backdrop-blur-md text-[#824D25] text-[10px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full shadow-xs border border-white/60">
            {service.category || 'Treatment'}
          </span>

          {protagonist && (
            <span className="hidden gta6:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0D0722]/90 backdrop-blur-md text-[#00F0FF] border border-[#FF2E93]/70 shadow-[0_0_12px_rgba(255,46,147,0.55)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E93] animate-pulse" />
              <span>Modeled by {protagonist.name}</span>
            </span>
          )}
        </div>

        {/* Tabular Price Tag Overlay */}
        <div className="absolute bottom-4 right-4 z-10 bg-[#121110]/90 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-xs font-serif font-bold shadow-sm">
          ${formattedPrice}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-2xl font-bold text-[#121110] group-hover:text-[#824D25] transition-colors leading-snug line-clamp-1">
              {service.serviceName}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2 font-normal">
            {service.description ||
              'Indulge in a signature personalized salon experience with our certified therapists and master stylists.'}
          </p>
        </div>

        {/* Duration Meta & Full-width Dark Pill Button */}
        <div className="space-y-4 pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C89B6E]" />
              <span>{duration} mins ritual</span>
            </div>
            <span className="text-[11px] font-semibold text-[#824D25] uppercase tracking-wider">
              Instant Booking
            </span>
          </div>

          <Link
            href={`/services/${service._id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#121110] hover:bg-[#25221F] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-200 group-hover:shadow-md active:scale-98"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
