"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Zap, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';

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
    <div className="w-full bg-white shadow-sm flex flex-col sticky top-0 z-50">
      
      {/* 1. Main Logo & Icons */}
      <div className="w-full px-4 py-3 flex items-center justify-between">
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

        <div className="flex items-center gap-2">
          <Link href={session ? "/mypage" : "/login"} className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
            <User className="w-6 h-6" />
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Search Bar */}
      <div className="w-full px-4 pb-3">
        <form onSubmit={handleSearch} className="w-full relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="어떤 변압기를 찾으시나요?"
            className="w-full pl-4 pr-10 py-2.5 bg-gray-100 border border-transparent focus:border-blue-500 rounded-xl text-sm focus:outline-none focus:bg-white text-gray-900 placeholder-gray-400 transition-colors"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-blue-600">
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* 3. Clean GNB Menu (Pill Style) */}
      <nav className="w-full border-t border-gray-100 bg-white">
        <div className="w-full px-4 py-3 flex items-center gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link href="/" className="px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-bold shadow-sm shrink-0">
            홈
          </Link>
          <Link href="/category/industrial" className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-xs font-bold shrink-0 transition-colors">
            공업용변압기
          </Link>
          <Link href="/category/home" className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-xs font-bold shrink-0 transition-colors">
            가정용변압기
          </Link>
          <Link href="/category/avr" className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-xs font-bold shrink-0 transition-colors">
            AVR (자동)
          </Link>
          <Link href="/category/oil" className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-xs font-bold shrink-0 transition-colors">
            유입식변압기
          </Link>
          <Link href="/category/slidacs" className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-xs font-bold shrink-0 transition-colors">
            슬라이닥스
          </Link>
          <Link href="/category/panel" className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-xs font-bold shrink-0 transition-colors">
            판넬용트랜스
          </Link>
        </div>
      </nav>
    </div>
  );
}
