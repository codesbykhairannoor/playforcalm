"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Flame, Star, Grid3x3, LayoutGrid, Home, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { dict, changeLanguage, lang } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  const isActive = (path) => pathname === path;

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'zh', label: 'Mandarin', flag: '🇨🇳' },
    { code: 'es', label: 'Spanish', flag: '🇪🇸' },
    { code: 'de', label: 'German', flag: '🇩🇪' },
    { code: 'ms', label: 'Malaysia', flag: '🇲🇾' },
  ];

  const navLinks = [
    { href: "/", label: dict.nav.home || "Home", icon: <Home size={14} />, color: "text-teal-600" },
    { href: "/sudoku", label: dict.nav.sudoku, icon: <Grid3x3 size={14} />, color: "text-indigo-600" },
    { href: "/puzzle", label: dict.nav.puzzle, icon: <LayoutGrid size={14} />, color: "text-pink-600" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }}
      className="fixed top-4 left-0 right-0 max-w-6xl mx-auto z-[70] px-4"
    >
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-full px-2 py-2 sm:px-6 sm:py-3 flex justify-between items-center">
        
        {/* BAGIAN 1: LOGO & DESKTOP NAV */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full text-white shadow-md group-hover:scale-110 transition-transform">
              <Leaf size={18} fill="currentColor" />
            </div>
            <span className="hidden lg:block font-bold text-lg text-slate-700">{dict.nav.logo}</span>
          </Link>

          <div className="hidden md:flex items-center bg-slate-100/50 rounded-full p-1 border border-slate-200/50">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${isActive(link.href) ? `bg-white ${link.color} shadow-sm` : 'text-slate-500 hover:text-slate-700'}`}>
                {link.icon} <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT HUD: LEVEL, STREAK, LANG & HAMBURGER */}
        <div className="flex items-center gap-2 sm:gap-4 relative">
          
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
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
          </div>

          {/* DROPDOWN BAHASA */}
          <div className="relative" ref={langRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-white hover:bg-teal-600 transition-all active:scale-95 shadow-lg"
            >
              <Globe size={14} />
              <span className="text-[10px] font-black uppercase">{lang}</span>
              <ChevronDown size={12} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 5, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden py-1 z-[80]"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        changeLanguage(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-colors ${lang === l.code ? 'bg-teal-50 text-teal-600' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <span>{l.label}</span>
                      <span>{l.flag}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* HAMBURGER (Mobile) */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-slate-100">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-18 left-4 right-4 bg-white/95 backdrop-blur-md border border-slate-100 shadow-2xl rounded-3xl p-4 md:hidden flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50">
                {link.icon} {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}