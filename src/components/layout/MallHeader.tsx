"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Phone, Bookmark, Truck, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function MallHeader({
  searchQuery,
  setSearchQuery
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs text-gray-900">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-yellow-400 font-bold">
              <Truck className="w-3.5 h-3.5" /> 오후 4시 이전 주문 시 당일 발송!
            </span>
            <span className="hidden sm:inline text-slate-400">| 주식회사 한일트랜스샵 공식 온라인 몰</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-blue-400" /> 고객센터: 010-5424-7571
            </span>
            <button className="hover:text-white transition-colors hidden sm:flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5" /> 즐겨찾기
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600/30">
              <Zap className="w-7 h-7 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-blue-950">한일트랜스샵</span>
                <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded">공식</span>
              </div>
              <span className="text-[11px] text-gray-500 font-bold block">HANIL TRANSFORMER E-SHOP</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="변압기 모델명, 전압 (예: 220V 110V, 3kVA, AVR, 슬라이닥스) 검색..."
              className="w-full pl-4 pr-12 py-3 bg-gray-50 border-2 border-blue-600 rounded-xl text-sm focus:outline-none focus:bg-white text-gray-900 placeholder-gray-400 transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Counter Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 px-4 py-2.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl hover:bg-blue-100 transition-colors shrink-0 relative group"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {totalCount}
                </span>
              )}
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-xs text-gray-500 block leading-none">장바구니</span>
              <span className="text-sm font-black text-blue-900 leading-tight">{totalCount}개 상품</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
