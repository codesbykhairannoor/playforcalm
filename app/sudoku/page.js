"use client";
import { useEffect } from "react";
import Confetti from "react-confetti";
import SudokuBoard from "@/components/sudoku/SudokuBoard";
import GameHeader from "@/components/sudoku/GameHeader";
import GameControls from "@/components/sudoku/GameControls";
import GameOverlay from "@/components/sudoku/GameOverlay";
import { useSudoku } from "@/hooks/useSudoku";
import { useLanguage } from "@/context/LanguageContext";

export default function SudokuPage() {
  const { dict } = useLanguage();
  const { 
    grid, initialGrid, solution, newGame, difficulty, timer, isPlaying, isWon, isGameOver,
    mistakes, selectedCell, setSelectedCell, handleInput, setIsPlaying, completedNumbers 
  } = useSudoku();

  useEffect(() => { newGame('easy'); }, [newGame]);

  const getOverlayStatus = () => {
    if (isWon) return "won";
    if (isGameOver) return "gameover";
    return null; 
  };

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 flex flex-col items-center justify-center bg-[#f8fafc]">
      {isWon && <Confetti recycle={false} numberOfPieces={500} />}

      <div className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-10 w-full max-w-6xl">
        
        {/* === KIRI: BOARD AREA === */}
        <div className="flex-1 w-full flex flex-col items-center">
           
           {/* Mobile Header */}
           <div className="lg:hidden w-full mb-4">
              <GameHeader dict={dict} timer={timer} mistakes={mistakes} difficulty={difficulty} />
           </div>

           <div className={`relative w-full flex justify-center ${!isPlaying ? 'blur-sm' : ''}`}>
             <SudokuBoard 
               grid={grid} 
               initialGrid={initialGrid} 
               solution={solution} 
               selectedCell={selectedCell} 
               setSelectedCell={setSelectedCell}
             />
             
             {/* Overlay Pause */}
             {!isPlaying && !isWon && !isGameOver && (
                <GameOverlay dict={dict} status="paused" />
             )}
           </div>

           {/* 👇 INI KUNCINYA: GameControls muncul di bawah board saat MOBILE */}
           <div className="lg:hidden w-full mt-6">
              <GameControls 
                dict={dict}
                handleInput={handleInput}
                newGame={newGame}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                difficulty={difficulty}
                completedNumbers={completedNumbers}
              />
           </div>
        </div>

        {/* === KANAN: STATS & CONTROLS (Desktop Only) === */}
        <div className="hidden lg:flex w-full lg:w-[360px] flex-col gap-6">
          <div className="hidden lg:block">
            <GameHeader dict={dict} timer={timer} mistakes={mistakes} difficulty={difficulty} />
          </div>

          <GameControls 
            dict={dict}
            handleInput={handleInput}
            newGame={newGame}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            difficulty={difficulty}
            completedNumbers={completedNumbers}
          />

          <GameOverlay 
            dict={dict} 
            status={getOverlayStatus()} 
            onRestart={newGame}
            difficulty={difficulty}
          />
        </div>

        {/* Overlay Menang/Kalah (Global) */}
        {(isWon || isGameOver) && (
          <GameOverlay 
            dict={dict} 
            status={getOverlayStatus()} 
            onRestart={newGame}
            difficulty={difficulty}
          />
        )}
      </div>
    </div>
  );
}