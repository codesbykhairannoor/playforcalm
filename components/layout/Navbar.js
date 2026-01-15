"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Buat tau lagi di halaman mana
import { Leaf, Flame, Star, Languages, Grid3x3, LayoutGrid, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { dict, toggleLanguage, language } = useLanguage();
  const pathname = usePathname(); // Cek URL aktif

  // Helper biar kodingan rapi: Cek apakah link ini lagi aktif?
  const isActive = (path) => pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-4 left-0 right-0 max-w-6xl mx-auto z-50 px-4"
    >
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-full px-2 py-2 sm:px-6 sm:py-3 flex justify-between items-center">
        
        {/* BAGIAN 1: LOGO & BRAND (Klik balik ke Home) */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full text-white shadow-md group-hover:scale-110 transition-transform">
              <Leaf size={18} fill="currentColor" />
            </div>
            <span className="hidden lg:block font-bold text-lg text-slate-700 tracking-tight group-hover:text-teal-600 transition-colors">
              {dict.nav.logo}
            </span>
          </Link>

          {/* BAGIAN 2: NAVIGASI MENU (Home, Sudoku, Puzzle) */}
          <div className="hidden md:flex items-center bg-slate-100/50 rounded-full p-1 border border-slate-200/50">
            {/* Tombol Home */}
            <Link 
              href="/" 
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${isActive('/') ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Home size={14} />
              <span className="hidden lg:inline">Home</span>
            </Link>

            {/* Tombol Sudoku */}
            <Link 
              href="/sudoku" 
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${isActive('/sudoku') ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Grid3x3 size={14} />
              <span>{dict.nav.sudoku}</span>
            </Link>

            {/* Tombol Puzzle */}
            <Link 
              href="/puzzle" 
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${isActive('/puzzle') ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutGrid size={14} />
              <span>{dict.nav.puzzle}</span>
            </Link>
          </div>
        </div>

        {/* BAGIAN 3: HUD (Level, Streak, Bahasa) */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Level Badge (Hidden di HP kecil biar gak sempit) */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
            <Star size={14} className="text-indigo-500 fill-indigo-500" />
            <span className="text-xs font-bold text-indigo-700 uppercase">
              {dict.gamification.level || "Novice"}
            </span>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full" title="Daily Streak">
            <Flame size={14} className="text-orange-500 fill-orange-500 animate-pulse" />
            <span className="text-xs font-bold text-orange-700 whitespace-nowrap">
              3 {dict.gamification.streak ? dict.gamification.streak.split(" ")[0] : "Days"} 🔥
            </span>
          </div>

          {/* Separator Kecil */}
          <div className="w-px h-6 bg-slate-200 mx-1"></div>

          {/* Tombol Bahasa */}
          <button 
            onClick={toggleLanguage}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-teal-50 border border-slate-200 text-slate-600 hover:text-teal-600 transition-colors"
            title="Ganti Bahasa"
          >
            <span className="text-xs font-bold">{language.toUpperCase()}</span>
          </button>
        </div>

      </div>
    </motion.nav>
  );
}