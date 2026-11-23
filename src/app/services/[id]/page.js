'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import ViceCityBackdrop from '@/components/ViceCityBackdrop';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  Clock,
  Sparkles,
  Leaf,
  CalendarCheck,
  Calendar,
  AlertCircle,
  Loader2,
  Check,
  Shield,
  ArrowRight,
  Heart,
} from 'lucide-react';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80';

const STANDARD_TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '12:00 PM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM',
];

function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTomorrowString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [service, setService] = useState(null);
  const [loadingService, setLoadingService] = useState(true);
  const [serviceError, setServiceError] = useState(null);
  const [imgSrc, setImgSrc] = useState(FALLBACK_IMAGE);

  // Reservation Form State
  const [appointmentDate, setAppointmentDate] = useState(getTomorrowString());
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Service Details
  useEffect(() => {
    if (!id) return;
    let isCancelled = false;

    const loadService = async () => {
      try {
        const data = await apiRequest(`/api/services/${id}`);
        if (!isCancelled) {
          if (data && data._id) {
            // Block inactive service booking
            if (data.status === 'inactive') {
              setServiceError('This salon treatment is currently unavailable.');
            } else {
              setService(data);
              setImgSrc(data.image || FALLBACK_IMAGE);
              setServiceError(null);
            }
          } else {
            setServiceError('Treatment not found');
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load service:', err);
          setServiceError(err.message || 'Treatment not found');
        }
      } finally {
        if (!isCancelled) {
          setLoadingService(false);
        }
      }
    };

    loadService();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  // 2. Fetch Booked Slots when id or appointmentDate changes
  useEffect(() => {
    if (!id || !appointmentDate) return;
    let isCancelled = false;

    const fetchBookedSlots = async () => {
      setSlotsLoading(true);
      try {
        const res = await apiRequest(
          `/api/appointments/booked-slots?serviceId=${id}&date=${appointmentDate}`
        );
        if (!isCancelled) {
          const booked = Array.isArray(res) ? res : res?.bookedSlots || [];
          setBookedSlots(booked);
          setSelectedSlot((currentSlot) => (booked.includes(currentSlot) ? '' : currentSlot));
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to fetch booked slots:', err);
          setBookedSlots([]);
        }
      } finally {
        if (!isCancelled) {
          setSlotsLoading(false);
        }
      }
    };

    fetchBookedSlots();

    return () => {
      isCancelled = true;
    };
  }, [id, appointmentDate]);

  // 3. Handle Reservation Submission
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      router.push(`/login?callbackUrl=/services/${id}`);
      return;
    }

    if (user.role === 'admin') {
      toast.error('Admins manage appointments from the dashboard rather than booking customer slots.');
      return;
    }

    if (!appointmentDate) {
      toast.error('Please choose a valid appointment date');
      return;
    }

    if (!selectedSlot) {
      toast.error('Please select an available time slot');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest('/api/appointments', {
        method: 'POST',
        body: {
          serviceId: id,
          appointmentDate,
          timeSlot: selectedSlot,
          notes: notes.trim(),
        },
      });

      toast.success('Appointment booked! Manage your reservation in the customer dashboard.');
      router.push('/dashboard/customer');
    } catch (err) {
      console.error('Booking failed:', err);
      toast.error(err.message || 'Failed to complete reservation');

      // Refresh slots on 409 conflict
      if (err.status === 409 || err.message?.toLowerCase().includes('already booked')) {
        try {
          const res = await apiRequest(
            `/api/appointments/booked-slots?serviceId=${id}&date=${appointmentDate}`
          );
          const booked = Array.isArray(res) ? res : res?.bookedSlots || [];
          setBookedSlots(booked);
          if (booked.includes(selectedSlot)) {
            setSelectedSlot('');
          }
        } catch (refreshErr) {
          console.error('Failed to refresh slots after conflict:', refreshErr);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading skeleton state
  if (loadingService) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-8">
        <div className="h-6 w-48 bg-stone-200 rounded-md" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="h-[440px] bg-stone-200 rounded-3xl w-full" />
            <div className="h-8 bg-stone-200 rounded-md w-3/4" />
            <div className="h-4 bg-stone-200 rounded-md w-full" />
            <div className="h-4 bg-stone-200 rounded-md w-2/3" />
          </div>
          <div className="lg:col-span-5">
            <div className="h-[520px] bg-stone-200 rounded-3xl w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Service Not Found state
  if (serviceError || !service) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#181512]">
          Treatment Unavailable
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed max-w-md mx-auto">
          {serviceError || 'The requested salon treatment may have been retired or temporarily deactivated.'}
        </p>
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-[#FAF7F2] font-semibold text-xs uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const formattedPrice = Number(service.price || 0).toFixed(2);
  const minDate = getTodayString();

  return (
    <div className="space-y-8 sm:space-y-10 pb-24">
      {/* Top Editorial Breadcrumb & Header Banner / GTA LEONIDA DUSK */}
      <section className="py-6 sm:py-8 gta6:py-10 border-b border-stone-200/50 gta6:border-[#F7B286]/30 gta6:bg-gradient-to-br gta6:from-[#1B103B] gta6:via-[#3D2166] gta6:to-[#7E4674] relative overflow-hidden">
        {/* GTA 6 Vice City Sunset Illustration Backdrop */}
        <ViceCityBackdrop variant="banner" className="hidden gta6:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Editorial Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-stone-500 gta6:text-[#FDE08D]">
            <Link href="/" className="hover:text-[#824D25] gta6:hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-stone-300 gta6:text-white/40">/</span>
            <Link href="/services" className="hover:text-[#824D25] gta6:hover:text-white transition-colors">
              Services
            </Link>
            <span className="text-stone-300 gta6:text-white/40">/</span>
            <span className="text-[#824D25] gta6:text-[#FDE08D] truncate max-w-[200px] sm:max-w-xs">{service.serviceName}</span>
          </nav>

          {/* Quick Category Monogram */}
          <div className="hidden gta6:inline-flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded-full bg-[#160D30]/80 border border-[#F7B286]/40 text-[#FDE08D]">
              {service.category} Discipline
            </span>
          </div>
        </div>
      </section>

      {/* Main 2-Column Responsive Luxury Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* LEFT COLUMN: Service Showcase & Details (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Large Rounded-3xl Treatment Hero Image */}
          <div className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden bg-stone-100 shadow-md border border-stone-200/90 group">
            <Image
              src={imgSrc}
              alt={service.serviceName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
              onError={() => setImgSrc(FALLBACK_IMAGE)}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

            {/* Frosted Category Pill */}
            <div className="absolute top-5 left-5 z-10">
              <span className="bg-white/90 gta6:bg-[#160D30]/90 gta6:border-[#F7B286]/40 gta6:text-[#FDE08D] backdrop-blur-md text-[#824D25] text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-xs border border-white/60">
                {service.category} Discipline
              </span>
            </div>

            {/* Price Monogram Overlay */}
            <div className="absolute bottom-5 left-5 z-10">
              <span className="bg-[#181512]/90 gta6:bg-gradient-to-r gta6:from-[#1B103B] gta6:to-[#3D2166] gta6:border gta6:border-[#F7B286]/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-base sm:text-lg font-serif font-bold shadow-md">
                ${formattedPrice} USD
              </span>
            </div>
          </div>

          {/* Service Title & Duration/Price Metadata Bar */}
          <div className="space-y-4">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181512] gta6:text-white tracking-tight leading-tight">
              {service.serviceName}
            </h1>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EEDCC8]/70 text-[#824D25] text-xs font-semibold border border-[#C48E60]/30">
                <Clock className="w-3.5 h-3.5 text-[#824D25]" />
                <span>{service.duration} mins personalized ritual</span>
              </span>
              <span className="text-stone-300">•</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#A2683A]" />
                <span>Private Consultation Included</span>
              </span>
            </div>

            {/* Full Editorial Description */}
            <div className="pt-4 border-t border-stone-200/80 gta6:border-white/15">
              <h2 className="text-xs uppercase font-bold tracking-[0.2em] text-[#824D25] gta6:text-[#FDE08D] mb-2.5">
                Treatment Overview &amp; Experience
              </h2>
              <p className="text-stone-700 gta6:text-[#F3E8FF] leading-relaxed text-sm sm:text-base whitespace-pre-line font-normal">
                {service.description}
              </p>
            </div>
          </div>

          {/* The SalonBook Experience Highlights Box */}
          <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2.5 text-[#181512]">
              <Sparkles className="w-5 h-5 text-[#824D25]" />
              <h3 className="font-serif text-xl font-bold">The SalonBook Atelier Standards</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
              <div className="space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-stone-200 text-[#824D25] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#181512]">Herbal Welcome</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Complimentary bespoke organic tea infusion upon arrival.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-stone-200 text-[#824D25] flex items-center justify-center">
                  <Leaf className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#181512]">Clean Botanicals</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  100% cruelty-free, clinical dermatological bio-actives.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-stone-200 text-[#824D25] flex items-center justify-center">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#181512]">Private Suites</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Acoustically balanced suite ensuring total discretion.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Frosted Reservation Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm sticky top-24 space-y-6">
            <div className="border-b border-stone-100 pb-4 space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#824D25]">
                Real-Time Availability
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#181512]">
                Reserve Your Appointment
              </h3>
              <p className="text-xs text-stone-500">
                Instant slot locking with automated customer confirmation.
              </p>
            </div>

            <form onSubmit={handleBooking} className="space-y-5">
              {/* Date Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  1. Appointment Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    min={minDate}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] text-xs sm:text-sm font-medium text-stone-900 bg-[#FAF7F2]/60 cursor-pointer"
                  />
                </div>
              </div>

              {/* Real-Time Interactive Time Slot Picker Grid */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    2. Select Time Slot
                  </label>
                  {slotsLoading && (
                    <span className="text-[11px] text-[#824D25] flex items-center gap-1 font-semibold">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Checking availability...
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {STANDARD_TIME_SLOTS.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedSlot === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer relative ${
                          isBooked
                            ? 'bg-stone-100 text-stone-400 border-stone-200 line-through cursor-not-allowed'
                            : isSelected
                            ? 'bg-gradient-to-r from-[#A2683A] to-[#824D25] text-[#FAF7F2] border-transparent shadow-xs font-bold active:scale-95'
                            : 'bg-white text-stone-800 border-stone-300 hover:border-[#A2683A] hover:bg-[#FAF7F2] active:scale-95'
                        }`}
                      >
                        <span>{slot}</span>
                        {isBooked && (
                          <span className="block text-[9px] uppercase font-bold text-rose-600 tracking-wider">
                            Booked
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests / Notes */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    3. Stylist Notes &amp; Requests
                  </label>
                  <span className="text-[10px] text-stone-400 font-normal">Optional</span>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={300}
                  rows={3}
                  placeholder="Hair texture, preferred stylist, allergy details, or consultation notes..."
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] text-xs text-stone-900 placeholder:text-stone-400 bg-[#FAF7F2]/60 resize-none"
                />
              </div>

              {/* Booking Summary Box */}
              <div className="bg-[#FAF7F2] border border-stone-200/90 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Selected Date:</span>
                  <span className="font-semibold text-stone-900">
                    {appointmentDate || 'Please select'}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Time Slot:</span>
                  <span className="font-semibold text-stone-900">
                    {selectedSlot || 'Please select a slot'}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Ritual Duration:</span>
                  <span className="font-semibold text-stone-900">{service.duration} mins</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm">
                  <span className="font-serif font-bold text-stone-900">Total Investment:</span>
                  <span className="font-serif font-bold text-[#824D25] text-lg">${formattedPrice}</span>
                </div>
              </div>

              {/* Submit / Auth State Logic */}
              {!authLoading && !user ? (
                <button
                  type="button"
                  onClick={() => router.push(`/login?callbackUrl=/services/${id}`)}
                  className="w-full py-4 px-4 rounded-xl font-bold text-xs uppercase tracking-widest text-[#FAF7F2] bg-gradient-to-r from-[#A2683A] to-[#824D25] hover:opacity-95 shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Sign In to Reserve Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : user?.role === 'admin' ? (
                <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl space-y-2 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-900">
                    <Shield className="w-4 h-4 text-amber-800" />
                    <span>Administrator Account</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Administrators manage treatment schedules directly from the control dashboard.
                  </p>
                  <Link
                    href="/dashboard/admin"
                    className="inline-block mt-1 text-xs font-bold text-amber-900 hover:underline uppercase tracking-wider"
                  >
                    Go to Admin Dashboard →
                  </Link>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedSlot}
                  className="w-full py-4 px-4 rounded-xl font-bold text-xs uppercase tracking-widest text-[#FAF7F2] bg-gradient-to-r from-[#A2683A] to-[#824D25] hover:opacity-95 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Reservation...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Confirm &amp; Reserve Appointment</span>
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
