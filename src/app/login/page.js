'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, signUp } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import {
  Sparkles,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  ArrowRight,
  Shield,
  User,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const fillDemoCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    toast.success(
      `Autofilled ${demoEmail === 'admin@salonbook.com' ? 'Admin' : 'Customer'} credentials`
    );
  };

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
        // If demo credentials and user does not exist in Better Auth yet, auto-register it
        const normalized = email.trim().toLowerCase();
        if (
          normalized === 'admin@salonbook.com' ||
          normalized === 'customer@salonbook.com'
        ) {
          const demoName =
            normalized === 'admin@salonbook.com'
              ? 'Aria Montgomery (Admin)'
              : 'Sophia Laurent';

          const signUpRes = await signUp.email({
            email: normalized,
            password,
            name: demoName,
          });

          if (signUpRes?.error) {
            toast.error(signUpRes.error.message || 'Failed to initialize demo account');
            return;
          }

          toast.success('Welcome back to SalonBook!');
          router.push(callbackUrl);
          return;
        }

        toast.error(res.error.message || 'Invalid email or password');
        return;
      }

      toast.success('Welcome back to SalonBook!');
      router.push(callbackUrl);
    } catch (err) {
      console.error('Sign in error:', err);
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: callbackUrl,
      });
    } catch (err) {
      console.error('Google sign in error:', err);
      toast.error(err.message || 'Failed to sign in with Google');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-10 shadow-sm">
      {/* Brand Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="w-12 h-12 rounded-full bg-amber-800/10 text-amber-800 border border-amber-800/20 flex items-center justify-center mx-auto mb-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Sign in to access your bespoke appointments & treatments
        </p>
      </div>

      {/* Demo Credentials Quick-Select Pill Box */}
      <div className="mb-6 p-3.5 bg-[#FAF8F5] border border-amber-800/15 rounded-2xl space-y-2">
        <p className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider text-center">
          ⚡ One-Click Demo Evaluator Credentials
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => fillDemoCredentials('admin@salonbook.com', 'Admin@1234')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-stone-200 hover:border-amber-800 text-stone-800 hover:text-amber-900 text-xs font-medium transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <Shield className="w-3.5 h-3.5 text-amber-800" />
            <span>Demo Admin</span>
          </button>
          <button
            type="button"
            onClick={() => fillDemoCredentials('customer@salonbook.com', 'Customer@1234')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-stone-200 hover:border-amber-800 text-stone-800 hover:text-amber-900 text-xs font-medium transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <User className="w-3.5 h-3.5 text-amber-800" />
            <span>Demo Customer</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
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
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition-colors text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50/50"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
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
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition-colors text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50/50"
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
          className="w-full mt-2 py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-amber-800 hover:bg-amber-900 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-98"
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
        className="w-full py-3 px-4 rounded-xl font-medium text-sm text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 hover:border-stone-400 transition-all flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
          className="font-semibold text-amber-800 hover:underline transition-colors"
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
