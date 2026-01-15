"use client";
import { useEffect, useState, useRef } from "react";
import { useJigsaw } from "@/hooks/useJigsaw";
import { useLanguage } from "@/context/LanguageContext";
import Confetti from "react-confetti";
import { X, AlertTriangle } from "lucide-react"; 

// Import Components
import JigsawBoard from "@/components/puzzle/JigsawBoard";
import JigsawControls from "@/components/puzzle/JigsawControls";
import JigsawOverlay from "@/components/puzzle/JigsawOverlay";
import PuzzleToolbar from "@/components/puzzle/PuzzleToolbar"; 

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
  const [showQuitConfirm, setShowQuitConfirm] = useState(false); 
  const gameContainerRef = useRef(null);

  useEffect(() => { setGameState('menu'); }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleQuitRequest = () => {
    if (!isPaused) togglePause();
    setShowQuitConfirm(true);
  };

  const confirmQuit = () => {
    setGameState('menu');
    setShowQuitConfirm(false);
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

      {/* === 1. TAMPILAN MENU === */}
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
        /* === 2. TAMPILAN MAIN GAME === */
        <div 
          ref={gameContainerRef}
          className="relative w-full max-w-6xl h-[85vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-300 border-4 border-slate-800"
        >
            {/* Header Floating */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 pointer-events-none">
               <div className="pointer-events-auto flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white font-bold text-sm shadow-lg">
                  <span>{progress} / {pieces.length} {dict.puzzle.pieces}</span>
                  <div className="w-px h-4 bg-white/20"></div>
                  <span className={`font-mono ${isPaused ? 'text-yellow-400' : 'text-teal-300'}`}>
                    {timer} {isPaused && "(PAUSED)"}
                  </span>
               </div>
            </div>

            {/* BOARD AREA */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-10 overflow-hidden relative">
                
                {/* 👇 BAGIAN INI YANG DIPERBAIKI (Wrapper Div) 
                   Ditambahin class: "w-full flex justify-center items-center"
                   Biar JigsawBoard gak kegencet jadi 0 pixel.
                */}
                <div className={`w-full flex justify-center items-center transition-all duration-300 ${isPaused ? "blur-md scale-95 opacity-50 pointer-events-none" : ""}`}>
                  <JigsawBoard 
                    pieces={pieces}
                    gridDimensions={gridDimensions}
                    image={image}
                    aspectRatio={aspectRatio}
                    handlePieceDrop={handlePieceDrop}
                    gameState={gameState}
                  />
                </div>

                {/* PAUSED Text */}
                {isPaused && !showQuitConfirm && gameState !== 'won' && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center z-10 animate-in fade-in zoom-in pointer-events-none">
                      <h2 className="text-6xl font-black text-white tracking-widest drop-shadow-2xl">PAUSED</h2>
                      <p className="text-white/80 mt-2 font-bold">Click play to resume</p>
                   </div>
                )}

                {/* Confirm Quit Modal */}
                {showQuitConfirm && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border-2 border-rose-100">
                       <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <AlertTriangle size={32} />
                       </div>
                       <h3 className="text-xl font-bold text-slate-800 mb-2">Quit Game?</h3>
                       <p className="text-slate-500 mb-6 text-sm">Progress kamu akan hilang.</p>
                       <div className="flex gap-3">
                          <button onClick={() => setShowQuitConfirm(false)} className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200">
                             Batal
                          </button>
                          <button onClick={confirmQuit} className="flex-1 py-3 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-600 shadow-lg shadow-rose-200">
                             Keluar
                          </button>
                       </div>
                    </div>
                  </div>
                )}

                {/* Preview Modal */}
                {showPreview && !isPaused && gameState !== 'won' && (
                  <div 
                    onClick={() => setShowPreview(false)}
                    className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8 cursor-pointer animate-in fade-in"
                  >
                    <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                       <img src={image} className="max-w-full max-h-full rounded-xl shadow-2xl border-2 border-white/50" alt="Preview"/>
                       <button onClick={() => setShowPreview(false)} className="absolute -top-4 -right-4 bg-rose-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
                         <X size={24} strokeWidth={3} />
                       </button>
                    </div>
                  </div>
                )}
            </div>

            {/* TOOLBAR BARU */}
            <PuzzleToolbar 
              gameState={gameState}
              isPaused={isPaused}
              showPreview={showPreview}
              onQuit={handleQuitRequest}      
              onTogglePreview={() => setShowPreview(!showPreview)}
              onTogglePause={togglePause}     
              onToggleFullScreen={toggleFullScreen}
            />

            {/* OVERLAY */}
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