"use client";
import { useState, useEffect, useCallback } from "react";
import { getSudoku } from "sudoku-gen";
import useSound from "use-sound"; 

// Link sound effect (Bisa diganti file lokal nanti)
const POP_SOUND = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";
const WIN_SOUND = "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3";

export function useSudoku() {
  const [initialGrid, setInitialGrid] = useState(Array(81).fill("")); // Soal asli
  const [grid, setGrid] = useState(Array(81).fill("")); // Grid pemain
  const [solution, setSolution] = useState(Array(81).fill("")); // Kunci jawaban
  const [difficulty, setDifficulty] = useState("easy");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const [playPop] = useSound(POP_SOUND, { volume: 0.5 });
  const [playWin] = useSound(WIN_SOUND, { volume: 0.5 });

  // 1. Mulai Game Baru
  const newGame = useCallback((level = "easy") => {
    const sudoku = getSudoku(level);
    
    // Convert string soal "1-5--..." jadi array
    const puzzleArray = sudoku.puzzle.split("").map(char => char === "-" ? "" : char);
    const solutionArray = sudoku.solution.split("");

    setInitialGrid(puzzleArray);
    setGrid(puzzleArray);
    setSolution(solutionArray);
    setDifficulty(level);
    setIsPlaying(true);
    setIsWon(false);
    setTimer(0);
    setMistakes(0);
  }, []);

  // 2. Timer Logic
  useEffect(() => {
    let interval;
    if (isPlaying && !isWon) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isWon]);

  // 3. Logic Update Cell (Pas user ketik)
  const updateCell = (index, value) => {
    // Validasi: Cuma boleh angka 1-9
    if (!/^[1-9]?$/.test(value)) return;
    
    // Gak boleh edit soal asli
    if (initialGrid[index] !== "") return;

    const newGrid = [...grid];
    newGrid[index] = value;
    setGrid(newGrid);
    playPop();

    // Cek Menang
    const currentString = newGrid.join("");
    const solutionString = solution.join("");
    
    if (currentString === solutionString) {
      setIsWon(true);
      setIsPlaying(false);
      playWin();
    }
  };

  // 4. Format Waktu (00:00)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    grid,
    initialGrid,
    updateCell,
    newGame,
    difficulty,
    timer: formatTime(timer),
    isPlaying,
    isWon,
    mistakes,
    setIsPlaying // Buat pause/resume
  };
}