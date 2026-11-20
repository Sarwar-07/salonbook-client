'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, CreditCard, ArrowLeft, Calendar } from 'lucide-react';

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointment_id');

  return (
    <div className="max-w-xl w-full mx-auto bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-6">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mx-auto shadow-xs">
        <AlertCircle className="w-9 h-9" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Checkout Incomplete
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight pt-2">
          Payment Was Cancelled
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          No charges were processed. Your appointment slot remains securely saved as{' '}
          <strong className="text-stone-900">pending</strong> in your client account.
        </p>
      </div>

      {/* Info Notice Box */}
      <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-5 text-left text-xs space-y-2">
        <p className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-stone-200 pb-2 flex items-center justify-between">
          <span>Appointment Saved</span>
          <span className="text-amber-800 font-semibold">Unpaid (Pending)</span>
        </p>
        {appointmentId && (
          <div className="flex justify-between items-center text-stone-600">
            <span>Appointment Reference:</span>
            <span className="font-mono text-stone-900">{appointmentId}</span>
          </div>
        )}
        <p className="text-stone-500 text-[11px] leading-relaxed pt-1">
          You can return to your dashboard at any time to complete payment or manage your session before the appointment date.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/dashboard/customer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm shadow-sm transition-all duration-200 active:scale-95"
        >
          <CreditCard className="w-4 h-4" />
          <span>Return to Dashboard & Retry Payment</span>
        </Link>
        <Link
          href="/services"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-800 font-medium text-sm transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <Calendar className="w-3.5 h-3.5" />
          <span>Browse Services</span>
        </Link>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex items-center justify-center text-stone-500 text-sm">
            Loading cancellation details...
          </div>
        }
      >
        <PaymentCancelContent />
      </Suspense>
    </div>
  );
}
