"use client";

import { useState } from 'react';
import Link from 'next/link';
import { X, Zap, Target } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function LeftWing() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  if (pathname?.startsWith('/admin') || !isVisible) {
    return null;
  }

  return (
    <div className="hidden xl:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 pl-4">
      {/* Banner 1: Special Promotion */}
      <div className="w-[100px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col relative group">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-1 bg-black/20 hover:bg-black/40 text-white rounded-full p-0.5 z-10 transition-colors opacity-0 group-hover:opacity-100"
        >
          <X className="w-3 h-3" />
        </button>
        
        <Link href="/category/industrial" className="block text-center hover:opacity-90 transition-opacity">
          <div className="bg-blue-600 text-white py-3 flex flex-col items-center gap-1">
            <Zap className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
            <span className="text-[10px] font-black tracking-wider">여름특가</span>
          </div>
          <div className="py-3 px-2 bg-gradient-to-b from-blue-50 to-white">
            <p className="text-[11px] font-bold text-gray-800 leading-tight">
              공업용<br/>트랜스<br/>
              <span className="text-red-500 font-black text-sm">최대 20%</span><br/>할인
            </p>
          </div>
        </Link>
      </div>

      {/* Banner 2: Ad Space / B2B */}
      <div className="w-[100px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col relative group">
        <Link href="/qna" className="block text-center hover:opacity-90 transition-opacity">
          <div className="bg-slate-800 text-white py-3 flex flex-col items-center gap-1">
            <Target className="w-6 h-6 text-emerald-400" />
            <span className="text-[10px] font-black tracking-wider">B2B 전용</span>
          </div>
          <div className="py-3 px-2">
            <p className="text-[11px] font-bold text-gray-800 leading-tight">
              대량구매<br/>특수사양<br/>
              <span className="text-emerald-600 font-black text-xs">특별단가<br/>견적상담</span>
            </p>
          </div>
        </Link>
      </div>

    </div>
  );
}
