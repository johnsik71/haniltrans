"use client";

import { ArrowUp, Bell, Heart, MessageSquare, Truck, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function QuickWing() {
  const pathname = usePathname();
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadRecent = () => {
      try {
        const recent = JSON.parse(localStorage.getItem('recentProducts') || '[]');
        setRecentProducts(recent);
      } catch (e) {}
    };
    loadRecent();
    window.addEventListener('recentProductsUpdated', loadRecent);
    return () => window.removeEventListener('recentProductsUpdated', loadRecent);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearRecentProducts = () => {
    localStorage.removeItem('recentProducts');
    setRecentProducts([]);
    window.dispatchEvent(new Event('recentProductsUpdated'));
  };

  const removeRecentProduct = (id: string) => {
    const updated = recentProducts.filter(p => p.id !== id);
    localStorage.setItem('recentProducts', JSON.stringify(updated));
    setRecentProducts(updated);
    window.dispatchEvent(new Event('recentProductsUpdated'));
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col bg-white border border-r-0 border-gray-300 rounded-l-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] text-[11px] font-sans text-gray-700 overflow-hidden w-[72px]">
      <div className="bg-slate-800 text-white py-2 text-center font-black text-[10px] tracking-widest">
        QUICK
      </div>
      
      <div className="divide-y divide-gray-100 text-center flex flex-col">
        <Link href="/notice" className="py-3 hover:bg-blue-50 hover:text-blue-700 flex flex-col items-center gap-1.5 transition-colors group">
          <Bell className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <span className="text-[10px] font-bold">공지사항</span>
        </Link>
        <Link href="/wishlist" className="py-3 hover:bg-blue-50 hover:text-blue-700 flex flex-col items-center gap-1.5 transition-colors group">
          <Heart className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
          <span className="text-[10px] font-bold">즐겨찾기</span>
        </Link>
        <Link href="/reviews" className="py-3 hover:bg-blue-50 hover:text-blue-700 flex flex-col items-center gap-1.5 transition-colors group">
          <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <span className="text-[10px] font-bold">사용후기</span>
        </Link>
        <Link href="/delivery" className="py-3 hover:bg-blue-50 hover:text-blue-700 flex flex-col items-center gap-1.5 transition-colors group">
          <Truck className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <span className="text-[10px] font-bold">배송조회</span>
        </Link>
      </div>

      <div className="border-t border-gray-200 py-3 px-1 text-center bg-gray-50 text-[10px] flex flex-col items-center relative">
        <div className="flex items-center justify-between w-full px-1.5 mb-1.5">
          <span className="text-gray-500 font-bold tracking-tighter">최근 본 상품</span>
          {recentProducts.length > 0 && (
            <button 
              onClick={clearRecentProducts} 
              className="text-gray-400 hover:text-red-500 bg-white border border-gray-200 rounded p-0.5 transition-colors shadow-sm"
              title="초기화"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full px-1 items-center">
          {recentProducts.length > 0 ? (
            recentProducts.slice(0, 3).map((product, idx) => (
              <div key={product.id + '-' + idx} className="relative group w-11 h-11 bg-white rounded border border-gray-200 flex items-center justify-center shadow-sm overflow-hidden">
                <Link href={`/product/${product.id}`} className="block w-full h-full relative">
                  <img src={product.image || 'https://via.placeholder.com/100'} alt="최근본상품" className="w-full h-full object-cover" />
                </Link>
                {/* Individual Delete Button */}
                <button
                  onClick={() => removeRecentProduct(product.id)}
                  className="absolute -top-1 -right-1 bg-white/90 border border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50 w-5 h-5 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm z-10 scale-75"
                  title="삭제"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          ) : (
            <div className="w-11 h-11 bg-white rounded border border-gray-200 flex items-center justify-center text-gray-400 font-bold text-xs shadow-sm">
              0
            </div>
          )}
          
          {recentProducts.length > 3 && (
            <div className="text-[9px] text-gray-400 font-bold bg-white border border-gray-200 rounded px-1.5 py-0.5">
              +{recentProducts.length - 3}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="bg-slate-700 text-white py-2.5 text-center font-bold hover:bg-slate-900 transition-colors flex flex-col items-center justify-center gap-0.5"
      >
        <ArrowUp className="w-4 h-4" />
        <span className="text-[10px]">TOP</span>
      </button>
    </div>
  );
}
