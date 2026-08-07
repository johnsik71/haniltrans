"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Phone, Zap, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { totalCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 font-sans text-gray-900">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 max-w-full overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-4 text-slate-300">
            <span className="text-yellow-400 font-bold flex items-center gap-1 text-[10px] sm:text-xs text-center">
              ★ 더 한일트랜스 스토어 공식 온라인몰
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">오후 4시 전 주문 당일 발송!</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-slate-300 text-[10px] sm:text-[11px] overflow-x-auto whitespace-nowrap hide-scrollbar w-full max-w-full sm:w-auto justify-start sm:justify-end">
            <a href="tel:032-324-9529" className="flex items-center gap-1 font-bold text-blue-400 hover:text-blue-300 transition-colors shrink-0">
              <Phone className="w-3.5 h-3.5" /> 032-324-9529
            </a>
            {session ? (
              <>
                <Link href="/mypage" className="hover:text-white font-bold text-blue-300 transition-colors">마이페이지</Link>
                <button onClick={() => signOut()} className="hover:text-white transition-colors">로그아웃</button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-white font-bold transition-colors">로그인 / 회원가입</Link>
                <Link href="/mypage" className="hover:text-white transition-colors">마이페이지</Link>
              </>
            )}
            <Link href="/qna" className="hover:text-white transition-colors">고객센터 / Q&A</Link>
            <Link href="/admin" className="hover:text-white transition-colors font-bold text-slate-400">관리자</Link>
          </div>
        </div>
      </div>

      {/* Main Logo & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Logo & Mobile Cart Container */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0c1e3e] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/30 border-2 border-blue-900/50 relative overflow-hidden group-hover:scale-105 transition-transform">
                {/* The 'H' Background */}
                <div className="absolute inset-0 flex items-center justify-between px-1.5 sm:px-2">
                  <div className="w-2 sm:w-2.5 h-6 sm:h-8 rounded-sm animate-flash-h"></div>
                  <div className="w-2 sm:w-2.5 h-6 sm:h-8 rounded-sm animate-flash-h"></div>
                </div>
                <div className="absolute w-6 sm:w-8 h-2 sm:h-2.5 rounded-sm animate-flash-h"></div>
                
                {/* 3D Spinning Lightning */}
                <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-400 fill-current relative z-10 animate-3d-spin drop-shadow-md" />
              </div>
              <div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-blue-950">더 한일트랜스 스토어</span>
                  <span className="bg-red-500 text-white text-[9px] sm:text-[10px] font-black px-1 sm:px-1.5 py-0.5 rounded">공식</span>
                </div>
                <span className="text-[9px] sm:text-[11px] text-gray-500 font-bold block">THE HANIL TRANS STORE</span>
              </div>
            </Link>

            {/* Mobile Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="md:hidden relative p-2 text-blue-900 hover:bg-blue-50 rounded-xl transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-blue-600" />
              {totalCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {totalCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar + Desktop Cart */}
          <div className="flex w-full md:flex-1 gap-3 items-center">
            <form onSubmit={handleSearch} className="flex-1 max-w-xl relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="변압기 용량, 전압, AVR, 슬라이닥스 검색..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border-2 border-blue-600 rounded-xl text-sm focus:outline-none focus:bg-white text-gray-900 placeholder-gray-400 transition-colors"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Certifications - ISO 9001, 14001, KC */}
            <div className="hidden lg:flex items-center gap-2 shrink-0 px-2">
              <img src="/images/cert_iso9001.jpg" alt="ISO 9001" className="h-8 w-auto object-contain bg-white rounded shadow-sm border border-gray-100" />
              <img src="/images/cert_iso14001.png" alt="ISO 14001" className="h-8 w-auto object-contain bg-white rounded shadow-sm border border-gray-100" />
              <img src="/images/cert_kc.png" alt="KC 인증" className="h-8 w-auto object-contain bg-white rounded shadow-sm border border-gray-100" />
            </div>

            {/* Desktop Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="hidden md:flex items-center gap-2 md:gap-3 p-2.5 md:px-4 md:py-2.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl hover:bg-blue-100 transition-colors shrink-0"
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
                {totalCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                    {totalCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden lg:block">
                <span className="text-xs text-gray-500 block leading-none">장바구니</span>
                <span className="text-sm font-black text-blue-900 leading-tight">{totalCount}개 상품</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Category GNB Bar */}
      <nav className="bg-slate-900 border-t border-slate-800 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold h-12 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <div className="flex items-center gap-8 sm:gap-10 min-w-max">
            <Link href="/" className="hover:text-blue-400 transition-colors py-3">메인 홈</Link>
            <Link href="/about" className="hover:text-blue-400 transition-colors py-3">회사소개</Link>
            <Link href="/category/industrial" className="hover:text-blue-400 transition-colors py-3">공업용변압기</Link>
            <Link href="/category/oil" className="hover:text-blue-400 transition-colors py-3">유입식변압기</Link>
            <Link href="/category/avr" className="hover:text-blue-400 transition-colors py-3">AVR자동전압기</Link>
            <Link href="/category/panel" className="hover:text-blue-400 transition-colors py-3">판넬용트랜스</Link>
            <Link href="/category/slidacs" className="hover:text-blue-400 transition-colors py-3">슬라이닥스</Link>
            <Link href="/category/home" className="hover:text-blue-400 transition-colors py-3">가정용변압기</Link>
            <Link href="/qna" className="hover:text-blue-400 transition-colors py-3">Q & A 게시판</Link>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-yellow-400 font-bold text-[11px]">
            <Link href="/qna?tab=inquiry" className="hover:text-blue-300 transition-colors flex items-center gap-1">
              📞 견적/기술문의: 032-324-9529
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
