"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  Puzzle, 
  Coffee, 
  Quote, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Leaf 
} from "lucide-react";

export default function Home() {
  const { dict } = useLanguage();

  return (
    <main className="flex flex-col min-h-screen bg-[#f8fafc]">
      
      {/* SECTION 1: HERO - Dibuat lebih dramatis tapi tetap bersih */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Bulatan Estetik di Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-teal-200/20 blur-[100px] rounded-full -z-10 animate-pulse" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 py-2 px-5 mt-30 rounded-full bg-white border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
             <Sparkles size={14} className="text-teal-500" /> PlayForCalm
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-800 mb-8 leading-[1.1] tracking-tight">
            {dict.home?.hero_title} <br />
            <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {dict.home?.hero_highlight}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            {dict.home?.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
  href="#games" 
  className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-slate-400/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group"
>
  {/* SEKARANG MENGGUNAKAN KAMUS */}
  {dict.home.hero_button} 
  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
</Link>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: THE GAMES - Card dibuat lebih tebal dan teratur */}
     {/* SECTION 2: THE GAMES - Refined Layout */}
      <section id="games" className="py-32 px-6 max-w-7xl mx-auto w-full relative">
        {/* Header Section dengan Aksen Garis */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="relative">
            {/* Aksen garis kecil di atas title */}
            <div className="w-12 h-1.5 bg-teal-500 rounded-full mb-6" />
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight leading-tight">
              {dict.home?.games_title}
            </h2>
            <p className="text-slate-500 text-lg md:text-xl max-w-xl leading-relaxed">
              Pilih aktivitas yang paling sesuai dengan <span className="text-slate-800 font-semibold italic">ritme pikiranmu</span> saat ini.
            </p>
          </div>
          
          {/* Label tambahan di sisi kanan buat penyeimbang visual */}
          <div className="hidden lg:block pb-2">
            <span className="text-slate-300 font-black text-7xl uppercase tracking-tighter opacity-50 select-none">
              Zen-Play
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Sudoku Card */}
          <motion.div 
            whileHover={{ y: -12 }} 
            className="group relative p-10 rounded-[48px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-start overflow-hidden transition-all"
          >
            <div className="absolute top-0 right-0 p-10 text-indigo-50 group-hover:text-indigo-100/80 transition-colors -z-10">
              <BrainCircuit size={180} strokeWidth={1} />
            </div>
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 shadow-inner">
              <BrainCircuit size={32} />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">{dict.home?.card_sudoku_title}</h3>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed flex-grow">{dict.home?.card_sudoku_desc}</p>
            <Link href="/sudoku" className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 text-center">
              Play Sudoku
            </Link>
          </motion.div>

          {/* Puzzle Card */}
          <motion.div 
            whileHover={{ y: -12 }} 
            className="group relative p-10 rounded-[48px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-start overflow-hidden transition-all"
          >
            <div className="absolute top-0 right-0 p-10 text-pink-50 group-hover:text-pink-100/80 transition-colors -z-10">
              <Puzzle size={180} strokeWidth={1} />
            </div>
            <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-8 shadow-inner">
              <Puzzle size={32} />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">{dict.home?.card_puzzle_title}</h3>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed flex-grow">{dict.home?.card_puzzle_desc}</p>
            <Link href="/puzzle" className="w-full sm:w-auto px-10 py-4 bg-pink-600 text-white rounded-2xl font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-200 text-center">
              Start Puzzle
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: THE FLOW STATE - Konsep visual langkah menuju tenang */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900 rounded-[64px] overflow-hidden relative shadow-2xl shadow-slate-900/20">
            {/* Dekorasi Cahaya di Pojok */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-teal-500/20 blur-[100px] rounded-full" />
            
            <div className="px-8 py-20 md:p-20 relative z-10">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  {dict.home?.benefits_title}
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                  Bukan sekadar bermain, ini adalah cara untuk mengalihkan kebisingan dunia menjadi satu titik fokus yang damai.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12 relative">
                {/* Garis Penghubung (Hanya muncul di Desktop) */}
                <div className="hidden md:block absolute top-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

                {/* Step 1 */}
                <motion.div 
                  whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-3xl flex items-center justify-center text-teal-400 mb-8 group-hover:border-teal-500/50 group-hover:bg-slate-800/50 transition-all duration-500 z-10 shadow-2xl">
                    <Coffee size={32} />
                  </div>
                  <span className="text-teal-500 font-black text-[10px] tracking-[0.3em] mb-4 uppercase">{dict.home?.step_o} 01</span>
                  <h4 className="text-2xl font-bold text-white mb-4">{dict.home?.benefit_1_title}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm px-4">{dict.home?.benefit_1_desc}</p>
                </motion.div>

                {/* Step 2 */}
                <motion.div 
                  whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-3xl flex items-center justify-center text-indigo-400 mb-8 group-hover:border-indigo-500/50 group-hover:bg-slate-800/50 transition-all duration-500 z-10 shadow-2xl">
                    <Heart size={32} />
                  </div>
                  <span className="text-indigo-500 font-black text-[10px] tracking-[0.3em] mb-4 uppercase">{dict.home?.step_o} 02</span>
                  <h4 className="text-2xl font-bold text-white mb-4">{dict.home?.benefit_2_title}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm px-4">{dict.home?.benefit_2_desc}</p>
                </motion.div>

                {/* Step 3 */}
                <motion.div 
                  whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.4 }} viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-3xl flex items-center justify-center text-pink-400 mb-8 group-hover:border-pink-500/50 group-hover:bg-slate-800/50 transition-all duration-500 z-10 shadow-2xl">
                    <Sparkles size={32} />
                  </div>
                  <span className="text-pink-500 font-black text-[10px] tracking-[0.3em] mb-4 uppercase">{dict.home?.step_o} 03</span>
                  <h4 className="text-2xl font-bold text-white mb-4">{dict.home?.benefit_3_title}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm px-4">{dict.home?.benefit_3_desc}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ZEN QUOTE - Tampilan lebih imersif dengan animasi */}
      <section className="py-48 px-6 relative overflow-hidden bg-white">
        {/* Dekorasi Grid Halus */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-30" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Quote className="mx-auto text-teal-500/10 w-24 h-24 mb-10" />
            <h3 className="text-3xl md:text-6xl font-serif italic text-slate-800 leading-[1.2] mb-12 tracking-tight">
              "{dict.home?.quote_text}"
            </h3>
            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-px bg-slate-200" />
              <p className="text-teal-600 font-black tracking-[0.4em] uppercase text-xs md:text-sm">
                {dict.home?.quote_title}
              </p>
              <div className="w-16 h-px bg-slate-200" />
            </div>
          </motion.div>
        </div>
      </section>
      {/* SECTION 5: FOOTER MINI - Bersih & Profesional */}
      
    </main>
  );
}