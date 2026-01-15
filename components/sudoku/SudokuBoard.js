"use client";

export default function SudokuBoard({ grid, initialGrid, solution, selectedCell, setSelectedCell }) {
  
  const activeValue = selectedCell !== null ? grid[selectedCell] : null;

  return (
    <div className="grid grid-cols-9 border-4 border-slate-800 bg-slate-800 gap-[1px] shadow-2xl rounded-lg overflow-hidden select-none w-full max-w-[500px] aspect-square">
      {grid.map((cell, index) => {
        const isInitial = initialGrid[index] !== "";
        const isSelected = selectedCell === index;
        const isSameNumber = activeValue && cell === activeValue && cell !== "";
        
        // LOGIC WARNA MERAH:
        // Kalau angka user TIDAK SAMA dengan kunci jawaban, berarti SALAH.
        const isError = !isInitial && cell !== "" && cell !== solution[index];

        const colIndex = index % 9;
        const rowIndex = Math.floor(index / 9);
        const borderRight = (colIndex + 1) % 3 === 0 && colIndex !== 8 ? "border-r-2 border-r-slate-800" : "";
        const borderBottom = (rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? "border-b-2 border-b-slate-800" : "";

        // Background Color
        let bgColor = "bg-white";
        if (isSelected) bgColor = "bg-teal-300";
        else if (isSameNumber) bgColor = "bg-teal-100";
        else if (isError) bgColor = "bg-rose-100"; // Background merah muda kalau salah
        else bgColor = "bg-white hover:bg-slate-50";

        // Text Color
        let textColor = "text-teal-600";
        if (isInitial) textColor = "text-slate-900";
        if (isError) textColor = "text-rose-600"; // Teks Merah kalau salah

        return (
          <div
            key={index}
            onMouseDown={() => setSelectedCell(index)} 
            className={`
              flex items-center justify-center text-2xl sm:text-3xl font-bold cursor-pointer 
              transition-colors duration-75 ease-in-out
              ${borderRight} ${borderBottom}
              ${bgColor} ${textColor}
            `}
          >
            {cell}
          </div>
        );
      })}
    </div>
  );
}