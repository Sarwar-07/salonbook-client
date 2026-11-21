'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import toast from 'react-hot-toast';
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  Scissors,
  Shield,
  Globe,
  LogOut,
  Menu,
  X,
  Loader2,
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Route & Block Protection
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname || '/dashboard/customer')}`);
      } else if (user.isBlocked) {
        toast.error('Your account has been suspended by an administrator.');
        logout();
      }
    }
  }, [user, loading, router, pathname, logout]);

  // Loading state
  if (loading || !user) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#A2683A]" />
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  const isAdmin = user.role === 'admin';

  const navLinks = isAdmin
    ? [
        {
          name: 'Admin Dashboard',
          href: '/dashboard/admin',
          icon: Shield,
        },
        {
          name: 'My Profile',
          href: '/dashboard/profile',
          icon: User,
        },
        {
          name: 'View Live Site',
          href: '/',
          icon: Globe,
        },
      ]
    : [
        {
          name: 'Dashboard & Bookings',
          href: '/dashboard/customer',
          icon: CalendarCheck,
        },
        {
          name: 'My Profile',
          href: '/dashboard/profile',
          icon: User,
        },
        {
          name: 'Browse Services',
          href: '/services',
          icon: Scissors,
        },
      ];

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      {/* Top Brand & Nav */}
      <div className="space-y-6">
        {/* SalonBook Brand Pill */}
        <div className="px-1 py-1 flex items-center justify-between border-b border-stone-200/80 pb-4">
          <Link href="/" className="inline-flex items-center group">
            <Logo />
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#824D25] bg-[#EEDCC8]/40 px-2 py-0.5 rounded-md border border-[#A2683A]/30">
            {isAdmin ? 'Admin' : 'Client'}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-[#A2683A] to-[#824D25] text-white shadow-sm shadow-[#824D25]/15'
                    : 'text-stone-700 hover:text-[#181512] hover:bg-stone-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-stone-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Card & Logout */}
      <div className="pt-4 border-t border-stone-200/80 space-y-3">
        <div className="flex items-center gap-3 p-2 bg-[#FAF7F2] rounded-xl border border-stone-200/60">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#A2683A] to-[#824D25] text-white flex items-center justify-center text-xs font-bold overflow-hidden shrink-0">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={36}
                height={36}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <span>{userInitials}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#181512] truncate leading-tight">
              {user.name}
            </p>
            <p className="text-[10px] text-stone-500 truncate leading-tight">
              {user.email}
            </p>
            <span
              className={`inline-block mt-0.5 text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded ${
                isAdmin
                  ? 'bg-[#EEDCC8]/40 text-[#824D25]'
                  : 'bg-stone-200 text-stone-700'
              }`}
            >
              {user.role}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            logout();
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200/60 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#FAF8F5] flex flex-col md:flex-row">
      {/* Mobile Header Bar with Drawer Toggle */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-stone-200 sticky top-20 z-30">
        <div className="flex items-center gap-2">
          <Logo iconOnly className="w-6 h-6" />
          <span className="font-serif font-bold text-stone-900 text-sm">
            {isAdmin ? 'Admin Console' : 'Dashboard Suite'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle Dashboard Menu"
          className="p-2 rounded-lg text-stone-700 hover:bg-stone-100"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Mobile Slide-in Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-white z-50 p-5 transform transition-transform duration-200 md:hidden shadow-xl ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
          <span className="font-serif font-bold text-sm text-stone-900">Navigation</span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded text-stone-400 hover:text-stone-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {renderSidebarContent()}
      </aside>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 min-h-[calc(100vh-5rem)] border-r border-stone-200/90 bg-white/80 backdrop-blur-sm p-5 shrink-0 flex-col justify-between sticky top-20 h-[calc(100vh-5rem)]">
        {renderSidebarContent()}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
