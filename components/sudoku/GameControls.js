"use client";
import { RotateCcw, Play, Pause, Music, ChevronDown, Check, Eraser } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// 🎵 DAFTAR LAGU
const TRACKS = [
  { name: "Zen Garden", file: "/sounds/backsound.mp3" }, 
  { name: "Rainy Mood", file: "/sounds/rain.mp3" },      
  { name: "Lo-Fi Beats", file: "/sounds/lofi.mp3" }      
];

export default function GameControls({ 
  dict, handleInput, newGame, isPlaying, setIsPlaying, difficulty, completedNumbers = [] 
}) {
  const audioRef = useRef(null);
  const menuRef = useRef(null);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(TRACKS[0].file);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const changeTrack = (index) => {
    if (!audioRef.current) return;
    const wasPlaying = isMusicOn;
    audioRef.current.src = TRACKS[index].file;
    audioRef.current.load();
    setCurrentTrackIndex(index);
    setShowMenu(false);
    if (wasPlaying) audioRef.current.play().catch(e => console.log(e));
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicOn) {
      audioRef.current.pause();
      setIsMusicOn(false);
    } else {
      audioRef.current.play().catch(e => console.log(e));
      setIsMusicOn(true);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full">
      
      {/* 1. DIFFICULTY TABS */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        {['easy', 'medium', 'hard'].map((level) => (
          <button
            key={level}
            onClick={() => newGame(level)}
            className={`flex-1 py-2 text-[10px] sm:text-sm font-bold rounded-lg transition-all 
              ${difficulty === level ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {dict.sudoku[level]}
          </button>
        ))}
      </div>

      {/* 2. NUMPAD (BALIK KE TEAL & SHADOW ASLI) */}
      <div className="flex flex-row lg:grid lg:grid-cols-3 gap-1.5 sm:gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
          const isDone = completedNumbers.includes(num);
          return (
            <button
              key={num}
              onClick={() => !isDone && handleInput(num)}
              disabled={isDone}
              className={`
                flex-1 lg:flex-none h-12 sm:h-14 min-w-[38px] lg:min-w-0 rounded-xl border text-xl sm:text-2xl font-bold transition-all
                ${isDone 
                  ? "opacity-0 pointer-events-none" 
                  : "bg-white border-slate-200 text-teal-600 shadow-[0_4px_0_0_rgba(203,213,225,1)] active:shadow-none active:translate-y-1 hover:bg-teal-50"
                }
              `}
            >
              {num}
            </button>
          );
        })}
        
        {/* Tombol Hapus (Hanya muncul di Mobile Row) */}
        <button
          onClick={() => handleInput(null)}
          className="flex-1 lg:hidden h-12 min-w-[38px] rounded-xl border border-rose-100 bg-rose-50 text-rose-500 flex items-center justify-center active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(255,228,230,1)] transition-all"
        >
          <Eraser size={20} />
        </button>
      </div>

      {/* 3. CONTROLS */}
      <div className="grid grid-cols-4 gap-2 relative">
         <button onClick={() => newGame(difficulty)} className="col-span-2 py-3 rounded-xl bg-slate-200 text-slate-600 font-bold hover:bg-slate-300 transition flex items-center justify-center gap-2 text-xs sm:text-sm">
            <RotateCcw size={18}/> {dict.sudoku.new_game}
         </button>
         
         <button onClick={() => setIsPlaying(!isPlaying)} className="col-span-1 py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition flex items-center justify-center shadow-lg shadow-teal-200">
            {isPlaying ? <Pause size={18}/> : <Play size={18}/>}
         </button>

         {/* 🎵 MUSIK */}
         <div className="col-span-1 relative" ref={menuRef}>
            <button 
              onClick={toggleMusic} 
              onContextMenu={(e) => { e.preventDefault(); setShowMenu(!showMenu); }}
              className={`w-full h-full rounded-xl font-bold transition flex items-center justify-center gap-1 ${isMusicOn ? 'bg-indigo-100 text-indigo-600 border border-indigo-200' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}
            >
              <Music size={18} className={isMusicOn ? "animate-pulse" : ""}/>
            </button>
            
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="absolute -top-1 -right-1 bg-slate-800 text-white rounded-full p-1 shadow-md hover:bg-slate-700"
            >
               <ChevronDown size={10}/>
            </button>

            {showMenu && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95">
                 <div className="p-2 text-[10px] font-bold text-slate-400 bg-slate-50 uppercase tracking-wider text-center">Select Ambience</div>
                 {TRACKS.map((track, index) => (
                   <button
                     key={index}
                     onClick={() => changeTrack(index)}
                     className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-indigo-50 transition-colors
                       ${currentTrackIndex === index ? 'text-indigo-600 font-bold' : 'text-slate-600'}
                     `}
                   >
                     {track.name}
                     {currentTrackIndex === index && <Check size={14}/>}
                   </button>
                 ))}
              </div>
            )}
         </div>
      </div>
    </div>
  );
}