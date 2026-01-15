"use client";
import React from 'react';
import { Leaf } from 'lucide-react'; // Baris ini yang tadi hilang

export default function Footer({ dict }) {
  return (
    <footer className="py-16 bg-white border-t border-slate-100 text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="p-2 bg-teal-500 rounded-lg text-white">
          <Leaf size={20} fill="currentColor" />
        </div>
        <span className="font-bold text-xl text-slate-800 tracking-tight">PlayForCalm</span>
      </div>
      <p className="text-slate-400 text-sm font-medium mb-2">
        {dict?.footer?.text || "Built for focus, not addiction."}
      </p>
      <p className="text-slate-300 text-xs tracking-widest uppercase font-bold">
        © 2026 Khairan Noor
      </p>
    </footer>
  );
}