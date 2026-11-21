'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import {
  Menu,
  X,
  ChevronDown,
  User,
  LayoutDashboard,
  CalendarCheck,
  LogOut,
  ShieldCheck,
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
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={closeMenus}
            className="group transition-transform active:scale-95 inline-flex items-center"
          >
            <Logo showTagline />
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    active
                      ? 'bg-amber-800/10 text-amber-900 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Auth Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-10 w-28 bg-stone-200/70 rounded-full animate-pulse" />
              </div>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-stone-200 bg-white hover:border-amber-700/40 hover:bg-amber-50/30 transition-all cursor-pointer shadow-xs"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-amber-800 text-white flex items-center justify-center text-xs font-semibold shrink-0">
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
                    <p className="text-xs font-medium text-stone-900 leading-tight max-w-[120px] truncate">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-stone-500 capitalize leading-tight">
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
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-stone-100">
                      <p className="text-sm font-semibold text-stone-900 truncate">{user.name}</p>
                      <p className="text-xs text-stone-500 truncate mt-0.5">{user.email}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            user.role === 'admin'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-stone-100 text-stone-700 border border-stone-200'
                          }`}
                        >
                          {user.role === 'admin' ? (
                            <ShieldCheck className="w-3 h-3 text-amber-700" />
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
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-amber-800 transition-colors"
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
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-amber-800 transition-colors"
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
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-700 hover:bg-rose-50/80 transition-colors text-left cursor-pointer"
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
                  className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100/70 rounded-full transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/services"
                  onClick={closeMenus}
                  className="px-5 py-2 text-sm font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-95"
                >
                  Book Now
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
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          {/* User badge if logged in */}
          {user && (
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-amber-800 text-white flex items-center justify-center font-semibold text-sm shrink-0 overflow-hidden">
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
                <p className="text-sm font-semibold text-stone-900 truncate">{user.name}</p>
                <p className="text-xs text-stone-500 truncate">{user.email}</p>
              </div>
              <span
                className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                  user.role === 'admin'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
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
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-amber-800/10 text-amber-900 font-semibold'
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
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/dashboard/profile')
                    ? 'bg-amber-800/10 text-amber-900 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                My Profile
              </Link>
            )}
          </div>

          {/* Mobile Auth Actions */}
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            {loading ? (
              <div className="h-10 bg-stone-200/70 rounded-xl animate-pulse" />
            ) : user ? (
              <button
                type="button"
                onClick={() => {
                  closeMenus();
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-medium text-stone-800 bg-white border border-stone-300 hover:bg-stone-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/services"
                  onClick={closeMenus}
                  className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-medium text-white bg-amber-800 hover:bg-amber-900 shadow-sm transition-colors"
                >
                  Book Now
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
