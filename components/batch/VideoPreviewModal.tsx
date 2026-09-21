'use client';

import React from 'react';
import {
  X,
  Play,
  Volume2,
  Maximize2,
  Sparkles,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

interface VideoPreviewModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPreviewModal({ title, isOpen, onClose }: VideoPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-white">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-white">
              FREE ORIENTATION
            </span>
            <h4 className="text-sm font-bold truncate max-w-md text-slate-200">
              {title || 'Batch Orientation & Study Strategy'}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close video player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Mockup */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {/* Visual Player Canvas */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-slate-950 to-indigo-950 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-brand-600/90 hover:bg-brand-600 text-white flex items-center justify-center shadow-2xl transition-all cursor-pointer group mb-3 pl-1">
              <Play className="w-8 h-8 fill-white group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white max-w-md">
              Physics & Maths JEE 2026 Master Strategy
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Live classroom session with Er. Sachin Jakhar & Er. Rajwant Singh
            </p>
          </div>

          {/* Bottom Player Controls Mockup */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <button className="text-white hover:text-brand-400">
                <Play className="w-4 h-4 fill-white" />
              </button>
              <Volume2 className="w-4 h-4 text-slate-400" />
              <span className="text-[11px] font-mono">04:15 / 45:00</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded font-mono">1080p 60fps</span>
              <Maximize2 className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Video Notes & Highlights Footer */}
        <div className="p-4 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Full Lecture Notes PDF & 15-Question DPP attached with this session.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shrink-0 transition-colors"
          >
            Enroll for All 500+ Lectures
          </button>
        </div>
      </div>
    </div>
  );
}
