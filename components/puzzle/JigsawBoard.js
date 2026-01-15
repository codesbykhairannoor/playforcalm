"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function JigsawBoard({ pieces, gridDimensions, image, aspectRatio, handlePieceDrop, gameState }) {
  const boardRef = useRef(null);
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (boardRef.current) {
      setBoardSize({
        width: boardRef.current.offsetWidth,
        height: boardRef.current.offsetWidth / aspectRatio
      });
    }
  }, [aspectRatio, gameState]);

  const pieceWidth = 100 / gridDimensions.cols;
  const pieceHeight = 100 / gridDimensions.rows;

  // VISUAL MENANG: Tampilkan gambar utuh tanpa garis-garis
  if (gameState === 'won') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[600px] rounded-lg shadow-2xl overflow-hidden border-4 border-white"
        style={{ aspectRatio: `${aspectRatio}` }}
      >
        <img src={image} alt="Completed" className="w-full h-full object-cover" />
      </motion.div>
    );
  }

  // PAPAN GAME BIASA
  return (
    <div 
      ref={boardRef}
      className="relative bg-slate-200 border-2 border-slate-300 rounded-lg shadow-inner overflow-hidden w-full max-w-[600px]"
      style={{ 
        aspectRatio: `${aspectRatio}`,
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
        backgroundSize: `${pieceWidth}% ${pieceHeight}%`
      }}
    >
      {/* LOCKED PIECES */}
      {pieces.filter(p => p.isLocked).map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            width: `${pieceWidth}%`, height: `${pieceHeight}%`,
            top: `${piece.r * pieceHeight}%`, left: `${piece.c * pieceWidth}%`,
            backgroundImage: `url(${image})`,
            backgroundPosition: `${(piece.c / (gridDimensions.cols - 1)) * 100}% ${(piece.r / (gridDimensions.rows - 1)) * 100}%`,
            backgroundSize: `${gridDimensions.cols * 100}% ${gridDimensions.rows * 100}%`,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)"
          }}
        />
      ))}

      {/* DRAGGABLE PIECES */}
      {pieces.filter(p => !p.isLocked).map((piece) => (
        <DraggablePiece 
          key={piece.id} piece={piece} 
          pieceWidth={pieceWidth} pieceHeight={pieceHeight}
          gridDimensions={gridDimensions} image={image}
          onDrop={handlePieceDrop}
        />
      ))}
    </div>
  );
}

// (Sub-component DraggablePiece sama kayak sebelumnya, copy aja dari yang lama gapapa)
function DraggablePiece({ piece, pieceWidth, pieceHeight, gridDimensions, image, onDrop }) {
  const initialStyle = { top: `${piece.initialTop}%`, left: `${piece.initialLeft}%` };
  return (
    <motion.div
      drag dragMomentum={false}
      style={{
        position: 'absolute', width: `${pieceWidth}%`, height: `${pieceHeight}%`,
        ...initialStyle,
        backgroundImage: `url(${image})`,
        backgroundPosition: `${(piece.c / (gridDimensions.cols - 1)) * 100}% ${(piece.r / (gridDimensions.rows - 1)) * 100}%`,
        backgroundSize: `${gridDimensions.cols * 100}% ${gridDimensions.rows * 100}%`,
        zIndex: 10, borderRadius: "4px", cursor: "grab",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.3)",
      }}
      whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
      onDragEnd={(e) => {
        const rect = e.target.getBoundingClientRect();
        const boardRect = e.target.parentElement.getBoundingClientRect();
        const relativeTop = ((rect.top - boardRect.top) / boardRect.height) * 100;
        const relativeLeft = ((rect.left - boardRect.left) / boardRect.width) * 100;
        const targetTop = piece.r * pieceHeight;
        const targetLeft = piece.c * pieceWidth;
        // Toleransi Snap 7%
        if (Math.abs(relativeTop - targetTop) < 7 && Math.abs(relativeLeft - targetLeft) < 7) {
          onDrop(piece.id, true);
        }
      }}
    />
  );
}