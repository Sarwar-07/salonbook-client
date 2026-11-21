'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import Logo from '@/components/Logo';
import toast from 'react-hot-toast';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  ArrowRight,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // If already authenticated, redirect to destination or role dashboard
  useEffect(() => {
    if (!authLoading && user) {
      if (callbackUrl && callbackUrl !== '/') {
        router.push(callbackUrl);
      } else if (user.role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/customer');
      }
    }
  }, [user, authLoading, router, callbackUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    setLoading(true);

    try {
      const res = await signIn.email({
        email: email.trim().toLowerCase(),
        password,
      });

      if (res?.error) {
        const error = res.error;
        if (error.status >= 500 || error.code === 'INTERNAL_SERVER_ERROR') {
          toast.error(
            'Authentication server error—please check database connectivity and try again.'
          );
        } else {
          toast.error(error.message || 'Invalid email or password');
        }
        return;
      }

      toast.success('Welcome back to SalonBook!');

      // Role-based redirect
      try {
        const data = await apiRequest('/api/auth/jwt', {
          method: 'POST',
          body: {
            email: email.trim().toLowerCase(),
          },
        });

        if (data?.token && typeof window !== 'undefined') {
          localStorage.setItem('salonbook_token', data.token);
        }

        const role = data?.user?.role || res?.data?.user?.role;

        if (callbackUrl && callbackUrl !== '/') {
          router.push(callbackUrl);
        } else if (role === 'admin') {
          router.push('/dashboard/admin');
        } else {
          router.push('/dashboard/customer');
        }
      } catch {
        if (callbackUrl && callbackUrl !== '/') {
          router.push(callbackUrl);
        } else {
          router.push('/dashboard/customer');
        }
      }
    } catch (err) {
      console.error('Sign in error:', err);
      if (err?.status >= 500 || err?.code === 'INTERNAL_SERVER_ERROR') {
        toast.error(
          'Authentication server error—please check database connectivity and try again.'
        );
      } else {
        toast.error(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: callbackUrl && callbackUrl !== '/' ? callbackUrl : '/dashboard/customer',
      });
    } catch (err) {
      console.error('Google sign in error:', err);
      toast.error(err.message || 'Failed to sign in with Google');
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
          Welcome Back
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-light">
          Sign in to access your bespoke appointments & treatments
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-widest mb-1.5">
            Email Address
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

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-widest">
              Password
            </label>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3.5 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-[#A2683A] to-[#824D25] hover:opacity-95 shadow-md shadow-[#824D25]/15 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-98"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
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
          <span className="bg-white px-3 text-stone-400 font-medium">Or continue with</span>
        </div>
      </div>

      {/* Google OAuth Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
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

      {/* Switch to Register */}
      <p className="mt-8 text-center text-xs text-stone-500">
        New to SalonBook?{' '}
        <Link
          href="/register"
          className="font-medium text-[#A2683A] hover:text-[#824D25] hover:underline transition-colors"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex items-center justify-center text-stone-500 text-sm">
            Loading...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
