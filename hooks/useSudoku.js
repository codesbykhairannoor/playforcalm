"use client";
import { useState, useEffect, useCallback } from "react";
import { getSudoku } from "sudoku-gen";
import useSound from "use-sound"; 

// HANYA SUARA ENDING (Pake file lokal)
const LOSE_SOUND = "/sounds/lose.mp3";   // Pas Game Over
const WIN_SOUND = "/sounds/win.mp3";     // Pas Menang

export function useSudoku() {
  const [initialGrid, setInitialGrid] = useState(Array(81).fill(""));
  const [grid, setGrid] = useState(Array(81).fill(""));
  const [solution, setSolution] = useState(Array(81).fill(""));
  
  const [selectedCell, setSelectedCell] = useState(null); 
  const [mistakes, setMistakes] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [timer, setTimer] = useState(0);

  // Setup Sounds (Cuma Win & Lose)
  const [playLose] = useSound(LOSE_SOUND, { volume: 0.5 });
  const [playWin] = useSound(WIN_SOUND, { volume: 0.6 });

  // CATATAN: Logic Backsound dihapus dari sini, dipindah ke GameControls

  const newGame = useCallback((level = "easy") => {
    const sudoku = getSudoku(level);
    const puzzleArray = sudoku.puzzle.split("").map(char => char === "-" ? "" : char);
    setInitialGrid(puzzleArray);
    setGrid(puzzleArray);
    setSolution(sudoku.solution.split(""));
    setDifficulty(level);
    setIsPlaying(true);
    setIsWon(false);
    setIsGameOver(false);
    setTimer(0);
    setMistakes(0);
    setSelectedCell(null);
  }, []);

  const completedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => {
    const numStr = num.toString();
    const count = grid.filter((cell, idx) => cell === numStr && solution[idx] === numStr).length;
    return count === 9;
  });
  
  const handleInput = useCallback((value) => {
    if (!isPlaying || isWon || isGameOver || selectedCell === null) return;
    if (initialGrid[selectedCell] !== "") return; 

    const valStr = value.toString();
    const correctVal = solution[selectedCell];

    const newGrid = [...grid];
    newGrid[selectedCell] = valStr;
    setGrid(newGrid);

    // LOGIC BARU: Hening saat main, bunyi pas ending doang
    if (valStr !== correctVal) {
      // SALAH
      setMistakes(prev => {
        const newMistakes = prev + 1;
        // Cek apakah ini kesalahan ke-3 (GAME OVER)?
        if (newMistakes >= 3) {
          setIsGameOver(true);
          setIsPlaying(false);
          playLose(); // 🔊 BARU BUNYI DISINI (Pas Kalah Total)
        }
        return newMistakes;
      });
      // playError(); <-- DIHAPUS (Biar hening pas salah biasa)
    } else {
      // BENAR
      // playPop(); <-- DIHAPUS (Biar hening pas isi angka)

      // Cek Menang Total
      if (newGrid.join("") === solution.join("")) {
        setIsWon(true);
        setIsPlaying(false);
        playWin(); // 🔊 BARU BUNYI DISINI (Pas Menang Total)
      }
    }
  }, [grid, initialGrid, isPlaying, isWon, isGameOver, selectedCell, solution, playLose, playWin]);

  // Logic Keyboard (Tetap sama)
  useEffect(() => {
    const handleKeyDown = (e) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
         e.preventDefault(); 
      }
      if (!isPlaying) return;

      if (e.key >= "1" && e.key <= "9") {
        handleInput(e.key);
      } else if (e.key === "Backspace" || e.key === "Delete") {
        if (selectedCell !== null && initialGrid[selectedCell] === "") {
            const newGrid = [...grid];
            newGrid[selectedCell] = "";
            setGrid(newGrid);
        }
      } else if (selectedCell === null && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
         setSelectedCell(40); 
      } else if (selectedCell !== null) {
        let next = selectedCell;
        if (e.key === "ArrowUp") next -= 9;
        if (e.key === "ArrowDown") next += 9;
        if (e.key === "ArrowLeft") next -= 1;
        if (e.key === "ArrowRight") next += 1;
        if (next >= 0 && next <= 80) setSelectedCell(next);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, isPlaying, handleInput, grid, initialGrid]);

  // Timer (Tetap sama)
  useEffect(() => {
    let interval;
    if (isPlaying && !isWon && !isGameOver) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isWon, isGameOver]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    grid, initialGrid, solution, 
    isPlaying, isWon, isGameOver,
    mistakes, timer: formatTime(timer), difficulty,
    selectedCell, setSelectedCell, handleInput, newGame, setIsPlaying,
    completedNumbers 
  };
}