'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import toast from 'react-hot-toast';
import {
  Calendar,
  Clock,
  CreditCard,
  XCircle,
  CalendarCheck,
  CheckCircle2,
  Hourglass,
  Plus,
  User,
  Sparkles,
  Receipt,
  Loader2,
  Eye,
  X,
  AlertTriangle,
  Info,
} from 'lucide-react';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80';

const STATUS_FILTERS = ['All', 'pending', 'confirmed', 'completed', 'cancelled'];

export default function CustomerDashboardPage() {
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'payments'
  const [statusFilter, setStatusFilter] = useState('All');

  const [appointments, setAppointments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [payingAppointmentId, setPayingAppointmentId] = useState(null);

  // Modal States
  const [selectedAppointment, setSelectedAppointment] = useState(null); // For "View Details"
  const [appointmentToCancel, setAppointmentToCancel] = useState(null); // For "Cancel Confirmation"
  const [cancellingLoading, setCancellingLoading] = useState(false);

  // 1. Route Protection
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?callbackUrl=/dashboard/customer');
      } else if (user.role === 'admin') {
        router.push('/dashboard/admin');
      }
    }
  }, [user, authLoading, router]);

  // 2. Fetch Dashboard Data
  const refreshData = async () => {
    try {
      const [apptsRes, txsRes] = await Promise.all([
        apiRequest('/api/appointments/my'),
        apiRequest('/api/transactions/my'),
      ]);

      if (Array.isArray(apptsRes)) {
        setAppointments(apptsRes);
      }
      if (Array.isArray(txsRes)) {
        setTransactions(txsRes);
      }
    } catch (err) {
      console.error('Failed to refresh customer dashboard data:', err);
    }
  };

  useEffect(() => {
    if (!user || !token || user.role === 'admin') return;

    let isCancelled = false;
    const loadData = async () => {
      try {
        const [apptsRes, txsRes] = await Promise.all([
          apiRequest('/api/appointments/my'),
          apiRequest('/api/transactions/my'),
        ]);

        if (!isCancelled) {
          if (Array.isArray(apptsRes)) {
            setAppointments(apptsRes);
          }
          if (Array.isArray(txsRes)) {
            setTransactions(txsRes);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load customer dashboard data:', err);
          toast.error('Unable to refresh dashboard data');
        }
      } finally {
        if (!isCancelled) {
          setDashboardLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [user, token]);

  // 3. Handle Stripe Checkout
  const handleStripePayment = async (appointmentId) => {
    setPayingAppointmentId(appointmentId);
    try {
      const data = await apiRequest('/api/payments/create-checkout-session', {
        method: 'POST',
        body: { appointmentId },
      });

      if (data?.url) {
        window.location.assign(data.url);
      } else {
        toast.error('Failed to initialize Stripe checkout session');
      }
    } catch (err) {
      console.error('Stripe checkout error:', err);
      toast.error(err.message || 'Unable to proceed to payment');
    } finally {
      setPayingAppointmentId(null);
    }
  };

  // 4. Handle Cancel Appointment (triggered from React Modal)
  const confirmCancelAppointment = async () => {
    if (!appointmentToCancel) return;

    setCancellingLoading(true);
    try {
      await apiRequest(`/api/appointments/${appointmentToCancel._id}/cancel`, {
        method: 'PATCH',
      });
      toast.success('Appointment cancelled successfully');
      setAppointmentToCancel(null);
      if (selectedAppointment?._id === appointmentToCancel._id) {
        setSelectedAppointment(null);
      }
      await refreshData();
    } catch (err) {
      console.error('Cancellation error:', err);
      toast.error(err.message || 'Failed to cancel appointment');
    } finally {
      setCancellingLoading(false);
    }
  };

  // Filter appointments
  const filteredAppointments = appointments.filter((appt) => {
    if (statusFilter === 'All') return true;
    return appt.status === statusFilter;
  });

  // KPI Counts
  const totalRequestsCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const cancelledCount = appointments.filter((a) => a.status === 'cancelled').length;

  // Loading state
  if (authLoading || (!user && authLoading) || (dashboardLoading && user?.role !== 'admin')) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 animate-pulse">
        <div className="h-10 w-72 bg-stone-200 rounded-xl" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-stone-200 rounded-2xl" />
          ))}
        </div>
        <div className="h-64 bg-stone-200 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
            Client Sanctuary
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Welcome, {user?.name || 'Valued Guest'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Review your signature treatments, real-time appointments, and transaction receipts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Treatment</span>
          </Link>
          <Link
            href="/dashboard/profile"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-700 font-medium text-xs sm:text-sm border border-stone-300 transition-colors"
          >
            <User className="w-4 h-4 text-stone-400" />
            <span>Edit Profile</span>
          </Link>
        </div>
      </div>

      {/* 4 Required Customer Overview KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. Total Appointment Requests */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">
              Total Appointment Requests
            </p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {totalRequestsCount}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* 2. Pending Appointments */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">
              Pending Appointments
            </p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-700">
              {pendingCount}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
            <Hourglass className="w-5 h-5" />
          </div>
        </div>

        {/* 3. Confirmed Appointments */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">
              Confirmed Appointments
            </p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700">
              {confirmedCount}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* 4. Cancelled Appointments */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">
              Cancelled Appointments
            </p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-rose-700">
              {cancelledCount}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-stone-200 flex items-center gap-6">
        <button
          type="button"
          onClick={() => setActiveTab('appointments')}
          className={`pb-3.5 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'appointments'
              ? 'border-amber-800 text-amber-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>My Appointments ({appointments.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('payments')}
          className={`pb-3.5 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'payments'
              ? 'border-amber-800 text-amber-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Payment History ({transactions.length})</span>
        </button>
      </div>

      {/* TAB 1: MY APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          {/* Status Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {STATUS_FILTERS.map((status) => {
              const active = statusFilter === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-stone-900 text-[#FAF8F5] shadow-xs'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>

          {/* Empty Appointments State */}
          {filteredAppointments.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-10 sm:p-14 text-center max-w-md mx-auto space-y-4 shadow-xs">
              <Sparkles className="w-8 h-8 text-amber-800 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-stone-900">
                No Appointments Found
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                {statusFilter === 'All'
                  ? "You haven't reserved any salon treatments yet."
                  : `You have no appointments with status "${statusFilter}".`}
              </p>
              <Link
                href="/services"
                className="inline-block px-5 py-2.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                Browse Treatment Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appt) => {
                const formattedPrice = Number(appt.price || 0).toFixed(2);
                const isPaid = appt.paymentStatus === 'paid';

                // Strict Payment Rule: ONLY confirmed & unpaid gets Pay Now
                const canPay = appt.status === 'confirmed' && appt.paymentStatus === 'unpaid';
                const isPending = appt.status === 'pending';
                const canCancel = appt.status === 'pending';

                return (
                  <div
                    key={appt._id}
                    className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                  >
                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-start gap-4">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <Image
                          src={appt.serviceImage || FALLBACK_IMAGE}
                          alt={appt.serviceName || 'Service'}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                            {appt.serviceName}
                          </h3>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
                            {appt.serviceCategory || 'Treatment'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                            {appt.appointmentDate}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-medium text-stone-700">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            {appt.timeSlot}
                          </span>
                          <span>•</span>
                          <span className="font-semibold text-stone-900">
                            ${formattedPrice}
                          </span>
                        </div>

                        {appt.notes && (
                          <p className="text-xs text-stone-500 italic max-w-md pt-0.5 line-clamp-2">
                            Notes: &ldquo;{appt.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Badges & Action Buttons */}
                    <div className="flex flex-wrap md:flex-col items-end justify-between md:justify-center gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                      {/* Status Badges */}
                      <div className="flex items-center gap-2">
                        {/* Booking Status Badge */}
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            appt.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : appt.status === 'completed'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : appt.status === 'cancelled'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}
                        >
                          {appt.status}
                        </span>

                        {/* Payment Status Badge */}
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            isPaid
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-stone-100 text-stone-600 border border-stone-200'
                          }`}
                        >
                          {isPaid ? 'Paid' : 'Unpaid'}
                        </span>
                      </div>

                      {/* Action Buttons & Notice */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* View Details Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedAppointment(appt)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-medium text-xs shadow-2xs transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-stone-500" />
                          <span>View Details</span>
                        </button>

                        {/* Strict Payment Rule: ONLY if confirmed and unpaid */}
                        {canPay && (
                          <button
                            type="button"
                            disabled={payingAppointmentId === appt._id}
                            onClick={() => handleStripePayment(appt._id)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {payingAppointmentId === appt._id ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Redirecting...</span>
                              </>
                            ) : (
                              <>
                                <CreditCard className="w-3.5 h-3.5" />
                                <span>Pay Now (${formattedPrice})</span>
                              </>
                            )}
                          </button>
                        )}

                        {/* Strict Rule: When pending, display Awaiting Admin Confirmation badge */}
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Awaiting Admin Confirmation</span>
                          </span>
                        )}

                        {/* Cancel Button (triggers React confirmation modal) */}
                        {canCancel && (
                          <button
                            type="button"
                            onClick={() => setAppointmentToCancel(appt)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PAYMENT HISTORY */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-10 sm:p-14 text-center max-w-md mx-auto space-y-4 shadow-xs">
              <Receipt className="w-8 h-8 text-stone-400 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-stone-900">
                No Transactions Recorded
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Receipts for completed online payments will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF8F5] border-b border-stone-200 text-stone-600 text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3.5 px-5">Treatment</th>
                      <th className="py-3.5 px-5">Date Paid</th>
                      <th className="py-3.5 px-5">Transaction Ref</th>
                      <th className="py-3.5 px-5">Amount</th>
                      <th className="py-3.5 px-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {transactions.map((tx) => {
                      const formattedAmount = Number(tx.amount || 0).toFixed(2);
                      const dateStr = tx.createdAt
                        ? new Date(tx.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '—';
                      const truncatedSession = tx.stripeSessionId
                        ? `${tx.stripeSessionId.slice(0, 14)}...`
                        : '—';

                      return (
                        <tr key={tx._id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-stone-900">
                            {tx.serviceName || 'Salon Service'}
                          </td>
                          <td className="py-3.5 px-5 text-stone-500">{dateStr}</td>
                          <td className="py-3.5 px-5 font-mono text-xs text-stone-500">
                            {truncatedSession}
                          </td>
                          <td className="py-3.5 px-5 font-bold text-stone-900">
                            ${formattedAmount}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" />
                              Paid
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. VIEW DETAILS MODAL */}
      {/* ======================================================== */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Appointment Details
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  {selectedAppointment.serviceName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Service Snapshot */}
            <div className="flex items-center gap-4 bg-stone-50 rounded-2xl p-4 border border-stone-200/80">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-200 shrink-0">
                <Image
                  src={selectedAppointment.serviceImage || FALLBACK_IMAGE}
                  alt={selectedAppointment.serviceName || 'Service'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500">
                  Category: {selectedAppointment.serviceCategory || 'Artisan Service'}
                </span>
                <p className="font-serif font-bold text-lg text-stone-900">
                  ${Number(selectedAppointment.price || 0).toFixed(2)}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      selectedAppointment.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedAppointment.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : selectedAppointment.status === 'cancelled'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    Status: {selectedAppointment.status}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      selectedAppointment.paymentStatus === 'paid'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    Payment: {selectedAppointment.paymentStatus || 'unpaid'}
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Meta Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1 bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/60">
                <p className="text-stone-500 text-[11px] uppercase font-semibold">Appointment Date</p>
                <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-800" />
                  {selectedAppointment.appointmentDate}
                </p>
              </div>

              <div className="space-y-1 bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/60">
                <p className="text-stone-500 text-[11px] uppercase font-semibold">Reserved Slot</p>
                <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-800" />
                  {selectedAppointment.timeSlot}
                </p>
              </div>

              <div className="space-y-1 bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/60">
                <p className="text-stone-500 text-[11px] uppercase font-semibold">Client Name</p>
                <p className="font-medium text-stone-800">{selectedAppointment.customerName || user?.name || '—'}</p>
              </div>

              <div className="space-y-1 bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/60">
                <p className="text-stone-500 text-[11px] uppercase font-semibold">Contact Email</p>
                <p className="font-medium text-stone-800 truncate">{selectedAppointment.customerEmail || user?.email || '—'}</p>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5 bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200/60 text-xs">
              <p className="text-stone-500 text-[11px] uppercase font-semibold flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-stone-400" />
                <span>Special Instructions / Notes</span>
              </p>
              <p className="text-stone-700 italic">
                {selectedAppointment.notes || 'No special instructions were noted for this appointment.'}
              </p>
            </div>

            {/* Booking ID */}
            <div className="text-[11px] text-stone-400 font-mono">
              Booking Ref: {selectedAppointment._id}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Close
              </button>

              {/* Strict Pay Now rule inside modal */}
              {selectedAppointment.status === 'confirmed' &&
                selectedAppointment.paymentStatus === 'unpaid' && (
                  <button
                    type="button"
                    disabled={payingAppointmentId === selectedAppointment._id}
                    onClick={() => handleStripePayment(selectedAppointment._id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {payingAppointmentId === selectedAppointment._id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Redirecting...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay Now (${Number(selectedAppointment.price || 0).toFixed(2)})</span>
                      </>
                    )}
                  </button>
                )}

              {/* Cancel Button inside modal if pending */}
              {selectedAppointment.status === 'pending' && (
                <button
                  type="button"
                  onClick={() => setAppointmentToCancel(selectedAppointment)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Cancel Booking</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. REACT CONFIRMATION MODAL FOR CANCELLATION */}
      {/* ======================================================== */}
      {appointmentToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-5">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Cancel Appointment?
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Are you sure you want to cancel your appointment for{' '}
                <strong className="text-stone-800">{appointmentToCancel.serviceName}</strong> on{' '}
                <strong className="text-stone-800">{appointmentToCancel.appointmentDate}</strong> at{' '}
                <strong className="text-stone-800">{appointmentToCancel.timeSlot}</strong>?
              </p>
              <p className="text-xs text-rose-600 font-medium">
                This reserved salon slot will be released immediately.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={cancellingLoading}
                onClick={() => setAppointmentToCancel(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs sm:text-sm font-semibold hover:bg-stone-50 transition-colors cursor-pointer disabled:opacity-50"
              >
                Keep Booking
              </button>
              <button
                type="button"
                disabled={cancellingLoading}
                onClick={confirmCancelAppointment}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-1.5"
              >
                {cancellingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Cancelling...</span>
                  </>
                ) : (
                  <span>Yes, Cancel</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
