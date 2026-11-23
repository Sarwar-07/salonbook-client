import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SalonAtelierBackdrop from '@/components/SalonAtelierBackdrop';
import ViceCityBackdrop from '@/components/ViceCityBackdrop';
import {
  Sparkles,
  Award,
  Leaf,
  ShieldCheck,
  ArrowRight,
  Heart,
  Scissors,
  Droplets,
  Flower2,
} from 'lucide-react';

export const metadata = {
  title: 'About Our Sanctuary | SalonBook Haute Salon & Spa',
  description:
    'Discover the artistry, philosophy, and master artisans behind SalonBook luxury salon and spa.',
};

export default function AboutPage() {
  const artisans = [
    {
      name: 'Aria Montgomery',
      role: 'Creative Hair & Color Director',
      experience: '12+ Years Experience',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      icon: Scissors,
      specialty: 'French Balayage, precision scissor carving & bespoke thermal styling',
      bio: 'Trained in Paris and Milan, Aria blends runway avant-garde techniques with everyday effortless elegance.',
    },
    {
      name: 'Camille Laurent',
      role: 'Lead Clinical Esthetician',
      experience: '10+ Years Experience',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      icon: Droplets,
      specialty: 'HydraGlow dermal infusion, micro-current contouring & botanical peels',
      bio: 'A certified master of European facial therapies, Camille specializes in restorative barrier repair and luminous age-defiance.',
    },
    {
      name: 'Mateo Rossi',
      role: 'Holistic Spa & Body Director',
      experience: '14+ Years Experience',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      icon: Flower2,
      specialty: 'Himalayan basalt stone therapy, deep muscle relief & sound baths',
      bio: 'Dedicated to somatic recovery and mindfulness, Mateo crafts transformative therapies that release deep neuromuscular stress.',
    },
  ];

  const standards = [
    {
      icon: Award,
      title: 'Artisanal Precision',
      description:
        'Every cut, customized glaze, and dermal infusion is tailored specifically to your bone structure, skin barrier, and lifestyle rhythm.',
    },
    {
      icon: Leaf,
      title: 'Botanical Clean Luxury',
      description:
        'We formulate strictly with cruelty-free, cold-pressed plant essences and dermatologist-grade clinical botanicals. Free of parabens and harsh synthetic sulfates.',
    },
    {
      icon: ShieldCheck,
      title: 'Hospital-Grade Sanctuary Hygiene',
      description:
        'Medical autoclave sterilization, single-use compostable bamboo linens, and HEPA air purification in all private suites ensure absolute peace of mind.',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 lg:space-y-36 pb-24">
      {/* 1. HERO BANNER */}
      <section className="bg-[#181512] gta6:bg-gradient-to-br gta6:from-[#1B103B] gta6:via-[#3D2166] gta6:to-[#7E4674] gta6:border-b gta6:border-[#F7B286]/30 text-[#FAF7F2] py-20 sm:py-28 relative overflow-hidden border-b border-stone-800">
        {/* Salon Atelier Luxury Editorial Backdrop (Visible only in default SALON mode) */}
        <SalonAtelierBackdrop variant="banner" />

        {/* GTA 6 Vice City Sunset Illustration Backdrop */}
        <ViceCityBackdrop variant="banner" className="hidden gta6:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#A2683A]/20 gta6:bg-[#160D30]/80 text-[#EEDCC8] gta6:text-[#FDE08D] border border-[#A2683A]/30 gta6:border-[#F7B286]/40 text-[11px] font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C48E60] gta6:text-[#FDE08D]" />
            <span>Our Heritage & Philosophy</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white gta6:text-white leading-tight">
            Where Timeless Craftsmanship Meets Modern Serenity
          </h1>

          <p className="text-stone-300 gta6:text-[#F3E8FF] font-light text-sm sm:text-base lg:text-lg leading-relaxed">
            Founded on the principle that self-care is a sacred ritual, SalonBook provides an unhurried sanctuary where visionary artisans and holistic therapies elevate your natural beauty.
          </p>
        </div>

        {/* Ambient Blur Background */}
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-[#A2683A]/15 blur-3xl pointer-events-none gta6:hidden" />
      </section>

      {/* 2. THE THREE PILLARS (STANDARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#A2683A]">
            Our Core Principles
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#181512]">
            Hygiene & Botanical Excellence
          </h2>
          <p className="text-sm text-stone-600 font-light">
            A commitment to ethical wellness, purity of ingredients, and surgical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {standards.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-2xl p-7 shadow-xs hover:shadow-lg transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#824D25]/10 text-[#A2683A] border border-[#A2683A]/20 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#181512]">{s.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light">{s.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. MEET OUR MASTER ARTISANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#A2683A]">
            The Specialists
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#181512]">
            Meet Our Master Artisans
          </h2>
          <p className="text-sm text-stone-600 font-light">
            Each specialist brings over a decade of international editorial pedigree to your personalized appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((art) => {
            const Icon = art.icon;
            return (
              <div
                key={art.name}
                className="bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Photo */}
                <div className="relative h-72 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={art.image}
                    alt={art.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#824D25] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-stone-200">
                    {art.experience}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#824D25]/10 text-[#A2683A] flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-[#A2683A] uppercase tracking-wide">
                        {art.role}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-[#181512]">
                      {art.name}
                    </h3>

                    <p className="text-xs text-stone-700 leading-relaxed font-medium">
                      Specialty: {art.specialty}
                    </p>

                    <p className="text-xs text-stone-500 leading-relaxed pt-1 font-light">
                      {art.bio}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. BOTTOM RESERVATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#181512] gta6:bg-[linear-gradient(135deg,#2E1957_0%,#6D2E73_55%,#B85D8E_100%)] gta6:border-[#F7B286]/30 text-[#FAF7F2] rounded-3xl p-8 sm:p-14 text-center max-w-3xl mx-auto space-y-6 shadow-xl border border-stone-800 relative overflow-hidden">
          {/* Salon Atelier Luxury Editorial Backdrop (Visible only in default SALON mode) */}
          <SalonAtelierBackdrop variant="footer" />

          {/* Subtle palm watermark accent in GTA mode */}
          <svg aria-hidden="true" viewBox="0 0 160 160" className="hidden gta6:block absolute -right-6 -bottom-6 w-36 h-36 text-white/5 fill-current pointer-events-none">
            <path d="M10 160 Q20 100 60 60 Q50 60 20 105 Q10 135 10 160 Z" />
            <path d="M60 60 Q110 30 140 50 Q100 60 60 60 Z" />
            <path d="M60 60 Q120 60 140 90 Q105 85 60 60 Z" />
            <path d="M60 60 Q95 100 110 130 Q90 105 60 60 Z" />
          </svg>
          <div className="relative z-10 space-y-6">
            <Heart className="w-8 h-8 text-[#C48E60] gta6:text-[#FCD34D] mx-auto" />
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white tracking-tight">
              Experience Bespoke Beauty Firsthand
            </h2>
            <p className="text-stone-300 gta6:text-[#F3E8FF] text-sm max-w-lg mx-auto leading-relaxed font-light">
              Reserve your consultation with our master stylists and certified therapists.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#A2683A] to-[#824D25] hover:opacity-95 text-white font-medium text-sm transition-all duration-200 shadow-md shadow-[#824D25]/20 active:scale-95"
              >
                <span>Explore Signature Treatments</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
