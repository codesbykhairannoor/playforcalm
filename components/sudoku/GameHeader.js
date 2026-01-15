"use client";
import { Timer, Heart } from "lucide-react";

export default function GameHeader({ dict, timer, mistakes, difficulty }) {
  return (
    <>
      {/* Tampilan Mobile (Ringkas) */}
      <div className="lg:hidden w-full flex justify-between mb-4 px-2">
         <div className="flex items-center gap-2 text-slate-600 font-mono font-bold">
            <Timer size={18} /> {timer}
         </div>
         <div className="flex items-center gap-1 text-rose-500 font-bold">
            <Heart size={18} fill="currentColor"/> {3 - mistakes}/3
         </div>
      </div>

      {/* Tampilan Desktop (Lengkap) */}
      <div className="hidden lg:flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 w-full mb-6">
        <div className="text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{dict.sudoku.difficulty_label}</p>
          <p className="font-bold text-teal-600 capitalize">{dict.sudoku[difficulty] || difficulty}</p>
        </div>
        <div className="text-center">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{dict.sudoku.mistakes_label}</p>
           <p className={`font-bold ${mistakes > 0 ? 'text-rose-500' : 'text-slate-600'}`}>{mistakes}/3</p>
        </div>
        <div className="text-center">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{dict.sudoku.time_label}</p>
           <p className="font-mono font-bold text-slate-600">{timer}</p>
        </div>
      </div>
    </>
  );
}