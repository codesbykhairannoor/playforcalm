"use client";
import { useState, useEffect, useCallback } from "react";
import useSound from "use-sound";

const SNAP_SOUND = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";
const WIN_SOUND = "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3";

// Gambar Preset (Biar user gak bosen satu gambar doang)
export const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop", // Cat
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000&auto=format&fit=crop", // City
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop", // Space
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop", // Nature
];

export function useJigsaw() {
  // 'menu' | 'playing' | 'paused' | 'won'
  const [gameState, setGameState] = useState('menu'); 
  const [pieceCount, setPieceCount] = useState(10);
  const [gridDimensions, setGridDimensions] = useState({ rows: 2, cols: 5 });
  const [pieces, setPieces] = useState([]);
  const [image, setImage] = useState(PRESET_IMAGES[0]);
  const [aspectRatio, setAspectRatio] = useState(1.5);
  
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);

  const [playSnap] = useSound(SNAP_SOUND, { volume: 0.4 });
  const [playWin] = useSound(WIN_SOUND, { volume: 0.5 });

  // Load Image (Hitung Rasio)
  const loadImage = useCallback((url) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setAspectRatio(img.width / img.height);
      setImage(url);
    };
  }, []);
const [isPaused, setIsPaused] = useState(false);
  
  const togglePause = () => {
    if (gameState === 'playing') setIsPaused(!isPaused);
  };
  // START GAME (Generate Kepingan)
  const startGame = useCallback(() => {
    const total = pieceCount;
    const cols = Math.round(Math.sqrt(total * aspectRatio));
    const rows = Math.round(total / cols);
    setGridDimensions({ rows, cols });
    
    const newPieces = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Posisi Awal Acak (Scatter)
        const randomTop = Math.random() * 80 + 10;
        const randomLeft = Math.random() * 80 + 10;
        
        newPieces.push({
          id: `${r}-${c}`,
          r, c,
          initialTop: randomTop,
          initialLeft: randomLeft,
          isLocked: false,
        });
      }
    }

    setPieces(newPieces);
    setGameState('playing'); // Timer jalan mulai dari sini
    setProgress(0);
    setTimer(0);
  }, [pieceCount, aspectRatio]);

  // Handle Drop
  const handlePieceDrop = (id, isCorrect) => {
    if (isCorrect) {
      playSnap();
      setPieces((prev) => prev.map((p) => p.id === id ? { ...p, isLocked: true } : p));
      
      setProgress(prev => {
        const newProg = prev + 1;
        if (newProg >= pieces.length) {
            setGameState('won'); // Stop Timer
            playWin();
        }
        return newProg;
      });
    }
  };

  // Timer logic (Cuma jalan pas 'playing')
  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return {
    gameState, setGameState,
    pieceCount, setPieceCount,
    image, loadImage, aspectRatio,
    pieces, gridDimensions,
    progress, timer: formatTime(timer), rawTimer: timer, // kirim rawTimer buat scoring
    startGame, handlePieceDrop,
    togglePause, isPaused
  };
}