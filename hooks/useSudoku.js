"use client";
import { useState, useEffect, useCallback } from "react";
import { getSudoku } from "sudoku-gen";
import useSound from "use-sound"; 

const POP_SOUND = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";
const ERROR_SOUND = "https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3";
const WIN_SOUND = "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3";
// Sound "Ting" kalau angka lengkap (Chime)
const NUMBER_COMPLETE_SOUND = "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3"; 

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

  // Setup Sounds
  const [playPop] = useSound(POP_SOUND, { volume: 0.5, interrupt: true });
  const [playError] = useSound(ERROR_SOUND, { volume: 0.5 });
  const [playWin] = useSound(WIN_SOUND, { volume: 0.5 });
  const [playComplete] = useSound(NUMBER_COMPLETE_SOUND, { volume: 0.6 });

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

  // Hitung angka mana saja (1-9) yang sudah lengkap & benar
  const completedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => {
    const numStr = num.toString();
    // Cek berapa banyak angka ini ada di grid DAN posisinya benar sesuai solusi
    const count = grid.filter((cell, idx) => cell === numStr && solution[idx] === numStr).length;
    return count === 9;
  });
  
  const handleInput = useCallback((value) => {
    if (!isPlaying || isWon || isGameOver || selectedCell === null) return;
    if (initialGrid[selectedCell] !== "") return; 

    const valStr = value.toString();
    const correctVal = solution[selectedCell];

    // 1. Masukkan angka ke Grid (Mau benar atau salah, tetap masuk buat visual)
    const newGrid = [...grid];
    newGrid[selectedCell] = valStr;
    setGrid(newGrid);

    // 2. Cek Kebenaran Logic Game
    if (valStr !== correctVal) {
      // SALAH
      setMistakes(prev => {
        const newMistakes = prev + 1;
        if (newMistakes >= 3) {
          setIsGameOver(true);
          setIsPlaying(false);
        }
        return newMistakes;
      });
      playError();
    } else {
      // BENAR
      playPop();

      // Cek apakah angka yang baru dimasukkan ini jadi LENGKAP (9 biji)?
      const countCorrect = newGrid.filter((cell, idx) => cell === valStr && solution[idx] === valStr).length;
      if (countCorrect === 9) {
        playComplete(); // Bunyi Ting!
      }
      
      // Cek Menang Total
      if (newGrid.join("") === solution.join("")) {
        setIsWon(true);
        setIsPlaying(false);
        playWin();
      }
    }
  }, [grid, initialGrid, isPlaying, isWon, isGameOver, selectedCell, solution, playPop, playError, playWin, playComplete]);

  // Logic Keyboard
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

  // Timer
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
    completedNumbers // Export data angka yg udah selesai ke UI
  };
}