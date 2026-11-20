import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, Scissors } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-amber-800/10 text-amber-800 border border-amber-800/20 flex items-center justify-center mx-auto shadow-2xs">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Error 404
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Sanctuary Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
            The treatment or pathway you are seeking has retired, relocated, or does not exist in our salon suite.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200 active:scale-95"
          >
            <Scissors className="w-4 h-4" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
