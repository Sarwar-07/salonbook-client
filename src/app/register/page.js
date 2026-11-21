'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { signUp, signIn } from '@/lib/auth-client';
import { uploadImageToImgBB } from '@/lib/uploadImage';
import Logo from '@/components/Logo';
import toast from 'react-hot-toast';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Image as ImageIcon,
  Loader2,
  ArrowRight,
  Upload,
} from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const url = await uploadImageToImgBB(file);
      setImage(url);
      toast.success('Profile photo uploaded!');
    } catch (err) {
      console.error('Photo upload error:', err);
      toast.error(err.message || 'Failed to upload photo');
    } finally {
      setImageUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !name.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (!email || !email.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!password) {
      toast.error('Please provide a password');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error('Password must contain at least one uppercase letter (A-Z)');
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error('Password must contain at least one lowercase letter (a-z)');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (image?.trim()) {
      const trimmedImage = image.trim();
      if (trimmedImage.startsWith('data:')) {
        toast.error('Please enter a valid http:// or https:// image URL, or leave it blank.');
        return;
      }
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        image: image.trim() || undefined,
      });

      if (res?.error) {
        toast.error(res.error.message || 'Registration failed');
        return;
      }

      toast.success('Account created! Welcome to SalonBook.');
      router.push('/');
    } catch (err) {
      console.error('Registration error:', err);
      toast.error(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: callbackUrl,
      });
    } catch (err) {
      console.error('Google sign up error:', err);
      toast.error(err.message || 'Failed to authenticate with Google');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white/90 backdrop-blur-md border border-stone-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-stone-900/5">
      {/* Brand Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="flex justify-center mb-4">
          <Link href="/" className="inline-flex items-center group">
            <Logo showTagline />
          </Link>
        </div>
        <h1 className="font-serif text-3xl font-semibold text-[#181512] tracking-tight">
          Create an Account
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-light">
          Begin your personalized journey with SalonBook
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-widest mb-1.5">
            Full Name <span className="text-[#A2683A]">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Genevieve Dupont"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] transition-all text-sm text-[#181512] placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-widest mb-1.5">
            Email Address <span className="text-[#A2683A]">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] transition-all text-sm text-[#181512] placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Profile Photo (ImgBB Upload or URL) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-widest">
              Profile Photo
            </label>
            <span className="text-[11px] text-stone-400 font-normal">Optional</span>
          </div>

          <div className="flex items-center gap-4 p-3.5 bg-[#FAF7F2]/80 border border-stone-200/80 rounded-2xl">
            {/* Live Avatar Preview */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#824D25]/10 border-2 border-stone-200 text-stone-500 flex items-center justify-center shrink-0">
              {image ? (
                <Image
                  src={image}
                  alt="Avatar preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <User className="w-6 h-6 text-stone-400" />
              )}
            </div>

            {/* Direct File Upload via ImgBB */}
            <div className="flex-1 space-y-1">
              <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer">
                {imageUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#A2683A]" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5 text-[#A2683A]" />
                    <span>{image ? 'Change Photo' : 'Upload Photo'}</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  disabled={imageUploading}
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </label>

              {image ? (
                <button
                  type="button"
                  onClick={() => setImage('')}
                  className="block text-[11px] text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Remove photo
                </button>
              ) : (
                <p className="text-[11px] text-stone-400">
                  Upload directly via ImgBB (or paste URL below)
                </p>
              )}
            </div>
          </div>

          {/* Optional Direct URL input as fallback */}
          <div className="relative mt-2">
            <ImageIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Or paste image URL (https://...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] transition-all text-xs text-[#181512] placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-widest mb-1.5">
            Password <span className="text-[#A2683A]">*</span>
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              minLength={6}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] transition-all text-sm text-[#181512] placeholder:text-stone-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Toggle password visibility"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[11px] text-stone-400 mt-1">
            Must be at least 6 characters with uppercase (A-Z) and lowercase (a-z) letters.
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-widest mb-1.5">
            Confirm Password <span className="text-[#A2683A]">*</span>
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] transition-all text-sm text-[#181512] placeholder:text-stone-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label="Toggle confirm password visibility"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || imageUploading}
          className="w-full mt-2 py-3.5 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-[#A2683A] to-[#824D25] hover:opacity-95 shadow-md shadow-[#824D25]/15 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-98"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : imageUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading Photo...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-white px-3 text-stone-400 font-medium">Or register with</span>
        </div>
      </div>

      {/* Google OAuth Button */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={googleLoading}
        className="w-full py-3 px-4 rounded-xl font-medium text-sm text-[#181512] bg-white border border-stone-200 hover:bg-stone-50 hover:border-stone-300 transition-all flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {googleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-stone-500" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        <span>Continue with Google</span>
      </button>

      {/* Switch to Login */}
      <p className="mt-8 text-center text-xs text-stone-500">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-[#A2683A] hover:text-[#824D25] hover:underline transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex items-center justify-center text-stone-500 text-sm">
            Loading...
          </div>
        }
      >
        <RegisterForm />
      </Suspense>
    </div>
  );
}
