'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import toast from 'react-hot-toast';
import {
  BarChart3,
  Scissors,
  CalendarCheck,
  Users,
  Receipt,
  Plus,
  Search,
  Edit2,
  Trash2,
  Shield,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  Loader2,
  Power,
  Ban,
  UserCheck,
  X,
  Clock,
  Sparkles,
} from 'lucide-react';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80';

const CATEGORIES = ['Hair', 'Skin', 'Makeup', 'Spa', 'Nails'];
const APPOINTMENT_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'services' | 'appointments' | 'users' | 'transactions'

  // Master Data States
  const [adminStats, setAdminStats] = useState({
    stats: {
      totalUsers: 0,
      totalServices: 0,
      activeServices: 0,
      totalAppointments: 0,
      totalRevenue: 0,
      statusBreakdown: { pending: 0, confirmed: 0, completed: 0, cancelled: 0 },
    },
    categoryRevenue: [],
    recentAppointments: [],
    recentTransactions: [],
  });
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  // Tab 2: Services search & modal state
  const [serviceSearch, setServiceSearch] = useState('');
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null); // null when adding
  const [serviceFormData, setServiceFormData] = useState({
    serviceName: '',
    category: 'Hair',
    price: '',
    duration: '',
    image: '',
    status: 'active',
    description: '',
  });
  const [savingService, setSavingService] = useState(false);

  // Tab 3: Appointments filter
  const [appointmentFilter, setAppointmentFilter] = useState('All');
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [updatingApptId, setUpdatingApptId] = useState(null);

  // Tab 4: Users search & action states
  const [userSearch, setUserSearch] = useState('');
  const [updatingUserId, setUpdatingUserId] = useState(null);

  // 1. Role & Route Protection
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?callbackUrl=/dashboard/admin');
      } else if (user.role !== 'admin') {
        router.push('/dashboard/customer');
      }
    }
  }, [user, authLoading, router]);

  // 2. Data Fetching
  const refreshAllData = async () => {
    try {
      const [statsRes, servicesRes, apptsRes, usersRes, txsRes] = await Promise.all([
        apiRequest('/api/dashboard/admin-stats'),
        apiRequest('/api/admin/services'),
        apiRequest('/api/admin/appointments'),
        apiRequest('/api/admin/users'),
        apiRequest('/api/admin/transactions'),
      ]);

      if (statsRes) setAdminStats(statsRes);
      if (Array.isArray(servicesRes)) setServices(servicesRes);
      if (Array.isArray(apptsRes)) setAppointments(apptsRes);
      if (Array.isArray(usersRes)) setUsers(usersRes);
      if (Array.isArray(txsRes)) setTransactions(txsRes);
    } catch (err) {
      console.error('Failed to refresh admin data:', err);
    }
  };

  useEffect(() => {
    if (!user || !token || user.role !== 'admin') return;

    let isCancelled = false;
    const loadAllData = async () => {
      try {
        const [statsRes, servicesRes, apptsRes, usersRes, txsRes] = await Promise.all([
          apiRequest('/api/dashboard/admin-stats'),
          apiRequest('/api/admin/services'),
          apiRequest('/api/admin/appointments'),
          apiRequest('/api/admin/users'),
          apiRequest('/api/admin/transactions'),
        ]);

        if (!isCancelled) {
          if (statsRes) setAdminStats(statsRes);
          if (Array.isArray(servicesRes)) setServices(servicesRes);
          if (Array.isArray(apptsRes)) setAppointments(apptsRes);
          if (Array.isArray(usersRes)) setUsers(usersRes);
          if (Array.isArray(txsRes)) setTransactions(txsRes);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load admin dashboard:', err);
          toast.error('Unable to load full admin analytics');
        }
      } finally {
        if (!isCancelled) {
          setDashboardLoading(false);
        }
      }
    };

    loadAllData();

    return () => {
      isCancelled = true;
    };
  }, [user, token]);

  // ==========================================
  // TAB 2: SERVICES CRUD HANDLERS
  // ==========================================
  const openAddServiceModal = () => {
    setEditingService(null);
    setServiceFormData({
      serviceName: '',
      category: 'Hair',
      price: '',
      duration: '',
      image: '',
      status: 'active',
      description: '',
    });
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (service) => {
    setEditingService(service);
    setServiceFormData({
      serviceName: service.serviceName,
      category: service.category,
      price: service.price,
      duration: service.duration,
      image: service.image,
      status: service.status,
      description: service.description,
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    setSavingService(true);

    try {
      if (editingService) {
        // Edit service
        await apiRequest(`/api/services/${editingService._id}`, {
          method: 'PATCH',
          body: {
            serviceName: serviceFormData.serviceName,
            category: serviceFormData.category,
            price: Number(serviceFormData.price),
            duration: Number(serviceFormData.duration),
            image: serviceFormData.image,
            status: serviceFormData.status,
            description: serviceFormData.description,
          },
        });
        toast.success('Service updated successfully');
      } else {
        // Create service
        await apiRequest('/api/services', {
          method: 'POST',
          body: {
            serviceName: serviceFormData.serviceName,
            category: serviceFormData.category,
            price: Number(serviceFormData.price),
            duration: Number(serviceFormData.duration),
            image: serviceFormData.image,
            status: serviceFormData.status,
            description: serviceFormData.description,
          },
        });
        toast.success('Service created successfully');
      }

      setIsServiceModalOpen(false);
      await refreshAllData();
    } catch (err) {
      console.error('Service save error:', err);
      toast.error(err.message || 'Failed to save service');
    } finally {
      setSavingService(false);
    }
  };

  const handleToggleServiceStatus = async (service) => {
    const nextStatus = service.status === 'active' ? 'inactive' : 'active';
    try {
      await apiRequest(`/api/services/${service._id}`, {
        method: 'PATCH',
        body: { status: nextStatus },
      });
      toast.success(`Service status set to ${nextStatus}`);
      await refreshAllData();
    } catch (err) {
      console.error('Failed to toggle status:', err);
      toast.error(err.message || 'Failed to update service status');
    }
  };

  const handleDeleteService = async (serviceId) => {
    const confirmed = window.confirm('Are you sure you want to delete this service permanently?');
    if (!confirmed) return;

    try {
      await apiRequest(`/api/services/${serviceId}`, {
        method: 'DELETE',
      });
      toast.success('Service deleted successfully');
      await refreshAllData();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err.message || 'Failed to delete service');
    }
  };

  // ==========================================
  // TAB 3: APPOINTMENTS STATUS HANDLER
  // ==========================================
  const handleUpdateAppointmentStatus = async (appointmentId, newStatus) => {
    setUpdatingApptId(appointmentId);
    try {
      await apiRequest(`/api/admin/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        body: { status: newStatus },
      });
      toast.success(`Appointment status updated to ${newStatus}`);
      await refreshAllData();
    } catch (err) {
      console.error('Appointment status update error:', err);
      toast.error(err.message || 'Failed to update appointment status');
    } finally {
      setUpdatingApptId(null);
    }
  };

  // ==========================================
  // TAB 4: USERS ROLE & BLOCK HANDLERS
  // ==========================================
  const handleToggleUserRole = async (targetUser) => {
    if (String(targetUser._id) === String(user?._id)) {
      toast.error('You cannot change your own admin role.');
      return;
    }

    const nextRole = targetUser.role === 'admin' ? 'customer' : 'admin';
    const confirmed = window.confirm(
      `Are you sure you want to change ${targetUser.name}'s role to ${nextRole}?`
    );
    if (!confirmed) return;

    setUpdatingUserId(targetUser._id);
    try {
      await apiRequest(`/api/admin/users/${targetUser._id}/role`, {
        method: 'PATCH',
        body: { role: nextRole },
      });
      toast.success(`User role changed to ${nextRole}`);
      await refreshAllData();
    } catch (err) {
      console.error('Role update error:', err);
      toast.error(err.message || 'Failed to update user role');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleToggleUserBlock = async (targetUser) => {
    if (String(targetUser._id) === String(user?._id)) {
      toast.error('You cannot block your own admin account.');
      return;
    }

    const nextBlocked = !targetUser.isBlocked;
    const actionWord = nextBlocked ? 'block' : 'unblock';
    const confirmed = window.confirm(
      `Are you sure you want to ${actionWord} ${targetUser.name}?`
    );
    if (!confirmed) return;

    setUpdatingUserId(targetUser._id);
    try {
      await apiRequest(`/api/admin/users/${targetUser._id}/block`, {
        method: 'PATCH',
        body: { isBlocked: nextBlocked },
      });
      toast.success(`User has been ${nextBlocked ? 'blocked' : 'unblocked'}`);
      await refreshAllData();
    } catch (err) {
      console.error('Block status error:', err);
      toast.error(err.message || 'Failed to update block status');
    } finally {
      setUpdatingUserId(null);
    }
  };

  // Filter lists
  const filteredServices = services.filter((s) => {
    if (!serviceSearch.trim()) return true;
    const q = serviceSearch.toLowerCase();
    return (
      s.serviceName?.toLowerCase().includes(q) ||
      s.category?.toLowerCase().includes(q)
    );
  });

  const filteredAppointments = appointments.filter((appt) => {
    const matchesStatus =
      appointmentFilter === 'All' || appt.status === appointmentFilter;
    if (!matchesStatus) return false;

    if (!appointmentSearch.trim()) return true;
    const q = appointmentSearch.toLowerCase();
    return (
      appt.customerName?.toLowerCase().includes(q) ||
      appt.customerEmail?.toLowerCase().includes(q) ||
      appt.serviceName?.toLowerCase().includes(q)
    );
  });

  const filteredUsers = users.filter((u) => {
    if (!userSearch.trim()) return true;
    const q = userSearch.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q)
    );
  });

  // Calculate highest revenue for progress bar scale
  const maxCategoryRevenue = Math.max(
    ...adminStats.categoryRevenue.map((c) => c.revenue || 0),
    1
  );

  // Total appointments count for status percentages
  const statusTotal =
    (adminStats.stats?.statusBreakdown?.pending || 0) +
    (adminStats.stats?.statusBreakdown?.confirmed || 0) +
    (adminStats.stats?.statusBreakdown?.completed || 0) +
    (adminStats.stats?.statusBreakdown?.cancelled || 0) ||
    1;

  // Loading skeleton state
  if (authLoading || (!user && authLoading) || (dashboardLoading && user?.role === 'admin')) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-stone-200 rounded-xl" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-stone-200 rounded-2xl" />
          ))}
        </div>
        <div className="h-80 bg-stone-200 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold bg-amber-800/10 px-2.5 py-0.5 rounded-full border border-amber-800/20">
              Admin Portal
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
            Salon Control Suite
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Monitor real-time salon operations, treatment offerings, master bookings, and client accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openAddServiceModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-stone-200 flex items-center gap-4 sm:gap-8 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`pb-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'border-amber-800 text-amber-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`pb-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'services'
              ? 'border-amber-800 text-amber-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>Services ({services.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('appointments')}
          className={`pb-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'appointments'
              ? 'border-amber-800 text-amber-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Appointments ({appointments.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`pb-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'users'
              ? 'border-amber-800 text-amber-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Users ({users.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('transactions')}
          className={`pb-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'transactions'
              ? 'border-amber-800 text-amber-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Transactions ({transactions.length})</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: OVERVIEW ANALYTICS */}
      {/* ======================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Total Revenue */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                  Total Revenue
                </p>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">
                  ${Number(adminStats.stats?.totalRevenue || 0).toFixed(2)}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-800/10 text-amber-800 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>

            {/* Total Appointments */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                  Appointments
                </p>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {adminStats.stats?.totalAppointments || appointments.length}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>

            {/* Registered Users */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                  Registered Clients
                </p>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {adminStats.stats?.totalUsers || users.length}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            {/* Active Services */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                  Active Services
                </p>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700">
                  {adminStats.stats?.activeServices || 0}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Scissors className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Revenue by Category & Status Breakdown (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Category Revenue Horizontal Bar Chart (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Revenue by Discipline
                  </h3>
                  <p className="text-xs text-stone-500">
                    Gross revenue and booking volume by treatment category
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-amber-800" />
              </div>

              {adminStats.categoryRevenue.length === 0 ? (
                <p className="text-xs text-stone-400 py-6 text-center">
                  No categorized revenue data recorded yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {adminStats.categoryRevenue.map((item) => {
                    const percent = Math.round(
                      ((item.revenue || 0) / maxCategoryRevenue) * 100
                    );
                    return (
                      <div key={item.category} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-stone-800">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-stone-400">
                              {item.bookings} {item.bookings === 1 ? 'booking' : 'bookings'}
                            </span>
                            <span className="font-bold text-amber-900">
                              ${Number(item.revenue || 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-800 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(percent, 4)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Appointment Status Breakdown (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Appointment Status
                </h3>
                <p className="text-xs text-stone-500">
                  Session distribution across current bookings
                </p>
              </div>

              <div className="space-y-4">
                {/* Pending */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-amber-900">Pending Approval</span>
                    <span className="font-bold text-stone-900">
                      {adminStats.stats?.statusBreakdown?.pending || 0}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${Math.round(
                          ((adminStats.stats?.statusBreakdown?.pending || 0) / statusTotal) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Confirmed */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-emerald-800">Confirmed Slots</span>
                    <span className="font-bold text-stone-900">
                      {adminStats.stats?.statusBreakdown?.confirmed || 0}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{
                        width: `${Math.round(
                          ((adminStats.stats?.statusBreakdown?.confirmed || 0) /
                            statusTotal) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Completed */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-blue-800">Completed Sessions</span>
                    <span className="font-bold text-stone-900">
                      {adminStats.stats?.statusBreakdown?.completed || 0}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: `${Math.round(
                          ((adminStats.stats?.statusBreakdown?.completed || 0) /
                            statusTotal) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Cancelled */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-rose-800">Cancelled Bookings</span>
                    <span className="font-bold text-stone-900">
                      {adminStats.stats?.statusBreakdown?.cancelled || 0}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{
                        width: `${Math.round(
                          ((adminStats.stats?.statusBreakdown?.cancelled || 0) /
                            statusTotal) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Appointments & Recent Transactions Summary (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Recent Appointments */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Recent Appointments
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('appointments')}
                  className="text-xs font-semibold text-amber-800 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>

              {adminStats.recentAppointments?.length === 0 ? (
                <p className="text-xs text-stone-400 py-4 text-center">
                  No appointments registered yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {adminStats.recentAppointments.slice(0, 5).map((appt) => (
                    <div
                      key={appt._id}
                      className="flex items-center justify-between text-xs py-2 border-b border-stone-50 last:border-none"
                    >
                      <div className="space-y-0.5">
                        <p className="font-bold text-stone-900">{appt.serviceName}</p>
                        <p className="text-stone-500">
                          {appt.customerName} • {appt.appointmentDate} at {appt.timeSlot}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          appt.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : appt.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : appt.status === 'cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {appt.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Transactions */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Recent Transactions
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('transactions')}
                  className="text-xs font-semibold text-amber-800 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>

              {adminStats.recentTransactions?.length === 0 ? (
                <p className="text-xs text-stone-400 py-4 text-center">
                  No payments processed yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {adminStats.recentTransactions.slice(0, 5).map((tx) => (
                    <div
                      key={tx._id}
                      className="flex items-center justify-between text-xs py-2 border-b border-stone-50 last:border-none"
                    >
                      <div className="space-y-0.5">
                        <p className="font-bold text-stone-900">{tx.serviceName}</p>
                        <p className="text-stone-500">{tx.customerEmail}</p>
                      </div>
                      <span className="font-bold text-amber-900">
                        ${Number(tx.amount || 0).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: MANAGE SERVICES (FULL CRUD) */}
      {/* ======================================================== */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                placeholder="Search services by title or category..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-xs sm:text-sm bg-white"
              />
            </div>

            <button
              type="button"
              onClick={openAddServiceModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>

          {/* Services Table */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF8F5] border-b border-stone-200 text-stone-600 text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-5">Treatment</th>
                    <th className="py-3.5 px-5">Category</th>
                    <th className="py-3.5 px-5">Duration</th>
                    <th className="py-3.5 px-5">Price</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredServices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-stone-400">
                        No treatments found matching your query.
                      </td>
                    </tr>
                  ) : (
                    filteredServices.map((service) => (
                      <tr key={service._id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                              <Image
                                src={service.image || FALLBACK_IMAGE}
                                alt={service.serviceName}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-stone-900">{service.serviceName}</p>
                              <p className="text-[11px] text-stone-400 line-clamp-1 max-w-xs">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 text-stone-600 font-medium">{service.category}</td>
                        <td className="py-3.5 px-5 text-stone-600">{service.duration} mins</td>
                        <td className="py-3.5 px-5 font-bold text-amber-900">
                          ${Number(service.price).toFixed(2)}
                        </td>
                        <td className="py-3.5 px-5">
                          <button
                            type="button"
                            onClick={() => handleToggleServiceStatus(service)}
                            title="Click to toggle active status"
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                              service.status === 'active'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                : 'bg-stone-100 text-stone-500 border border-stone-200 hover:bg-stone-200'
                            }`}
                          >
                            <Power className="w-3 h-3" />
                            <span>{service.status}</span>
                          </button>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openEditServiceModal(service)}
                              title="Edit Service"
                              className="p-1.5 rounded-lg text-stone-600 hover:text-amber-800 hover:bg-stone-100 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteService(service._id)}
                              title="Delete Service"
                              className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: MANAGE APPOINTMENTS */}
      {/* ======================================================== */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          {/* Filter Pills & Search Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {['All', ...APPOINTMENT_STATUSES].map((status) => {
                const active = appointmentFilter === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setAppointmentFilter(status)}
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

            <div className="relative max-w-xs">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={appointmentSearch}
                onChange={(e) => setAppointmentSearch(e.target.value)}
                placeholder="Search by client or treatment..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-xs sm:text-sm bg-white"
              />
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF8F5] border-b border-stone-200 text-stone-600 text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-5">Client</th>
                    <th className="py-3.5 px-5">Treatment</th>
                    <th className="py-3.5 px-5">Date & Time</th>
                    <th className="py-3.5 px-5">Fee</th>
                    <th className="py-3.5 px-5">Payment</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-stone-400">
                        No appointments match your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appt) => {
                      const isPaid = appt.paymentStatus === 'paid';
                      return (
                        <tr key={appt._id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3.5 px-5">
                            <p className="font-semibold text-stone-900">{appt.customerName}</p>
                            <p className="text-[11px] text-stone-500">{appt.customerEmail}</p>
                          </td>
                          <td className="py-3.5 px-5">
                            <p className="font-medium text-stone-800">{appt.serviceName}</p>
                            <span className="text-[10px] text-stone-400 uppercase">
                              {appt.serviceCategory}
                            </span>
                          </td>
                          <td className="py-3.5 px-5">
                            <p className="font-medium text-stone-800">{appt.appointmentDate}</p>
                            <p className="text-[11px] text-amber-800 font-semibold">{appt.timeSlot}</p>
                          </td>
                          <td className="py-3.5 px-5 font-bold text-stone-900">
                            ${Number(appt.price || 0).toFixed(2)}
                          </td>
                          <td className="py-3.5 px-5">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                isPaid
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-stone-100 text-stone-500 border border-stone-200'
                              }`}
                            >
                              {isPaid ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              <span>{isPaid ? 'Paid' : 'Unpaid'}</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-5">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                appt.status === 'confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : appt.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : appt.status === 'cancelled'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {appt.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <select
                              value={appt.status}
                              disabled={updatingApptId === appt._id}
                              onChange={(e) =>
                                handleUpdateAppointmentStatus(appt._id, e.target.value)
                              }
                              className="py-1 px-2.5 rounded-lg border border-stone-300 text-xs font-medium text-stone-800 bg-white focus:outline-none focus:border-amber-800 cursor-pointer disabled:opacity-50"
                            >
                              {APPOINTMENT_STATUSES.map((st) => (
                                <option key={st} value={st}>
                                  {st.charAt(0).toUpperCase() + st.slice(1)}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: MANAGE USERS */}
      {/* ======================================================== */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Users Search */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search clients by name, email or role..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-xs sm:text-sm bg-white"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF8F5] border-b border-stone-200 text-stone-600 text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-5">User Profile</th>
                    <th className="py-3.5 px-5">Contact Email</th>
                    <th className="py-3.5 px-5">Role</th>
                    <th className="py-3.5 px-5">Account Status</th>
                    <th className="py-3.5 px-5 text-right">Admin Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-stone-400">
                        No clients found.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((targetUser) => {
                      const isSelf = String(targetUser._id) === String(user?._id);
                      const userInitials = targetUser.name
                        ? targetUser.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()
                        : 'U';

                      return (
                        <tr key={targetUser._id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-amber-800 text-white flex items-center justify-center font-semibold text-xs shrink-0 overflow-hidden">
                                {targetUser.image ? (
                                  <Image
                                    src={targetUser.image}
                                    alt={targetUser.name}
                                    width={36}
                                    height={36}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                  />
                                ) : (
                                  <span>{userInitials}</span>
                                )}
                              </div>
                              <span className="font-semibold text-stone-900">
                                {targetUser.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-5 text-stone-600">{targetUser.email}</td>
                          <td className="py-3.5 px-5">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                targetUser.role === 'admin'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-stone-100 text-stone-700 border border-stone-200'
                              }`}
                            >
                              <Shield className="w-3 h-3" />
                              <span>{targetUser.role}</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-5">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                targetUser.isBlocked
                                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}
                            >
                              {targetUser.isBlocked ? (
                                <Ban className="w-3 h-3 text-rose-600" />
                              ) : (
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              )}
                              <span>{targetUser.isBlocked ? 'Blocked' : 'Active'}</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            {isSelf ? (
                              <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                                Current Admin
                              </span>
                            ) : (
                              <div className="flex items-center justify-end gap-2">
                                {/* Toggle Role */}
                                <button
                                  type="button"
                                  disabled={updatingUserId === targetUser._id}
                                  onClick={() => handleToggleUserRole(targetUser)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-stone-300 hover:border-amber-800 text-stone-700 text-xs font-medium hover:bg-stone-50 transition-colors cursor-pointer disabled:opacity-50"
                                >
                                  <UserCheck className="w-3.5 h-3.5 text-stone-500" />
                                  <span>
                                    {targetUser.role === 'admin' ? 'Set Customer' : 'Make Admin'}
                                  </span>
                                </button>

                                {/* Block / Unblock */}
                                <button
                                  type="button"
                                  disabled={updatingUserId === targetUser._id}
                                  onClick={() => handleToggleUserBlock(targetUser)}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 ${
                                    targetUser.isBlocked
                                      ? 'border-emerald-300 text-emerald-800 hover:bg-emerald-50'
                                      : 'border-rose-300 text-rose-800 hover:bg-rose-50'
                                  }`}
                                >
                                  {targetUser.isBlocked ? (
                                    <>
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      <span>Unblock</span>
                                    </>
                                  ) : (
                                    <>
                                      <Ban className="w-3.5 h-3.5" />
                                      <span>Block</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: ALL TRANSACTIONS */}
      {/* ======================================================== */}
      {activeTab === 'transactions' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF8F5] border-b border-stone-200 text-stone-600 text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-5">Client Email</th>
                    <th className="py-3.5 px-5">Treatment</th>
                    <th className="py-3.5 px-5">Transaction Date</th>
                    <th className="py-3.5 px-5">Stripe Session Ref</th>
                    <th className="py-3.5 px-5">Gross Amount</th>
                    <th className="py-3.5 px-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-stone-400">
                        No transactions registered in ledger yet.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx) => {
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
                            {tx.customerEmail}
                          </td>
                          <td className="py-3.5 px-5 text-stone-700">{tx.serviceName}</td>
                          <td className="py-3.5 px-5 text-stone-500">{dateStr}</td>
                          <td className="py-3.5 px-5 font-mono text-xs text-stone-500">
                            {truncatedSession}
                          </td>
                          <td className="py-3.5 px-5 font-bold text-amber-900">
                            ${Number(tx.amount || 0).toFixed(2)}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" />
                              Paid
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT SERVICE */}
      {/* ======================================================== */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                {editingService ? 'Edit Salon Treatment' : 'Add New Salon Treatment'}
              </h3>
              <button
                type="button"
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              {/* Service Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Treatment Title *
                </label>
                <input
                  type="text"
                  required
                  value={serviceFormData.serviceName}
                  onChange={(e) =>
                    setServiceFormData({ ...serviceFormData, serviceName: e.target.value })
                  }
                  placeholder="e.g. Signature Botanical Blowout"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                />
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={serviceFormData.category}
                    onChange={(e) =>
                      setServiceFormData({ ...serviceFormData, category: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 bg-white cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Status *
                  </label>
                  <select
                    value={serviceFormData.status}
                    onChange={(e) =>
                      setServiceFormData({ ...serviceFormData, status: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 bg-white cursor-pointer"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Price & Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={serviceFormData.price}
                    onChange={(e) =>
                      setServiceFormData({ ...serviceFormData, price: e.target.value })
                    }
                    placeholder="85"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Duration (Minutes) *
                  </label>
                  <input
                    type="number"
                    min="5"
                    step="5"
                    required
                    value={serviceFormData.duration}
                    onChange={(e) =>
                      setServiceFormData({ ...serviceFormData, duration: e.target.value })
                    }
                    placeholder="60"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  />
                </div>
              </div>

              {/* Image URL & Preview */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={serviceFormData.image}
                  onChange={(e) =>
                    setServiceFormData({ ...serviceFormData, image: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                />
                {serviceFormData.image && (
                  <div className="mt-2 relative h-28 w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                    <Image
                      src={serviceFormData.image}
                      alt="Service preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={serviceFormData.description}
                  onChange={(e) =>
                    setServiceFormData({ ...serviceFormData, description: e.target.value })
                  }
                  placeholder="Elaborate on the treatment experience, technique, and botanical products used..."
                  className="w-full p-3 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 resize-none"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2.5 rounded-full border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingService}
                  className="px-6 py-2.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {savingService ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    <span>{editingService ? 'Save Changes' : 'Create Treatment'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
