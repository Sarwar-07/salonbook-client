'use client';

import React, { useState, useEffect, Suspense, useTransition } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ServiceCard from '@/components/ServiceCard';
import { apiRequest } from '@/lib/api';
import {
  Search,
  X,
  SlidersHorizontal,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Scissors,
  Droplets,
  Crown,
  Flower2,
  Palette,
  Layers,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'All', label: 'All Treatments', icon: Layers },
  { id: 'Hair', label: 'Hair', icon: Scissors },
  { id: 'Skin', label: 'Skin', icon: Droplets },
  { id: 'Makeup', label: 'Makeup', icon: Crown },
  { id: 'Spa', label: 'Spa', icon: Flower2 },
  { id: 'Nails', label: 'Nails', icon: Palette },
];

function normalizeCategory(cat) {
  if (!cat || cat === 'All') return 'All';
  if (cat.includes('Hair')) return 'Hair';
  if (cat.includes('Skin') || cat.includes('Facial')) return 'Skin';
  if (cat.includes('Makeup') || cat.includes('Bridal')) return 'Makeup';
  if (cat.includes('Spa') || cat.includes('Massage')) return 'Spa';
  if (cat.includes('Nail')) return 'Nails';
  return cat;
}

function ServicesCatalog() {
  const searchParams = useSearchParams();
  const rawCategoryParam = searchParams.get('category');
  const initialCategory = normalizeCategory(rawCategoryParam);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('');

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, startTransition] = useTransition();

  // Debounce search query by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch services when filters change
  useEffect(() => {
    let isCancelled = false;

    const fetchServices = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (debouncedSearch.trim()) {
          queryParams.set('search', debouncedSearch.trim());
        }
        if (selectedCategory && selectedCategory !== 'All') {
          queryParams.set('category', selectedCategory);
        }
        if (sortBy) {
          queryParams.set('sort', sortBy);
        }

        const qs = queryParams.toString();
        const data = await apiRequest(`/api/services${qs ? `?${qs}` : ''}`);

        if (!isCancelled) {
          if (Array.isArray(data)) {
            setServices(data);
          } else {
            setServices([]);
          }
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load services:', err);
          setError(err.message || 'Unable to load treatments at this time.');
          setServices([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchServices();

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearch, selectedCategory, sortBy]);

  const handleCategoryChange = (catId) => {
    startTransition(() => {
      setLoading(true);
      setSelectedCategory(catId);
    });
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    startTransition(() => {
      setLoading(true);
      setSortBy(val);
    });
  };

  const resetFilters = () => {
    startTransition(() => {
      setLoading(true);
      setSearch('');
      setDebouncedSearch('');
      setSelectedCategory('All');
      setSortBy('');
    });
  };

  return (
    <div className="space-y-8 sm:space-y-12 pb-24 sm:pb-32">
      {/* 1. COMPACT EDITORIAL HEADER BANNER ON #181512 */}
      <section className="bg-[#181512] text-[#FAF7F2] py-12 sm:py-16 border-b border-stone-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3 text-center sm:text-left">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center sm:justify-start gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C48E60] font-bold">
            <Link href="/" className="hover:text-[#FAF7F2] transition-colors">
              Home Atelier
            </Link>
            <span className="text-stone-600">/</span>
            <span className="text-stone-300">Browse Treatments</span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2] leading-tight">
            Artisanal Salon &amp; Spa Treatments
          </h1>

          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
            Explore our curated menu of bespoke hair styling, cellular skin therapies, couture bridal makeup, and therapeutic body rituals.
          </p>
        </div>

        {/* Subtle Ambient Glow */}
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-80 h-80 rounded-full bg-[#A2683A]/10 blur-3xl pointer-events-none" />
      </section>

      {/* 2. FLOATING FROSTED GLASS FILTER & SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white/90 backdrop-blur-md border border-stone-200/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
          {/* Row 1: Search by Service Name & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setLoading(true);
                  setSearch(e.target.value);
                }}
                placeholder="Search treatments by name or ritual (e.g. Balayage, HydraGlow, Stone)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] text-xs sm:text-sm text-[#181512] placeholder:text-stone-400 bg-[#FAF7F2]/60 transition-colors"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setLoading(true);
                    setSearch('');
                  }}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-[#824D25]" />
              <select
                value={sortBy}
                onChange={handleSortChange}
                aria-label="Sort treatments by price"
                className="py-2.5 px-3.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] text-xs sm:text-sm font-medium text-stone-800 bg-white cursor-pointer transition-colors"
              >
                <option value="">Default Order</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Row 2: Horizontal Category Filter Pills */}
          <div className="pt-2 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                    active
                      ? 'bg-gradient-to-r from-[#A2683A] to-[#824D25] text-[#FAF7F2] shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-[#181512]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#FAF7F2]' : 'text-stone-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. RESPONSIVE 3-COLUMN EDITORIAL SERVICE CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Results Counter & Reset Action */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500">
          <p>
            {loading ? (
              <span>Updating treatment catalog...</span>
            ) : (
              <span>
                Showing <strong className="text-[#181512] font-semibold">{services.length}</strong>{' '}
                {services.length === 1 ? 'treatment' : 'treatments'}
                {selectedCategory !== 'All' && (
                  <span> in <span className="text-[#824D25] font-semibold">{selectedCategory}</span></span>
                )}
                {debouncedSearch.trim() && (
                  <span> matching &ldquo;<span className="text-[#181512] font-medium">{debouncedSearch.trim()}</span>&rdquo;</span>
                )}
              </span>
            )}
          </p>

          {(selectedCategory !== 'All' || debouncedSearch.trim() || sortBy) && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-bold uppercase tracking-wider text-[#824D25] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-2xs animate-pulse flex flex-col h-[400px]"
              >
                <div className="aspect-4/3 w-full bg-stone-200" />
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="h-5 bg-stone-200 rounded w-3/4" />
                    <div className="h-4 bg-stone-200 rounded w-full" />
                    <div className="h-4 bg-stone-200 rounded w-2/3" />
                  </div>
                  <div className="h-10 bg-stone-200 rounded-xl w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-white rounded-3xl border border-rose-200 p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Unable to Retrieve Catalog
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">{error}</p>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setSelectedCategory((prev) => prev);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && services.length === 0 && (
          <div className="bg-white rounded-3xl border border-stone-200/90 p-10 sm:p-14 text-center max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#EEDCC8] text-[#824D25] flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#181512]">
              No Treatments Found
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              We couldn&apos;t find any services matching your current filters. Try adjusting your keyword or switching categories.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#A2683A] to-[#824D25] text-white text-xs uppercase tracking-widest font-bold shadow-xs hover:shadow transition-colors cursor-pointer"
            >
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Loaded Services Grid */}
        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center text-stone-500 text-sm">
          Loading treatment catalog...
        </div>
      }
    >
      <ServicesCatalog />
    </Suspense>
  );
}
