"use client";
import { useEffect, useState } from "react";
import SudokuBoard from "@/components/sudoku/SudokuBoard";
import { useSudoku } from "@/hooks/useSudoku";
import { useLanguage } from "@/context/LanguageContext"; // Kamus
import { Timer, Trophy, RotateCcw, Play, Pause } from "lucide-react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

export default function SudokuPage() {
  const { dict } = useLanguage(); // Ambil bahasa
  const { 
    grid, initialGrid, updateCell, newGame, 
    difficulty, timer, isPlaying, isWon, setIsPlaying 
  } = useSudoku();
  
  const [showConfetti, setShowConfetti] = useState(false);

  // Start game pas halaman dibuka
  useEffect(() => {
    newGame('easy');
  }, [newGame]);

  // Efek Confetti pas menang
  useEffect(() => {
    if (isWon) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000); // Stop confetti after 8s
    }
  }, [isWon]);

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 flex flex-col items-center">
      {showConfetti && <Confetti recycle={true} numberOfPieces={200} />}

      {/* 1. Header Game (Timer & Difficulty) */}
      <div className="w-full max-w-lg flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{dict.nav.sudoku}</h1>
          <span className="text-sm font-medium px-3 py-1 bg-teal-100 text-teal-700 rounded-full capitalize">
            {difficulty} Mode
          </span>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 text-2xl font-mono font-bold text-slate-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
            <Timer className="w-5 h-5 text-teal-500" />
            {timer}
          </div>
        </div>
      </div>

      {/* 2. Papan Permainan (Main Board) */}
      {/* Kalau dipause, papan di-blur biar gak ngintip */}
      <div className={`relative transition-all duration-300 ${!isPlaying && !isWon ? 'blur-md grayscale' : ''}`}>
        <SudokuBoard 
          grid={grid} 
          initialGrid={initialGrid} 
          updateCell={updateCell}
          isWon={isWon}
        />
        
        {/* Overlay kalau Pause */}
        {!isPlaying && !isWon && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-slate-900/80 text-white px-6 py-3 rounded-full font-bold animate-pulse">
              {dict.sudoku.paused_title || "Paused"}
            </div>
          </div>
        )}
      </div>

      {/* 3. Controls (Tombol Bawah) */}
      <div className="mt-8 flex gap-4">
        {/* Tombol Pause/Resume */}
        {!isWon && (
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            {isPlaying ? <Pause size={20}/> : <Play size={20}/>}
            {isPlaying ? "Pause" : dict.sudoku.resume_btn || "Resume"}
          </button>
        )}

        {/* Tombol New Game */}
        <button 
          onClick={() => newGame(difficulty)}
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-700 transition-transform hover:scale-105 shadow-lg shadow-teal-200"
        >
          {isWon ? <Trophy size={20}/> : <RotateCcw size={20}/>}
          {isWon ? dict.sudoku.play_again : dict.sudoku.new_game}
        </button>
      </div>

      {/* 4. Win Message (Muncul pas menang) */}
      {isWon && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-8 text-center bg-white p-6 rounded-2xl shadow-xl border border-teal-100 max-w-sm"
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-2">{dict.sudoku.won_title}</h2>
          <p className="text-slate-500">{dict.sudoku.won_desc}</p>
        </motion.div>
      )}

    </div>
  );
}