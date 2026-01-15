"use client";
import { RotateCcw, Play, Pause, Music } from "lucide-react";
import useSound from "use-sound";
import { useState, useEffect } from "react";

export default function GameControls({ dict, handleInput, newGame, isPlaying, setIsPlaying, difficulty, completedNumbers = [] }) {
  
  // Musik Lo-Fi Calm
  const [playMusic, { stop: stopMusic }] = useSound(
    "https://assets.mixkit.co/music/preview/mixkit-sleepy-cat-135.mp3", 
    { volume: 0.3, loop: true }
  );
  const [isMusicOn, setIsMusicOn] = useState(false);

  const toggleMusic = () => {
    if (isMusicOn) {
      stopMusic();
      setIsMusicOn(false);
    } else {
      playMusic();
      setIsMusicOn(true);
    }
  };

  useEffect(() => {
    return () => stopMusic();
  }, [stopMusic]);

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* 1. DIFFICULTY TABS */}
      <div className="flex bg-slate-100 p-1 rounded-lg">
        {['easy', 'medium', 'hard'].map((level) => (
          <button
            key={level}
            onClick={() => newGame(level)}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-md transition-all 
              ${difficulty === level ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {dict.sudoku[level]}
          </button>
        ))}
      </div>

      {/* 2. NUMPAD */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
          // Cek apakah angka ini sudah selesai?
          const isDone = completedNumbers.includes(num);

          return (
            <button
              key={num}
              onClick={() => !isDone && handleInput(num)} // Cegah klik kalau done
              disabled={isDone} // Matikan tombol
              className={`
                h-12 sm:h-14 rounded-xl border text-xl sm:text-2xl font-bold transition-all
                ${isDone 
                  ? "opacity-0 pointer-events-none" // LOGIC HILANG: Transparan & Gak bisa disentuh
                  : "bg-white border-slate-200 text-teal-600 shadow-[0_4px_0_0_rgba(203,213,225,1)] active:shadow-none active:translate-y-1 hover:bg-teal-50"
                }
              `}
            >
              {num}
            </button>
          );
        })}
      </div>

      {/* 3. CONTROLS (Pause, New Game, Music) */}
      <div className="grid grid-cols-4 gap-2">
         {/* Tombol New Game */}
         <button onClick={() => newGame(difficulty)} className="col-span-2 py-3 rounded-xl bg-slate-200 text-slate-600 font-bold hover:bg-slate-300 transition flex items-center justify-center gap-2 text-sm">
            <RotateCcw size={18}/> {dict.sudoku.new_game}
         </button>
         
         {/* Tombol Pause */}
         <button onClick={() => setIsPlaying(!isPlaying)} className="col-span-1 py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition flex items-center justify-center shadow-lg shadow-teal-200">
            {isPlaying ? <Pause size={18}/> : <Play size={18}/>}
         </button>

         {/* Tombol Musik */}
         <button onClick={toggleMusic} className={`col-span-1 py-3 rounded-xl font-bold transition flex items-center justify-center ${isMusicOn ? 'bg-indigo-100 text-indigo-600 border border-indigo-200' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}>
            <Music size={18} className={isMusicOn ? "animate-pulse" : ""}/>
         </button>
      </div>
    </div>
  );
}