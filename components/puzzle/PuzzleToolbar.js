"use client";
import { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, Eye, Maximize, XCircle, 
  Music, ChevronDown, Check 
} from "lucide-react";

// 🎵 LIST LAGU (Pastikan file ada di public/sounds/)
const TRACKS = [
  { name: "Zen Garden", file: "/sounds/backsound.mp3" }, 
  { name: "Rainy Mood", file: "/sounds/rain.mp3" },      
  { name: "Lo-Fi Beats", file: "/sounds/lofi.mp3" }      
];

export default function PuzzleToolbar({ 
  gameState, isPaused, showPreview,
  onQuit, onTogglePreview, onTogglePause, onToggleFullScreen 
}) {
  // === LOGIC AUDIO PLAYER (Terisolasi di sini) ===
  const audioRef = useRef(null);
  const menuRef = useRef(null);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showMusicMenu, setShowMusicMenu] = useState(false);

  // Setup Audio
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

  // Click Outside Listener (Buat nutup menu musik)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMusicMenu && menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMusicMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMusicMenu]);

  // Controls
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
    <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30 pointer-events-auto">
      <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl">
        
        {/* 1. Quit Button */}
        <button onClick={onQuit} className="p-3 rounded-xl hover:bg-rose-500/20 text-rose-400 hover:text-rose-200 transition" title="Quit Game">
          <XCircle size={24} />
        </button>

        <div className="w-px h-8 bg-white/10 mx-1"></div>

        {/* 2. Preview (Mata) */}
        <button 
          onClick={onTogglePreview} 
          className={`p-3 rounded-xl transition ${showPreview ? 'bg-teal-500 text-white' : 'hover:bg-white/10 text-slate-300 hover:text-white'}`} 
          title="Preview Image"
        >
          <Eye size={24} />
        </button>

        {/* 3. MUSIK PLAYER (Dropdown) */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={toggleMusic}
            onContextMenu={(e) => { e.preventDefault(); setShowMusicMenu(!showMusicMenu); }}
            className={`p-3 rounded-xl transition flex items-center gap-1 group relative
              ${isMusicOn ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'hover:bg-white/10 text-slate-300 hover:text-white'}
            `}
            title="Toggle Music"
          >
            <Music size={24} className={isMusicOn ? "animate-pulse" : ""}/>
            {/* Indikator Panah Kecil */}
            <div 
              onClick={(e) => { e.stopPropagation(); setShowMusicMenu(!showMusicMenu); }} 
              className="absolute -top-1 -right-1 bg-slate-700 text-slate-300 rounded-full p-0.5 hover:bg-slate-600 cursor-pointer border border-slate-500"
            >
              <ChevronDown size={10} />
            </div>
          </button>

          {/* Menu Dropdown */}
          {showMusicMenu && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-slate-800 rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-in slide-in-from-bottom-2">
              <div className="p-2 text-[10px] font-bold text-slate-400 bg-slate-900/50 uppercase tracking-wider text-center">Select Vibe</div>
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

        {/* 4. Pause Button */}
        {gameState !== 'won' && (
          <button onClick={onTogglePause} className="p-3 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition" title="Pause Game">
            {isPaused ? <Play fill="currentColor" size={24}/> : <Pause fill="currentColor" size={24}/>}
          </button>
        )}

        <div className="w-px h-8 bg-white/10 mx-1"></div>

        {/* 5. Fullscreen */}
        <button onClick={onToggleFullScreen} className="p-3 rounded-xl hover:bg-teal-500/20 text-teal-400 hover:text-teal-200 transition" title="Fullscreen">
          <Maximize size={24} />
        </button>

      </div>
    </div>
  );
}