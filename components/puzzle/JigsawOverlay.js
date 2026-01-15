"use client";
import { motion } from "framer-motion";
import { Trophy, Clock, CheckCircle2 } from "lucide-react";

export default function JigsawOverlay({ dict, gameState, timer, onBackToMenu, onRestart }) {
  if (gameState !== 'won') return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center flex flex-col items-center border border-white/20"
      >
        <div className="bg-teal-100 p-4 rounded-full mb-4">
          <Trophy className="text-teal-600 w-12 h-12" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{dict.puzzle.won_title}</h2>
        <p className="text-slate-500 mb-6 text-sm">{dict.puzzle.won_desc}</p>

        {/* Stats */}
        <div className="bg-slate-50 rounded-xl p-4 w-full mb-6 flex items-center justify-center gap-3 border border-slate-100">
           <Clock size={18} className="text-slate-400" />
           <span className="text-slate-600 font-bold">{dict.puzzle.time_taken}:</span>
           <span className="text-teal-600 font-mono font-bold text-lg">{timer}</span>
        </div>

        <button 
          onClick={onBackToMenu}
          className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shadow-lg shadow-teal-200 mb-3"
        >
          {dict.puzzle.back_to_menu}
        </button>

      </motion.div>
    </div>
  );
}