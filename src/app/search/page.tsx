"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { Search, AlertCircle } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        if (query) {
          const lowerQ = query.toLowerCase();
          const filtered = data.filter((p: any) => 
            p.name.toLowerCase().includes(lowerQ) ||
            (p.description && p.description.toLowerCase().includes(lowerQ)) ||
            (p.category && p.category.toLowerCase().includes(lowerQ)) ||
            (p.specs?.capacity && p.specs.capacity.toLowerCase().includes(lowerQ))
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts([]);
        }
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="flex-1 min-w-0 bg-white border border-gray-200 p-8 rounded-sm shadow-sm">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
          <Search className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            <span className="text-blue-600">"{query}"</span> 검색 결과
          </h1>
          <p className="text-sm text-gray-500 mt-1">총 {filteredProducts.length}개의 상품이 검색되었습니다.</p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">검색 결과가 없습니다.</h3>
          <p className="text-gray-500 text-sm mb-6">검색어를 바르게 입력했는지 확인하시거나<br/>다른 검색어로 다시 시도해 보세요.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        <Sidebar />
        <Suspense fallback={
          <div className="flex-1 min-w-0 bg-white border border-gray-200 p-8 rounded-sm shadow-sm flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
