'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
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
            setService(data);
            setImgSrc(data.image || FALLBACK_IMAGE);
            setServiceError(null);
          } else {
            setServiceError('Service not found');
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load service:', err);
          setServiceError(err.message || 'Service not found');
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

      toast.success('Appointment booked! Complete payment or manage it in your dashboard.');
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
            <div className="h-[420px] bg-stone-200 rounded-2xl w-full" />
            <div className="h-8 bg-stone-200 rounded-md w-3/4" />
            <div className="h-4 bg-stone-200 rounded-md w-full" />
            <div className="h-4 bg-stone-200 rounded-md w-2/3" />
          </div>
          <div className="lg:col-span-5">
            <div className="h-[520px] bg-stone-200 rounded-2xl w-full" />
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
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Treatment Not Found
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed max-w-md mx-auto">
          The requested salon treatment may have been updated, relocated, or temporarily deactivated.
        </p>
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>
        </div>
      </div>
    );
  }

  const formattedPrice = Number(service.price || 0).toFixed(2);
  const minDate = getTodayString();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Breadcrumb Navigation */}
      <div>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-amber-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* LEFT COLUMN: Service Showcase & Details (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Framed Service Image */}
          <div className="relative h-[360px] sm:h-[460px] w-full rounded-2xl overflow-hidden bg-stone-100 shadow-md border border-stone-200">
            <Image
              src={imgSrc}
              alt={service.serviceName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
              onError={() => setImgSrc(FALLBACK_IMAGE)}
              unoptimized
            />
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-[#FAF8F5]/95 backdrop-blur-xs text-amber-800 text-xs font-semibold px-4 py-1.5 rounded-full shadow-xs border border-stone-200/60">
                {service.category}
              </span>
            </div>
          </div>

          {/* Service Title & Key Specs */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                {service.serviceName}
              </h1>
              <div className="text-2xl sm:text-3xl font-bold text-amber-800 shrink-0">
                ${formattedPrice}
              </div>
            </div>

            {/* Duration pill */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-800/10 text-amber-900 text-xs font-medium border border-amber-800/15">
                <Clock className="w-3.5 h-3.5 text-amber-800" />
                <span>{service.duration} mins session</span>
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-stone-500 font-medium">
                Certified Master Stylist
              </span>
            </div>

            {/* Description */}
            <div className="pt-2">
              <h2 className="text-xs uppercase font-semibold tracking-wider text-stone-400 mb-2">
                Treatment Overview
              </h2>
              <p className="text-stone-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {service.description}
              </p>
            </div>
          </div>

          {/* The SalonBook Experience Highlights Box */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-stone-900">
              <Sparkles className="w-5 h-5 text-amber-800" />
              <h3 className="font-serif text-lg font-bold">The SalonBook Experience</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-amber-800/10 text-amber-800 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-stone-900">Herbal Tea Welcome</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Complimentary bespoke organic infusion consultation on arrival.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-amber-800/10 text-amber-800 flex items-center justify-center">
                  <Leaf className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-stone-900">Botanical Formulations</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  100% cruelty-free, dermatologist-verified clean salon products.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-amber-800/10 text-amber-800 flex items-center justify-center">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-stone-900">Flexible Rescheduling</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Modify your scheduled slot with ease up to 24 hours prior.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Reservation Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm sticky top-24 space-y-6">
            <div className="border-b border-stone-100 pb-4 space-y-1">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Reserve Your Appointment
              </h3>
              <p className="text-xs text-stone-500">
                Instant slot reservation with automated confirmation.
              </p>
            </div>

            <form onSubmit={handleBooking} className="space-y-5">
              {/* Date Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Select Appointment Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    min={minDate}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm font-medium text-stone-900 bg-stone-50/50 cursor-pointer"
                  />
                </div>
              </div>

              {/* Real-Time Time Slot Picker */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Select Time Slot
                  </label>
                  {slotsLoading && (
                    <span className="text-[11px] text-amber-800 flex items-center gap-1 font-medium">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Checking slots...
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
                        className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer relative ${
                          isBooked
                            ? 'bg-stone-100 text-stone-400 border-stone-200 line-through cursor-not-allowed'
                            : isSelected
                            ? 'bg-stone-900 text-[#FAF8F5] border-stone-900 shadow-xs font-semibold active:scale-95'
                            : 'bg-white text-stone-800 border-stone-300 hover:border-amber-800 hover:bg-amber-50/20 active:scale-95'
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
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Stylist Notes & Sensitivities
                  </label>
                  <span className="text-[10px] text-stone-400 font-normal">Optional</span>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={300}
                  rows={3}
                  placeholder="Hair texture, preferred stylist, allergy details, or consultation notes..."
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-xs text-stone-900 placeholder:text-stone-400 bg-stone-50/50 resize-none"
                />
              </div>

              {/* Booking Summary Box */}
              <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Selected Date:</span>
                  <span className="font-semibold text-stone-900">
                    {appointmentDate || 'Please select'}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Time Slot:</span>
                  <span className="font-semibold text-stone-900">
                    {selectedSlot || 'Please select'}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Duration:</span>
                  <span className="font-semibold text-stone-900">{service.duration} mins</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm">
                  <span className="font-bold text-stone-900">Total Price:</span>
                  <span className="font-bold text-amber-800">${formattedPrice}</span>
                </div>
              </div>

              {/* Submit / Auth State Logic */}
              {!authLoading && !user ? (
                <button
                  type="button"
                  onClick={() => router.push(`/login?callbackUrl=/services/${id}`)}
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-amber-800 hover:bg-amber-900 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Sign In to Reserve Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : user?.role === 'admin' ? (
                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-900">
                    <Shield className="w-4 h-4 text-amber-800" />
                    <span>Administrator Account</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Administrators oversee and manage bookings rather than scheduling customer appointments.
                  </p>
                  <Link
                    href="/dashboard/admin"
                    className="inline-block mt-1 text-xs font-semibold text-amber-900 hover:underline"
                  >
                    Go to Admin Dashboard →
                  </Link>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedSlot}
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-amber-800 hover:bg-amber-900 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Reservation...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Confirm & Reserve Appointment</span>
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
