'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import toast from 'react-hot-toast';
import {
  User,
  Mail,
  Phone,
  Image as ImageIcon,
  Shield,
  ArrowLeft,
  Loader2,
  Check,
  Sparkles,
} from 'lucide-react';

function ProfileForm({ user, onProfileUpdated }) {
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [image, setImage] = useState(user?.image || '');
  const [isSaving, setIsSaving] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const userInitials = (name || user?.name || 'U')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const previewUrl = image?.trim() || user?.image || '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !name.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        ...(image.trim() ? { image: image.trim() } : {}),
      };

      const res = await apiRequest('/api/users/profile', {
        method: 'PATCH',
        body: payload,
      });

      if (res?.user) {
        onProfileUpdated(res.user);
      }
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error(err.message || 'Unable to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Live Avatar Preview Row */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-[#FAF8F5] border border-stone-200/80 rounded-2xl">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-amber-800 text-white flex items-center justify-center text-xl font-bold border-2 border-white shadow-md shrink-0">
          {previewUrl && !previewError ? (
            <Image
              src={previewUrl}
              alt="Avatar preview"
              fill
              className="object-cover"
              onError={() => setPreviewError(true)}
              unoptimized
            />
          ) : (
            <span>{userInitials}</span>
          )}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <h2 className="font-serif text-lg font-bold text-stone-900">
            {name || 'Your Name'}
          </h2>
          <p className="text-xs text-stone-500">{user?.email}</p>
          <div className="pt-1">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                user?.role === 'admin'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span>{user?.role === 'admin' ? 'Administrator' : 'Customer Client'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-amber-800">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Genevieve Dupont"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50/50"
            />
          </div>
        </div>

        {/* Email (Read-Only) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Email Address
            </label>
            <span className="text-[10px] text-stone-400 uppercase font-medium">Read-Only</span>
          </div>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-500 bg-stone-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Phone Number
            </label>
            <span className="text-[10px] text-stone-400 font-normal">Optional</span>
          </div>
          <div className="relative">
            <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 234-5678"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50/50"
            />
          </div>
        </div>

        {/* Profile Photo URL */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Profile Photo URL
            </label>
            <span className="text-[10px] text-stone-400 font-normal">Optional</span>
          </div>
          <div className="relative">
            <ImageIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="url"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
                setPreviewError(false);
              }}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50/50"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-amber-800 hover:bg-amber-900 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, setUser, refreshUser } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?callbackUrl=/dashboard/profile');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-stone-400">
          <Loader2 className="w-6 h-6 animate-spin text-amber-800" />
          <span className="text-xs uppercase tracking-wider font-medium">Loading Profile...</span>
        </div>
      </div>
    );
  }

  const dashboardHref = user.role === 'admin' ? '/dashboard/admin' : '/dashboard/customer';
  const dashboardLabel = user.role === 'admin' ? 'Admin Dashboard' : 'My Appointments';

  const handleProfileUpdated = (updatedUser) => {
    setUser(updatedUser);
    refreshUser().catch(() => {});
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Back to Dashboard Link */}
      <div>
        <Link
          href={dashboardHref}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-amber-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {dashboardLabel}</span>
        </Link>
      </div>

      {/* Card Container */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-1 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2 text-amber-800">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Account Settings</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Client Profile
          </h1>
          <p className="text-xs text-stone-500">
            Manage your personal identity, contact phone, and avatar portrait.
          </p>
        </div>

        <ProfileForm
          key={user._id || user.email}
          user={user}
          onProfileUpdated={handleProfileUpdated}
        />
      </div>
    </div>
  );
}
