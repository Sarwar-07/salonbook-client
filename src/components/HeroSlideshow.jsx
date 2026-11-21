'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircle2, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85';

const HERO_SLIDES = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85',
    badge: 'MADISON AVE FLAGSHIP',
    title: 'Architectural Salon Interior',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85',
    badge: 'MASTER STYLING ATELIER',
    title: 'Master Hair Styling & Blowout',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=85',
    badge: 'BOTANICAL SPA SANCTUARY',
    title: 'Holistic Botanical Spa Ritual',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=85',
    badge: 'BESPOKE GROOMING SUITE',
    title: 'Precision Grooming & Facial Lounge',
  },
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      className="relative mx-auto max-w-md lg:max-w-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Architectural Gold Halo Border */}
      <div className="absolute -inset-3.5 rounded-[2.5rem] bg-gradient-to-br from-[#C89B6E]/30 via-transparent to-[#A2683A]/20 transform rotate-1 hidden sm:block pointer-events-none" />

      {/* Main Slideshow Frame */}
      <div className="relative h-[450px] sm:h-[530px] rounded-[2rem] overflow-hidden shadow-2xl border border-stone-800 bg-stone-900 group">
        {/* Render Slides with Crossfade */}
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          const src = imgErrors[slide.id] ? FALLBACK_IMAGE : slide.image;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={src}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                onError={() =>
                  setImgErrors((prev) => ({
                    ...prev,
                    [slide.id]: true,
                  }))
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            </div>
          );
        })}

        {/* Top-Right Dynamic Pill Badge */}
        <div className="absolute top-4 right-4 z-20 bg-[#121110]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-stone-700 flex items-center gap-1.5 text-xs text-white select-none">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#C89B6E]" />
          <span className="text-[10px] uppercase font-bold tracking-wider">
            {currentSlide.badge}
          </span>
        </div>

        {/* Subtle Frosted Prev/Next Chevron Controls */}
        <div className="absolute inset-y-0 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="pointer-events-auto p-2 rounded-full bg-[#121110]/60 hover:bg-[#121110]/90 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-md active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="pointer-events-auto p-2 rounded-full bg-[#121110]/60 hover:bg-[#121110]/90 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-md active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sleek Bottom-Right Slide Indicator Dots */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-[#121110]/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-700/80 shadow-lg">
          {HERO_SLIDES.map((slide, index) => {
            const active = index === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  active ? 'w-6 bg-[#C89B6E]' : 'w-2 bg-white/40 hover:bg-white/75'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Floating Glassmorphic Trust Badge */}
      <div className="absolute -bottom-6 -left-4 sm:-left-6 z-20 bg-[#1C1A18]/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/10 max-w-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C89B6E] to-[#824D25] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div>
            <p className="font-serif font-bold text-sm sm:text-base text-white leading-tight">
              4.9★ Client Rating
            </p>
            <p className="text-[11px] text-[#C89B6E] font-semibold uppercase tracking-wider mt-0.5">
              Certified Master Stylists
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
