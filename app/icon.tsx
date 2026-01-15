import { ImageResponse } from 'next/og'

// Konfigurasi ukuran favicon
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      // Desain ini disamain sama logo Leaf di Navbar lu
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(to bottom right, #2dd4bf, #10b981)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
        }}
      >
        {/* Ikon Daun (Representasi Leaf Lucide) */}
        🍃
      </div>
    ),
    {
      ...size,
    }
  )
}