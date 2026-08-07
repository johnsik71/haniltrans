"use client";

import { use, useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import CartDrawer from '@/components/shop/CartDrawer';
import SpecFinderWidget from '@/components/shop/SpecFinderWidget';
import { CATEGORIES_SIDEBAR } from '@/data/products';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const categoryId = resolvedParams.id;
  const [subFilter, setSubFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommend');
  const [products, setProducts] = useState<any[]>([]);

  const SUBCATEGORIES: Record<string, string[]> = {
    industrial: ['삼상 단권', '삼상 복권'],
    oil: ['삼상 단권', '삼상 복권'],
    avr: ['단상 단권', '단상 복권', '삼상 단권', '삼상 복권'],
    panel: ['단상 단권', '단상 복권'],
    global: ['미국/캐나다/일본', '유럽/중국/인도/동남아']
  };
  const currentSubCategories = SUBCATEGORIES[categoryId] || [];

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(console.error);
  }, []);

  const currentCategory = CATEGORIES_SIDEBAR.find((c) => c.id === categoryId) || {
    id: categoryId,
    name: '변압기 카테고리'
  };

  const categoryProducts = products.filter((p) => {
    if (categoryId !== 'all' && p.category !== categoryId) {
      // Allow fallback if items match
      if (categoryId === 'industrial' && p.category === 'industrial') return true;
      if (categoryId === 'oil' && p.category === 'oil') return true;
      if (categoryId === 'avr' && p.category === 'avr') return true;
      if (categoryId === 'panel' && p.category === 'panel') return true;
      return false;
    }
    return true;
  });

  const filteredProducts = categoryProducts.filter((p) => {
    if (subFilter !== 'all' && p.subCategory !== subFilter) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low') return a.price - b.price;
    if (sortBy === 'high') return b.price - a.price;
    return 0; 
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          
          {/* Left Sidebar */}
          <Sidebar activeCatId={categoryId} />

          {/* Main Content Area matching PDF 2, 3, 4 */}
          <div className="flex-1 min-w-0 space-y-6">
            
            {/* Breadcrumb */}
            <div className="text-[11px] text-gray-500 flex items-center gap-1 border-b border-gray-200 pb-2">
              <Link href="/" className="hover:underline">HOME</Link>
              <span>&gt;</span>
              <span className="font-bold text-gray-800">{currentCategory.name}</span>
            </div>



            {/* Category Header */}
            <div className="border-b-2 border-gray-900 pb-2">
              <h2 className="text-lg font-black text-gray-900">■ {currentCategory.name}</h2>
            </div>

            {/* Subcategory Pills */}
            <div className="bg-white border border-gray-200 p-3 rounded-xs flex gap-6 text-xs font-bold text-gray-600 overflow-x-auto whitespace-nowrap hide-scrollbar">
              <button
                onClick={() => setSubFilter('all')}
                className={`hover:text-blue-600 transition-colors ${subFilter === 'all' ? 'text-blue-600 font-black border-b-2 border-blue-600 pb-1' : ''}`}
              >
                전체보기 ({categoryProducts.length})
              </button>
              {currentSubCategories.map(subCat => (
                <button
                  key={subCat}
                  onClick={() => setSubFilter(subCat)}
                  className={`hover:text-blue-600 transition-colors ${subFilter === subCat ? 'text-blue-600 font-black border-b-2 border-blue-600 pb-1' : ''}`}
                >
                  {subCat} ({categoryProducts.filter(p => p.subCategory === subCat).length})
                </button>
              ))}
            </div>

            {/* Toolbar: Total Count & Sort Selector */}
            <div className="flex justify-between items-center text-xs text-gray-600 bg-gray-100/60 p-2.5 rounded-xs border border-gray-200">
              <div>
                상품 <strong className="text-red-600 font-bold">{filteredProducts.length}개</strong>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span onClick={() => setSortBy('recommend')} className={`cursor-pointer hover:underline ${sortBy === 'recommend' ? 'text-red-600 font-bold' : ''}`}>추천순</span>
                  <span>|</span>
                  <span onClick={() => setSortBy('popular')} className={`cursor-pointer hover:underline ${sortBy === 'popular' ? 'text-red-600 font-bold' : ''}`}>판매인기순</span>
                  <span>|</span>
                  <span onClick={() => setSortBy('low')} className={`cursor-pointer hover:underline ${sortBy === 'low' ? 'text-red-600 font-bold' : ''}`}>낮은가격순</span>
                  <span>|</span>
                  <span onClick={() => setSortBy('high')} className={`cursor-pointer hover:underline ${sortBy === 'high' ? 'text-red-600 font-bold' : ''}`}>높은가격순</span>
                </div>
              </div>
            </div>

            {/* 4-Column Product Grid matching PDF screenshots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>

        </div>
      </main>
      <CartDrawer />
      <Footer />
    </div>
  );
}
