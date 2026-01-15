"use client";
import Link from "next/link";
import { Grid3x3, LayoutGrid, CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const { dict } = useLanguage();
  const [greeting, setGreeting] = useState("");

  // Logic sapaan berdasarkan waktu (Pagi/Siang/Malam)
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(dict.home.greeting_morning);
    else if (hour < 18) setGreeting(dict.home.greeting_afternoon);
    else setGreeting(dict.home.greeting_evening);
  }, [dict]);

  // Animasi container biar muncul satu-satu
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="min-h-screen pt-28 pb-10 px-4 max-w-5xl mx-auto flex flex-col items-center"
    >
      
      {/* 1. SECTION GREETING & PROGRESS */}
      <motion.div variants={itemVars} className="w-full text-center mb-12">
        <h2 className="text-slate-400 font-medium text-lg mb-1">{greeting} Player 1</h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-6">
          {dict.home.hero_title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">{dict.home.hero_highlight}</span>
        </h1>

        {/* Gamification: Daily Goal Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 max-w-md mx-auto flex items-center gap-4 transform hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
            <CheckCircle2 size={24} />
          </div>
          <div className="text-left flex-1">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
              <span>{dict.gamification.daily_goal}</span>
              <span>1/2</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-teal-500 rounded-full" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">{dict.gamification.progress_text}</p>
          </div>
        </div>
      </motion.div>

      {/* 2. SECTION GAME CARDS (QUESTS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        
        {/* QUEST 1: SUDOKU */}
        <motion.div variants={itemVars}>
          <Link href="/sudoku" className="group relative block h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-white p-8 rounded-3xl border border-slate-100 h-full flex flex-col shadow-sm group-hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                  <Grid3x3 size={32} />
                </div>
                <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500">LOGIC</span>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{dict.home.card_sudoku_title}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-grow">{dict.home.card_sudoku_desc}</p>
              
              <div className="flex items-center text-indigo-600 font-bold text-sm">
                {dict.home.card_play} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* QUEST 2: PUZZLE */}
        <motion.div variants={itemVars}>
          <Link href="/puzzle" className="group relative block h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-white p-8 rounded-3xl border border-slate-100 h-full flex flex-col shadow-sm group-hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-pink-50 rounded-2xl text-pink-600">
                  <LayoutGrid size={32} />
                </div>
                <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500">VISUAL</span>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{dict.home.card_puzzle_title}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-grow">{dict.home.card_puzzle_desc}</p>
              
              <div className="flex items-center text-pink-600 font-bold text-sm">
                {dict.home.card_play} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

      </div>
    </motion.div>
  );
}