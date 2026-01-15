"use client";
import { useEffect, useState, useRef } from "react";
import { useJigsaw } from "@/hooks/useJigsaw";
import { useLanguage } from "@/context/LanguageContext";
import Confetti from "react-confetti";
import { ArrowLeft, Play, Pause, Eye, Maximize, XCircle, X } from "lucide-react"; // Tambah icon X

// Import Components
import JigsawBoard from "@/components/puzzle/JigsawBoard";
import JigsawControls from "@/components/puzzle/JigsawControls";
import JigsawOverlay from "@/components/puzzle/JigsawOverlay";

export default function PuzzlePage() {
  const { dict } = useLanguage();
  const { 
    gameState, setGameState,
    pieceCount, setPieceCount,
    image, loadImage, aspectRatio,
    pieces, gridDimensions,
    progress, timer,
    startGame, handlePieceDrop, togglePause, isPaused
  } = useJigsaw();

  const [showPreview, setShowPreview] = useState(false);
  const gameContainerRef = useRef(null);

  useEffect(() => { setGameState('menu'); }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 flex flex-col items-center bg-[#f8fafc]">
      {gameState === 'won' && <Confetti recycle={false} numberOfPieces={500} />}

      {/* HEADER MENU */}
      {gameState === 'menu' && (
        <div className="text-center mb-8 animate-in fade-in zoom-in duration-500">
           <h1 className="text-4xl font-extrabold text-slate-800 mb-2 mt-10">{dict.puzzle.title}</h1>
           <p className="text-slate-500">{dict.puzzle.desc}</p>
        </div>
      )}

      {/* === 1. AREA MENU === */}
      {gameState === 'menu' ? (
         <JigsawControls 
            dict={dict}
            pieceCount={pieceCount}
            setPieceCount={setPieceCount}
            image={image}
            loadImage={loadImage}
            startGame={startGame}
         />
      ) : (
        /* === 2. AREA MAIN GAME === */
        <div 
          ref={gameContainerRef}
          className="relative w-full max-w-6xl h-[85vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-300 border-4 border-slate-800"
        >
            {/* Header Game Floating */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 pointer-events-none">
               {/* Progress Bar (Kiri) */}
               <div className="pointer-events-auto flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white font-bold text-sm shadow-lg">
                  {/* Tampilkan Real Pieces Length biar user gak bingung kok beda sama yg dipilih */}
                  <span>{progress} / {pieces.length} {dict.puzzle.pieces}</span>
                  <div className="w-px h-4 bg-white/20"></div>
                  <span className="font-mono text-teal-300">{timer}</span>
               </div>
            </div>

            {/* BOARD AREA */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-10 overflow-hidden relative">
                <JigsawBoard 
                  pieces={pieces}
                  gridDimensions={gridDimensions}
                  image={image}
                  aspectRatio={aspectRatio}
                  handlePieceDrop={handlePieceDrop}
                  gameState={gameState}
                  isPaused={isPaused}
                />

                {/* === MODAL PREVIEW GAMBAR (FIXED) === */}
                {showPreview && !isPaused && gameState !== 'won' && (
                  // Klik backdrop untuk tutup
                  <div 
                    onClick={() => setShowPreview(false)}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8 animate-in fade-in duration-200 cursor-pointer"
                  >
                    {/* Container Gambar */}
                    <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                       <img src={image} className="max-w-full max-h-full rounded-xl shadow-2xl border-2 border-white/50" alt="Preview"/>
                       
                       {/* TOMBOL CLOSE (X) */}
                       <button 
                         onClick={() => setShowPreview(false)}
                         className="absolute -top-4 -right-4 bg-rose-500 text-white p-2 rounded-full shadow-lg hover:bg-rose-600 transition hover:scale-110 border-2 border-white"
                       >
                         <X size={24} strokeWidth={3} />
                       </button>
                    </div>
                  </div>
                )}
            </div>

            {/* FLOATING TOOLBAR */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30">
               <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl">
                  
                  {/* Quit */}
                  <button onClick={() => setGameState('menu')} className="p-3 rounded-xl hover:bg-rose-500/20 text-rose-400 hover:text-rose-200 transition">
                     <XCircle size={24} />
                  </button>

                  <div className="w-px h-8 bg-white/10 mx-1"></div>

                  {/* Preview (Mata) - Sekarang Toggle Klik */}
                  <button 
                    onClick={() => setShowPreview(!showPreview)}
                    className={`p-3 rounded-xl transition ${showPreview ? 'bg-teal-500 text-white' : 'hover:bg-white/10 text-slate-300 hover:text-white'}`}
                    title="Toggle Preview"
                  >
                     <Eye size={24} />
                  </button>

                  {/* Pause */}
                  {gameState !== 'won' && (
                    <button onClick={togglePause} className="p-3 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition">
                       {isPaused ? <Play fill="currentColor" size={24}/> : <Pause fill="currentColor" size={24}/>}
                    </button>
                  )}

                  <div className="w-px h-8 bg-white/10 mx-1"></div>

                  {/* Fullscreen */}
                  <button onClick={toggleFullScreen} className="p-3 rounded-xl hover:bg-teal-500/20 text-teal-400 hover:text-teal-200 transition">
                     <Maximize size={24} />
                  </button>

               </div>
            </div>

            {/* OVERLAY MODAL */}
            <JigsawOverlay 
              dict={dict}
              gameState={gameState}
              timer={timer}
              onBackToMenu={() => setGameState('menu')}
            />
        </div>
      )}
    </div>
  );
}