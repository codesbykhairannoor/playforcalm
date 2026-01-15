"use client";
import { motion } from "framer-motion";

export default function SudokuBoard({ grid, initialGrid, updateCell, isWon }) {
  return (
    <div className="relative">
      {/* Grid Utama 9x9 */}
      <div className="grid grid-cols-9 border-4 border-slate-800 bg-slate-800 gap-px shadow-2xl rounded-lg overflow-hidden select-none">
        {grid.map((cell, index) => {
          const isInitial = initialGrid[index] !== "";
          
          // Logic CSS buat garis tebal setiap 3 kotak (Visual Sudoku)
          const colIndex = index % 9;
          const rowIndex = Math.floor(index / 9);
          const isRightBorder = (colIndex + 1) % 3 === 0 && colIndex !== 8;
          const isBottomBorder = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;

          return (
            <motion.input
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.005 }}
              
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={cell}
              disabled={isInitial || isWon}
              onChange={(e) => updateCell(index, e.target.value)}
              
              className={`
                w-8 h-8 sm:w-12 sm:h-12 
                text-center text-lg sm:text-2xl font-bold outline-none cursor-pointer
                transition-all duration-200
                ${isRightBorder ? "mr-[2px]" : ""}
                ${isBottomBorder ? "mb-[2px]" : ""}
                ${isInitial 
                  ? "bg-slate-200 text-slate-800" 
                  : "bg-white text-teal-600 focus:bg-teal-50 hover:bg-slate-50"
                }
                ${isWon ? "bg-green-100 text-green-600 !important" : ""}
              `}
            />
          );
        })}
      </div>
    </div>
  );
}