"use client";
import { PRESET_IMAGES } from "@/hooks/useJigsaw";
import { Image as ImageIcon, Check, Play, Upload } from "lucide-react";
import { useRef } from "react";

export default function JigsawControls({ dict, pieceCount, setPieceCount, image, loadImage, startGame }) {
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) loadImage(URL.createObjectURL(file));
  };

  // Cek apakah gambar saat ini adalah gambar custom (bukan preset)
  const isCustomImage = image && !PRESET_IMAGES.includes(image);

  return (
    // Tambah mt-10 biar gak nempel navbar
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-slate-100 mt-5 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. PILIH GAMBAR */}
      <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
        <ImageIcon className="text-teal-500" /> {dict.puzzle.select_image}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {/* Preset Images */}
        {PRESET_IMAGES.map((url, idx) => (
          <button
            key={idx}
            onClick={() => loadImage(url)}
            className={`relative aspect-square rounded-xl overflow-hidden border-4 transition-all hover:scale-105 ${image === url ? 'border-teal-500 ring-2 ring-teal-200' : 'border-slate-100'}`}
          >
            <img src={url} className="w-full h-full object-cover" alt="Preset" />
            {image === url && (
              <div className="absolute inset-0 bg-teal-500/20 flex items-center justify-center">
                <div className="bg-teal-500 text-white rounded-full p-1"><Check size={16}/></div>
              </div>
            )}
          </button>
        ))}

        {/* Upload Button (FIXED PREVIEW) */}
        <button 
          onClick={() => fileInputRef.current?.click()}
          className={`relative aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition overflow-hidden
            ${isCustomImage ? 'border-teal-500 ring-2 ring-teal-200' : 'border-slate-300 hover:border-teal-500 hover:bg-teal-50 text-slate-400 hover:text-teal-500'}
          `}
        >
          {isCustomImage ? (
             // Kalau ada gambar upload, tampilkan gambarnya!
             <>
               <img src={image} className="w-full h-full object-cover opacity-80" alt="Uploaded" />
               <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                 <div className="bg-white/90 text-teal-600 rounded-full p-2 shadow-sm"><Check size={16}/></div>
               </div>
             </>
          ) : (
             // Kalau belum, tampilkan ikon upload
             <>
               <Upload size={24} className="mb-2"/>
               <span className="text-xs font-bold text-center">Upload</span>
             </>
          )}
        </button>
        <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*" className="hidden" />
      </div>

      {/* 2. PILIH DIFFICULTY */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-700 mb-4">{dict.puzzle.difficulty}</h3>
        <div className="flex gap-3">
          {[10, 20, 50].map(count => (
            <button
              key={count}
              onClick={() => setPieceCount(count)}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex-1 md:flex-none border-2 ${pieceCount === count ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-300'}`}
            >
              {count} {dict.puzzle.pieces}
            </button>
          ))}
        </div>
      </div>

      {/* 3. TOMBOL START */}
      <button 
        onClick={startGame}
        className="w-full py-4 bg-teal-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-teal-200 hover:bg-teal-700 hover:scale-[1.01] transition flex items-center justify-center gap-3"
      >
        <Play fill="currentColor" /> {dict.puzzle.start_game}
      </button>

    </div>
  );
}