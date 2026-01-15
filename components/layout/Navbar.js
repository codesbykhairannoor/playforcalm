"use client";
import { useState } from 'react'; // Tambah state buat buka/tutup menu
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Flame, Star, Grid3x3, LayoutGrid, Home, Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { dict, toggleLanguage, language } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State Hamburger

  const isActive = (path) => pathname === path;

  // List menu biar gak nulis ulang dua kali
  const navLinks = [
    { href: "/", label: "Home", icon: <Home size={14} />, color: "text-teal-600" },
    { href: "/sudoku", label: dict.nav.sudoku, icon: <Grid3x3 size={14} />, color: "text-indigo-600" },
    { href: "/puzzle", label: dict.nav.puzzle, icon: <LayoutGrid size={14} />, color: "text-pink-600" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-4 left-0 right-0 max-w-6xl mx-auto z-[60] px-4"
    >
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-full px-2 py-2 sm:px-6 sm:py-3 flex justify-between items-center">
        
        {/* BAGIAN 1: LOGO */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full text-white shadow-md group-hover:scale-110 transition-transform">
              <Leaf size={18} fill="currentColor" />
            </div>
            <span className="hidden lg:block font-bold text-lg text-slate-700 tracking-tight group-hover:text-teal-600 transition-colors">
              {dict.nav.logo}
            </span>
          </Link>

          {/* BAGIAN 2: NAVIGASI (Desktop) */}
          <div className="hidden md:flex items-center bg-slate-100/50 rounded-full p-1 border border-slate-200/50">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${isActive(link.href) ? `bg-white ${link.color} shadow-sm` : 'text-slate-500 hover:text-slate-700'}`}
              >
                {link.icon}
                <span className={link.href === "/" ? "hidden lg:inline" : ""}>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* BAGIAN 3: HUD & TOGGLES */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Level & Streak (Desktop Only) */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
              <Star size={14} className="text-indigo-500 fill-indigo-500" />
              <span className="text-xs font-bold text-indigo-700 uppercase">
                {dict.gamification.level || "Novice"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full">
              <Flame size={14} className="text-orange-500 fill-orange-500 animate-pulse" />
              <span className="text-xs font-bold text-orange-700 whitespace-nowrap">
                3 {dict.gamification.streak ? dict.gamification.streak.split(" ")[0] : "Days"} 🔥
              </span>
            </div>
          </div>

          <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block"></div>

          {/* Tombol Bahasa (Pake logic asli lu) */}
          <button 
            onClick={toggleLanguage}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-teal-50 border border-slate-200 text-slate-600 hover:text-teal-600 transition-colors"
          >
            <span className="text-xs font-bold">{language.toUpperCase()}</span>
          </button>

          {/* Tombol Hamburger (Mobile Only) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* DROPDOWN MENU MOBILE */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-lg border border-slate-200 shadow-2xl rounded-3xl p-4 md:hidden flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)} // Tutup menu kalo link diklik
                className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${isActive(link.href) ? `bg-slate-50 ${link.color}` : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}