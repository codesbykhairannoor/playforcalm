"use client";
import { motion } from "framer-motion";
import { Trophy, Frown, Pause } from "lucide-react"; // Pastikan import Frown & Pause

export default function GameOverlay({ dict, status, onRestart, difficulty }) {
  if (!status) return null;

  // Variabel konten biar kodingan rapi
  let content = null;

  if (status === "paused") {
    content = (
      <>
        <div className="bg-indigo-100 p-4 rounded-full mb-4">
          <Pause className="text-indigo-600 w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{dict.sudoku.paused_title}</h3>
        <p className="text-slate-500 mb-6">{dict.sudoku.paused_desc}</p>
        {/* Tombol Resume gak perlu disini karena user bisa klik tombol resume di panel kanan */}
      </>
    );
  } else if (status === "gameover") {
    content = (
      <>
        <div className="bg-rose-100 p-4 rounded-full mb-4">
          <Frown className="text-rose-600 w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{dict.sudoku.game_over}</h3>
        <p className="text-slate-500 mb-6">{dict.sudoku.too_many_mistakes}</p>
        <button 
          onClick={() => onRestart(difficulty)} 
          className="w-full py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition shadow-lg shadow-rose-200"
        >
          {dict.sudoku.try_again}
        </button>
      </>
    );
  } else if (status === "won") {
    content = (
      <>
        <div className="bg-teal-100 p-4 rounded-full mb-4">
          <Trophy className="text-teal-600 w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{dict.sudoku.won_title}</h3>
        <p className="text-slate-500 mb-6">{dict.sudoku.won_desc}</p>
        <button 
          onClick={() => onRestart(difficulty)} 
          className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shadow-lg shadow-teal-200"
        >
          {dict.sudoku.new_game}
        </button>
      </>
    );
  }

  // RETURN MODAL FULL SCREEN
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center flex flex-col items-center border border-white/20"
      >
        {content}
      </motion.div>
    </div>
  );
}