import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar"; // Kita bawa Lampu masuk rumah
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext"; // Kita pasang Listrik di rumah

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PlayForCalm",
  description: "A gentle way to train your focus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#f8fafc] overflow-x-hidden`}>
        
        {/* INI KUNCINYA: Provider membungkus SEMUANYA */}
        <LanguageProvider>
          
          {/* Navbar ditaruh di DALAM Provider, jadi dia nyala */}
          <Navbar />
          
          <main className="flex-grow relative w-full">
             {/* Background Pattern Dot */}
             <div className="absolute inset-0 -z-10 h-full w-full bg-[#f8fafc] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
             
             {children}
          </main>

          <Footer />
          
        </LanguageProvider>
        
      </body>
    </html>
  );
}