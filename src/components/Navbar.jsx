'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import {
  Menu,
  X,
  ChevronDown,
  User,
  LayoutDashboard,
  CalendarCheck,
  LogOut,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef(null);

  const closeMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  if (user) {
    if (user.role === 'admin') {
      navLinks.push({ name: 'Admin Dashboard', href: '/dashboard/admin' });
    } else {
      navLinks.push({ name: 'My Appointments', href: '/dashboard/customer' });
    }
  }

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const dashboardHref = user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/customer';

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200/80 transition-colors shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo on Left */}
          <Link
            href="/"
            onClick={closeMenus}
            className="group transition-transform active:scale-95 inline-flex items-center shrink-0"
          >
            <Logo showTagline />
          </Link>

          {/* Clean Center Navigation Links with Bronze Active Indicator (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className={`relative px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                    active
                      ? 'text-[#121110] font-bold'
                      : 'text-stone-600 hover:text-[#121110]'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#C89B6E] via-[#A2683A] to-[#824D25] rounded-full animate-in fade-in duration-200" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Auth Actions & Profile Pill (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Vice City Theme Switch */}
            <ThemeToggle />

            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-10 w-28 bg-stone-200/70 rounded-full animate-pulse" />
              </div>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-stone-300 bg-white hover:border-[#C89B6E] hover:bg-[#FAF7F2] transition-all cursor-pointer shadow-xs"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#A2683A] to-[#824D25] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                    {user.image && !imgError ? (
                      <Image
                        src={user.image}
                        alt={user.name || 'User Avatar'}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                        unoptimized
                      />
                    ) : (
                      <span>{userInitials}</span>
                    )}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-[#181512] leading-tight max-w-[120px] truncate">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-stone-500 uppercase font-medium tracking-wider leading-tight">
                      {user.role}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-stone-100">
                      <p className="text-sm font-semibold text-[#181512] truncate">{user.name}</p>
                      <p className="text-xs text-stone-500 truncate mt-0.5">{user.email}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            user.role === 'admin'
                              ? 'bg-[#EEDCC8] text-[#824D25] border border-[#C48E60]/40'
                              : 'bg-stone-100 text-stone-700 border border-stone-200'
                          }`}
                        >
                          {user.role === 'admin' ? (
                            <ShieldCheck className="w-3 h-3 text-[#824D25]" />
                          ) : (
                            <User className="w-3 h-3 text-stone-600" />
                          )}
                          {user.role}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        href={dashboardHref}
                        onClick={closeMenus}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-[#FAF7F2] hover:text-[#824D25] transition-colors"
                      >
                        {user.role === 'admin' ? (
                          <LayoutDashboard className="w-4 h-4 text-stone-400" />
                        ) : (
                          <CalendarCheck className="w-4 h-4 text-stone-400" />
                        )}
                        <span>{user.role === 'admin' ? 'Admin Dashboard' : 'My Appointments'}</span>
                      </Link>

                      <Link
                        href="/dashboard/profile"
                        onClick={closeMenus}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-[#FAF7F2] hover:text-[#824D25] transition-colors"
                      >
                        <User className="w-4 h-4 text-stone-400" />
                        <span>My Profile</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => {
                          closeMenus();
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-700 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="px-4 py-2 text-xs uppercase tracking-widest font-semibold text-stone-700 hover:text-[#121110] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="px-5 py-2.5 text-xs uppercase tracking-widest font-semibold text-white bg-[#121110] hover:bg-[#25221F] rounded-full shadow-xs hover:shadow transition-all duration-200 active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200/80 bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {/* User badge if logged in */}
          {user && (
            <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A2683A] to-[#824D25] text-white flex items-center justify-center font-semibold text-sm shrink-0 overflow-hidden">
                {user.image && !imgError ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'User'}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                    unoptimized
                  />
                ) : (
                  <span>{userInitials}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#181512] truncate">{user.name}</p>
                <p className="text-xs text-stone-500 truncate">{user.email}</p>
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  user.role === 'admin'
                    ? 'bg-[#EEDCC8] text-[#824D25] border border-[#C48E60]/40'
                    : 'bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {user.role}
              </span>
            </div>
          )}

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className={`px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors ${
                    active
                      ? 'bg-[#EEDCC8]/60 text-[#824D25] font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {user && (
              <Link
                href="/dashboard/profile"
                onClick={closeMenus}
                className="px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold text-stone-700 hover:bg-stone-100 flex items-center justify-between"
              >
                <span>My Profile</span>
                <User className="w-4 h-4 text-stone-400" />
              </Link>
            )}
          </div>

          {/* Mobile Footer CTAs */}
          <div className="pt-2 border-t border-stone-200 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Theme Style
              </span>
              <ThemeToggle />
            </div>

            {user ? (
              <button
                type="button"
                onClick={() => {
                  closeMenus();
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="py-2.5 rounded-xl text-center text-xs uppercase tracking-widest font-semibold border border-stone-300 bg-white text-stone-800 hover:bg-stone-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="py-2.5 rounded-xl text-center text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-[#A2683A] to-[#824D25] text-white shadow-xs"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
