"use client";
import { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, Eye, Maximize, XCircle, 
  Music, ChevronDown, Check, ChevronUp, Settings
} from "lucide-react";

const TRACKS = [
  { name: "Zen Garden", file: "/sounds/backsound.mp3" }, 
  { name: "Rainy Mood", file: "/sounds/rain.mp3" },      
  { name: "Lo-Fi Beats", file: "/sounds/lofi.mp3" }      
];

export default function PuzzleToolbar({ 
  gameState, isPaused, showPreview,
  onQuit, onTogglePreview, onTogglePause, onToggleFullScreen 
}) {
  const audioRef = useRef(null);
  const menuRef = useRef(null);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true); // Default ciut di HP

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
      if (showMusicMenu && menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMusicMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMusicMenu]);

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

  const changeTrack = (index) => {
    if (!audioRef.current) return;
    const wasPlaying = isMusicOn;
    audioRef.current.src = TRACKS[index].file;
    audioRef.current.load();
    setCurrentTrackIndex(index);
    setShowMusicMenu(false);
    if (wasPlaying) audioRef.current.play().catch(e => console.log(e));
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 flex flex-col items-center z-50 pointer-events-none">
      
      {/* 🟢 TOMBOL TOGGLE (Hanya Muncul di Mobile) */}
      <button 
        onClick={() => setIsMinimized(!isMinimized)}
        className="md:hidden pointer-events-auto mb-2 p-2 bg-slate-800 text-white rounded-full border border-white/20 shadow-lg active:scale-90 transition-transform"
      >
        {isMinimized ? <Settings size={20} className="animate-spin-slow" /> : <ChevronDown size={20} />}
      </button>

      {/* 🔵 MAIN TOOLBAR */}
      <div className={`
        flex items-center gap-1 sm:gap-2 bg-slate-900/95 backdrop-blur-xl p-1.5 sm:p-2 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto transition-all duration-300
        ${isMinimized ? 'opacity-0 translate-y-10 scale-75 pointer-events-none md:opacity-100 md:translate-y-0 md:scale-100 md:pointer-events-auto' : 'opacity-100 translate-y-0 scale-100'}
      `}>
        
        {/* Quit */}
        <button onClick={onQuit} className="p-2.5 sm:p-3 rounded-xl hover:bg-rose-500/20 text-rose-400">
          <XCircle size={22} />
        </button>

        <div className="w-px h-6 bg-white/10 mx-0.5"></div>

        {/* Preview */}
        <button 
          onClick={onTogglePreview} 
          className={`p-2.5 sm:p-3 rounded-xl transition ${showPreview ? 'bg-teal-500 text-white' : 'text-slate-300'}`}
        >
          <Eye size={22} />
        </button>

        {/* Music */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={toggleMusic}
            className={`p-2.5 sm:p-3 rounded-xl transition flex items-center gap-1 ${isMusicOn ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-300'}`}
          >
            <Music size={22} className={isMusicOn ? "animate-pulse" : ""}/>
            <div 
              onClick={(e) => { e.stopPropagation(); setShowMusicMenu(!showMusicMenu); }} 
              className="absolute -top-1 -right-1 bg-slate-700 text-white rounded-full p-0.5 border border-slate-500"
            >
              <ChevronUp size={10} />
            </div>
          </button>

          {showMusicMenu && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 bg-slate-800 rounded-xl shadow-2xl border border-white/10 overflow-hidden animate-in slide-in-from-bottom-2">
              {TRACKS.map((track, index) => (
                <button
                  key={index}
                  onClick={() => changeTrack(index)}
                  className={`w-full text-left px-4 py-3 text-xs flex items-center justify-between hover:bg-white/5 transition-colors
                    ${currentTrackIndex === index ? 'text-teal-400 font-bold bg-white/5' : 'text-slate-300'}
                  `}
                >
                  {track.name}
                  {currentTrackIndex === index && <Check size={12}/>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pause */}
        {gameState !== 'won' && (
          <button onClick={onTogglePause} className="p-2.5 sm:p-3 rounded-xl text-slate-300">
            {isPaused ? <Play fill="currentColor" size={22}/> : <Pause fill="currentColor" size={22}/>}
          </button>
        )}

        <div className="w-px h-6 bg-white/10 mx-0.5"></div>

        {/* Fullscreen */}
        <button onClick={onToggleFullScreen} className="p-2.5 sm:p-3 rounded-xl text-teal-400">
          <Maximize size={22} />
        </button>

      </div>
    </div>
  );
}