import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import QuickWing from "@/components/layout/QuickWing";
import AuthProvider from "@/components/providers/AuthProvider";
import LeftWing from "@/components/layout/LeftWing";

export const metadata: Metadata = {
  title: "더 한일트랜스 스토어 | 프리미엄 변압기 공식 온라인몰",
  description: "가정용 다운트랜스, 승압기, 공업용 변압기, AVR, 슬라이닥스 정품 직영 공식 판매몰",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" translate="no" className="h-full antialiased">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans">
        <AuthProvider>
          <CartProvider>
            {children}
            <QuickWing />
            <LeftWing />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
