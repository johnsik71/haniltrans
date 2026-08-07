"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Phone, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';

export default function HeaderMobile() {
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
    <div className="w-full bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col rounded-b-xl">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-3 w-full">
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-between min-w-0">
            <span className="text-yellow-400 font-bold flex items-center gap-1 text-[10px] truncate">
              ★ 더 한일트랜스 스토어
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-[10px] overflow-x-auto whitespace-nowrap hide-scrollbar min-w-0 pb-1">
            <a href="tel:032-324-9529" className="flex items-center gap-1 font-bold text-blue-400 hover:text-blue-300 transition-colors shrink-0">
              <Phone className="w-3.5 h-3.5" /> 032-324-9529
            </a>
            {session ? (
              <>
                <Link href="/mypage" className="font-bold text-blue-300">마이페이지</Link>
                <button onClick={() => signOut()}>로그아웃</button>
              </>
            ) : (
              <>
                <Link href="/login" className="font-bold">로그인/가입</Link>
                <Link href="/mypage">마이페이지</Link>
              </>
            )}
            <Link href="/qna">고객센터/Q&A</Link>
            <Link href="/admin" className="font-bold text-slate-400">관리자</Link>
          </div>
        </div>
      </div>

      {/* Main Logo & Search Bar */}
      <div className="w-full px-4 py-3 bg-white flex flex-col gap-3">
        {/* Logo & Mobile Cart Container */}
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-[#0c1e3e] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/30 border-2 border-blue-900/50 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-between px-1.5">
                <div className="w-2 h-6 rounded-sm animate-flash-h"></div>
                <div className="w-2 h-6 rounded-sm animate-flash-h"></div>
              </div>
              <div className="absolute w-6 h-2 rounded-sm animate-flash-h"></div>
              <Zap className="w-5 h-5 text-yellow-400 fill-current relative z-10 animate-3d-spin drop-shadow-md" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-black tracking-tight text-blue-950">더 한일트랜스 스토어</span>
                <span className="bg-red-500 text-white text-[9px] font-black px-1 py-0.5 rounded">공식</span>
              </div>
              <span className="text-[9px] text-gray-500 font-bold block">THE HANIL TRANS STORE</span>
            </div>
          </Link>

          {/* Mobile Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-blue-900 hover:bg-blue-50 rounded-xl transition-colors"
          >
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            {totalCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {totalCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="변압기 용량, 전압 등 검색..."
            className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border-2 border-blue-600 rounded-xl text-xs focus:outline-none focus:bg-white text-gray-900 placeholder-gray-400"
          />
          <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center">
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Main Category GNB Bar */}
      <nav className="bg-slate-900 border-t border-slate-800 text-white w-full">
        <div className="w-full px-4 flex items-center text-[11px] font-bold h-11 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <div className="flex items-center gap-5 min-w-max">
            <Link href="/" className="py-2">홈</Link>
            <Link href="/about" className="py-2">회사소개</Link>
            <Link href="/category/industrial" className="py-2">공업용변압기</Link>
            <Link href="/category/oil" className="py-2">유입식변압기</Link>
            <Link href="/category/avr" className="py-2">AVR자동전압기</Link>
            <Link href="/category/panel" className="py-2">판넬용트랜스</Link>
            <Link href="/category/slidacs" className="py-2">슬라이닥스</Link>
            <Link href="/category/home" className="py-2">가정용변압기</Link>
            <Link href="/qna" className="py-2">Q&A</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
