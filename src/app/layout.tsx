import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from '@/components/CartContext';
import Silk from '@/Backgrounds/Silk/Silk';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const phillySans = localFont({
  src: "../app/fonts/phillysansps.woff",
  variable: "--font-philly-sans",
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${phillySans.variable} antialiased relative min-h-screen bg-black`}
        style={{overflowX: 'hidden'}}
      >
        <div style={{position: 'fixed', inset: 0, zIndex: -1, width: '100vw', height: '100vh', pointerEvents: 'none'}}>
          <Silk
            speed={3}
            scale={1}
            color="#7B7481"
            noiseIntensity={1.0}
            rotation={0}
          />
        </div>
        <div style={{position: 'relative', zIndex: 1,  display: 'flex', flexDirection: 'column'}}>
          <CartProvider>
            {children}
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
