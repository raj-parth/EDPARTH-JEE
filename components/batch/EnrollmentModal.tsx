'use client';

import React, { useState } from 'react';
import {
  X,
  Zap,
  Tag,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Batch } from '@/lib/types/batch';

interface EnrollmentModalProps {
  batch: Batch;
  isOpen: boolean;
  onClose: () => void;
}

export function EnrollmentModal({ batch, isOpen, onClose }: EnrollmentModalProps) {
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const cleaned = couponCode.trim().toUpperCase();

    if (cleaned === 'EDPARTH100' || cleaned === 'PW100' || cleaned === 'MISSION100') {
      setDiscountApplied(500);
      setCouponSuccess('Coupon applied successfully! You saved ₹500.');
    } else {
      setCouponError('Invalid coupon code. Try using "EDPARTH100"');
    }
  };

  const finalPrice = Math.max(0, batch.price.discounted - discountApplied);

  const handleSubmitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          /* Success State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Enrollment Confirmed!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Welcome to <strong>{batch.title.split('—')[0]}</strong>, {name}! Your student portal and JoSAA mentorship access have been activated.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-left space-y-1.5">
              <div><strong>Registered Mobile:</strong> +91 {phone}</div>
              <div><strong>Batch ID:</strong> {batch.id.slice(0, 8)}...</div>
              <div><strong>Status:</strong> Active (Full Access)</div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all"
            >
              Go to My Study Dashboard
            </button>
          </div>
        ) : (
          /* Form State */
          <div className="p-6 sm:p-7 space-y-5">
            {/* Header */}
            <div>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                BATCH ADMISSION 2026
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Complete Enrollment
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {batch.title.split('—')[0]} • {batch.targetYear}
              </p>
            </div>

            {/* Price Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Original Course Fee</span>
                <span className="line-through">₹{batch.price.original.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>Special Batch Discount ({batch.price.discountPercent}%)</span>
                <span className="text-emerald-600 font-semibold">
                  - ₹{(batch.price.original - batch.price.discounted).toLocaleString('en-IN')}
                </span>
              </div>
              {discountApplied > 0 && (
                <div className="flex justify-between text-xs text-brand-600 font-semibold">
                  <span>Coupon Discount (EDPARTH100)</span>
                  <span>- ₹{discountApplied.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline font-bold text-slate-900 dark:text-white">
                <span className="text-sm">Total Payable</span>
                <span className="text-xl text-brand-600 dark:text-brand-400">
                  ₹{finalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Enter coupon (try EDPARTH100)"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponSuccess && (
                <p className="text-[11px] text-emerald-600 font-medium">{couponSuccess}</p>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-500 font-medium">{couponError}</p>
              )}
            </form>

            {/* User Input Form */}
            <form onSubmit={handleSubmitEnrollment} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Student Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  WhatsApp / Contact Phone Number
                </label>
                <div className="flex gap-2">
                  <span className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-mono flex items-center text-slate-600 dark:text-slate-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>Pay ₹{finalPrice.toLocaleString('en-IN')} & Unlock Full Batch</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Secure Checkout • Instant Portal Activation</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
