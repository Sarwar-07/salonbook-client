'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import { CheckCircle2, CalendarCheck, Sparkles, ArrowRight } from 'lucide-react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const appointmentId = searchParams.get('appointment_id');

  const { token, loading: authLoading } = useAuth();
  const [verifying, setVerifying] = useState(Boolean(sessionId));
  const hasVerifiedRef = useRef(false);

  useEffect(() => {
    if (!sessionId || hasVerifiedRef.current || authLoading || !token) {
      return;
    }

    hasVerifiedRef.current = true;

    const verify = async () => {
      try {
        await apiRequest('/api/payments/verify-session', {
          method: 'POST',
          body: { sessionId },
        });
      } catch (err) {
        console.error('Session verification notice:', err);
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [sessionId, token, authLoading]);

  return (
    <div className="max-w-xl w-full mx-auto bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-6">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Transaction Complete
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight pt-2">
          Payment & Reservation Confirmed
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          Thank you for choosing SalonBook Haute Salon & Spa. Your appointment has been secured and confirmed in our master schedule.
        </p>
      </div>

      {/* Receipt Details Box */}
      <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-5 text-left text-xs space-y-2.5">
        <p className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-stone-200 pb-2 flex items-center justify-between">
          <span>Booking Receipt</span>
          <span className="text-emerald-700">Verified</span>
        </p>

        {appointmentId && (
          <div className="flex justify-between items-center text-stone-600">
            <span>Appointment Reference:</span>
            <span className="font-mono text-stone-900 font-medium">{appointmentId}</span>
          </div>
        )}

        {sessionId && (
          <div className="flex justify-between items-center text-stone-600">
            <span>Stripe Checkout Ref:</span>
            <span className="font-mono text-stone-900 font-medium">
              {sessionId.length > 20 ? `${sessionId.slice(0, 18)}...` : sessionId}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center text-stone-600 pt-1">
          <span>Status:</span>
          <span className="font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded text-[11px]">
            {verifying ? 'Verifying payment...' : 'Paid & Confirmed'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/dashboard/customer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm shadow-sm transition-all duration-200 active:scale-95"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>View My Appointments</span>
        </Link>
        <Link
          href="/services"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-800 font-medium text-sm transition-colors"
        >
          <Sparkles className="w-4 h-4 text-amber-800" />
          <span>Explore More Services</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex items-center justify-center text-stone-500 text-sm">
            Confirming payment...
          </div>
        }
      >
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
