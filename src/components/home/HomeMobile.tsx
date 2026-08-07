"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Zap, Briefcase, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import SpecFinderWidget from '@/components/shop/SpecFinderWidget';

const BANNERS = [
  {
    image: '/images/banner1.jpg',
    title: '안전한 공업용 다운트랜스',
    subtitle: '최대 100KVA 용량',
    desc: '공장, 건설 현장에서 검증된 강력한 내구성과 안정성',
    link: '/category/industrial'
  },
  {
    image: '/images/banner2.jpg',
    title: '프리미엄 가정용 변압기',
    subtitle: '소음제로 무소음',
    desc: '해외직구 가전제품을 고장 없이 안전하게 사용하세요',
    link: '/category/home'
  },
  {
    image: '/images/banner3.jpg',
    title: '정밀 AVR 자동전압조정기',
    subtitle: '1% 정밀도 보장',
    desc: '의료기기, 연구장비 등 민감한 장비의 필수품',
    link: '/category/avr'
  }
];

export default function HomeMobile() {
  const [activeTab, setActiveTab] = useState<'single' | 'double' | 'oil' | 'panel' | 'avr'>('single');
  const [products, setProducts] = useState<any[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(console.error);
  }, []);

  const downProducts = products.filter(p => p.category === 'down').slice(0, 4);
  const industrialProducts = products.filter(p => p.category === 'industrial').slice(0, 4);
  const avrProducts = products.filter(p => p.category === 'avr').slice(0, 4);
  
  const tabbedProducts = products.filter((p) => {
    if (activeTab === 'single') return p.subCategory === '삼상 단권' && p.category === 'industrial';
    if (activeTab === 'double') return p.subCategory === '삼상 복권' && p.category === 'industrial';
    if (activeTab === 'oil') return p.category === 'oil';
    if (activeTab === 'panel') return p.category === 'panel';
    if (activeTab === 'avr') return p.category === 'avr';
    return true;
  });

  return (
    <div className="w-full bg-gray-50 pb-8">
      {/* 1. Hero Swipeable Banner */}
      <div className="relative w-full h-[280px] bg-slate-900 overflow-hidden">
        {BANNERS.map((banner, idx) => (
          <div
            key={idx}
            className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
            style={{
              opacity: idx === currentBannerIndex ? 1 : 0,
              zIndex: idx === currentBannerIndex ? 10 : 0,
              backgroundImage: `url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent" />
            <div className="absolute bottom-8 left-4 right-4 text-white">
              <span className="inline-block px-2 py-1 bg-blue-600 rounded text-[10px] font-bold mb-2">기획전</span>
              <h2 className="text-2xl font-black leading-tight mb-1">
                {banner.title}
              </h2>
              <p className="text-blue-300 font-bold text-sm mb-2">{banner.subtitle}</p>
              <p className="text-xs text-slate-300 line-clamp-1 mb-4">{banner.desc}</p>
              <Link href={banner.link} className="inline-block w-full text-center bg-white text-slate-900 font-bold text-sm py-3 rounded-xl shadow-lg">
                자세히 보기
              </Link>
            </div>
          </div>
        ))}
        {/* Dots */}
        <div className="absolute bottom-3 left-0 w-full flex justify-center gap-2 z-20">
          {BANNERS.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentBannerIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentBannerIndex ? 'bg-white w-4' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-6">
        
        {/* 2. Quick Action Buttons (Modern Grid) */}
        <div className="grid grid-cols-3 gap-3">
          <a href="tel:010-5424-7571" className="flex flex-col items-center justify-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 gap-2">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-gray-700 text-center">전화 상담<br/>010.5424.7571</span>
          </a>
          <Link href="/request" className="flex flex-col items-center justify-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 gap-2">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-gray-700 text-center">주문제작<br/>특수사양</span>
          </Link>
          <Link href="/b2b" className="flex flex-col items-center justify-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 gap-2">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-gray-700 text-center">B2B 대량<br/>할인견적</span>
          </Link>
        </div>

        {/* 3. Spec Finder (Important for mobile) */}
        <SpecFinderWidget />

        {/* 4. Horizontal Scroll Section - 단상 다운트랜스 */}
        <section className="pt-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-black text-gray-900">단상 다운트랜스 베스트</h3>
            <Link href="/category/down" className="text-xs font-bold text-blue-600 flex items-center">
              더보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex overflow-x-auto snap-x hide-scrollbar gap-4 pb-4 -mx-4 px-4">
            {downProducts.map((p) => (
              <div key={p.id} className="min-w-[160px] max-w-[160px] snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>

        {/* 5. Horizontal Scroll Section - AVR */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-black text-gray-900">정밀 AVR 자동전압조정기</h3>
            <Link href="/category/avr" className="text-xs font-bold text-blue-600 flex items-center">
              더보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex overflow-x-auto snap-x hide-scrollbar gap-4 pb-4 -mx-4 px-4">
            {avrProducts.map((p) => (
              <div key={p.id} className="min-w-[160px] max-w-[160px] snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>

        {/* 6. Mobile Tabbed Products (Grid) */}
        <section className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 -mx-2">
          <h3 className="text-lg font-black text-gray-900 mb-3 text-center">카테고리별 추천상품</h3>
          <div className="flex overflow-x-auto hide-scrollbar whitespace-nowrap gap-2 mb-4 pb-1">
            {[
              { id: 'single', label: '단권변압기' },
              { id: 'double', label: '복권변압기' },
              { id: 'oil', label: '유입식' },
              { id: 'panel', label: '판넬용' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-[13px] font-bold rounded-full transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {tabbedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <button className="w-full mt-4 py-3 bg-gray-100 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-200">
            {tabbedProducts.length}개 상품 전체보기
          </button>
        </section>

      </div>
    </div>
  );
}
