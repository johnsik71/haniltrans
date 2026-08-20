"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import CartDrawer from '@/components/shop/CartDrawer';
import Link from 'next/link';

export default function DiscountPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter products that have an originalPrice greater than the current price
          const discountedProducts = data.filter(p => p.originalPrice && p.originalPrice > p.price);
          setProducts(discountedProducts);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        <Sidebar />

        <div className="flex-1 min-w-0 bg-white border border-gray-200 p-8 rounded-sm shadow-sm">
          <div className="text-[11px] text-gray-500 flex items-center gap-1 border-b border-gray-200 pb-2 mb-6">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>&gt;</span>
            <span className="font-bold text-gray-800">할인품목</span>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-red-100 text-red-500 rounded-xl flex items-center justify-center">
              <span className="font-black text-xl">%</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">특별 할인품목</h1>
              <p className="text-sm text-gray-500 mt-1">현재 한일트랜스에서 할인 중인 상품 모음입니다.</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border-t border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <span className="font-black text-4xl">%</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">현재 할인 중인 상품이 없습니다.</h3>
              <p className="text-gray-500 text-sm mb-6">다음에 진행될 할인 이벤트를 기대해 주세요!</p>
              <Link 
                href="/" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2 transition-colors"
              >
                메인으로 돌아가기
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
