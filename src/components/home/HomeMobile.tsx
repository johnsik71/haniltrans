"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Zap, Briefcase, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import SpecFinderWidget from '@/components/shop/SpecFinderWidget';

const BANNERS = [
  {
    badge: 'KC 안전인증번호 HA06019-12003A',
    title: 'AVR 자동 전압 조절기',
    subtitle: '100% 국내 수작업 제조 정품',
    desc: '산업 현장에서 검증된 최고의 정전압 보정 기술. 불안정한 전압을 ±1% 이내로 실시간 자동 조절합니다.',
    link: '/category/avr',
    bg: 'from-slate-900 via-blue-950 to-slate-900',
    image: '/images/banner_avr.jpg'
  },
  {
    badge: 'KC 안전인증번호 HA06019-12003A',
    title: '삼상 공업용 변압기',
    subtitle: '완벽한 내구성과 안정성',
    desc: '공장, 건설현장 등 거친 산업 환경에서도 완벽한 성능을 발휘하는 1등급 공업용 특수 변압기 라인업.',
    link: '/category/industrial',
    bg: 'from-slate-900 via-indigo-950 to-slate-900',
    image: '/images/banner_industrial.jpg'
  },
  {
    badge: 'KC 안전인증번호 HA06019-12003A',
    title: '판넬용 트랜스',
    subtitle: '원하는 사양 그대로 제작',
    desc: '제어반, 배전반 내부에 장착되는 맞춤형 판넬 트랜스. 1대부터 대량까지 완벽하게 맞춤 설계해 드립니다.',
    link: '/request',
    bg: 'from-slate-900 via-emerald-950 to-slate-900',
    image: '/images/banner_panel.jpg'
  },
  {
    badge: 'KC 안전인증번호 HA06019-12003A',
    title: '유입식 변압기',
    subtitle: '최고의 절연 및 냉각 성능',
    desc: '대용량 전력 수급 및 옥외/옥내 거친 환경에서도 안정적으로 전력을 공급하는 고효율 유입식 변압기.',
    link: '/category/oil',
    bg: 'from-slate-900 via-amber-950 to-slate-900',
    image: '/images/banner_oil.jpg'
  },
  {
    badge: 'KC 안전인증번호 HA06019-12003A',
    title: '슬라이닥스 (전압조정기)',
    subtitle: '정밀한 전압 세팅 완벽 지원',
    desc: '실험실, 연구소, 학교 등 정밀하고 미세한 전압 제어가 필요한 곳을 위한 슬라이닥스(Slidacs) 전압 조정기.',
    link: '/category/slidacs',
    bg: 'from-slate-900 via-purple-950 to-slate-900',
    image: '/images/banner_slidacs.jpg'
  },
  {
    badge: 'KC 안전인증번호 HA06019-12003A',
    title: '고성능 인버터 (Inverter)',
    subtitle: '안정적인 정현파 전원 공급',
    desc: '자동차, 캠핑카, 선박 및 각종 산업 현장에서 배터리(DC)를 교류(AC)로 변환해주는 DARDA 고성능 인버터.',
    link: '/category/inverter',
    bg: 'from-slate-900 via-teal-950 to-slate-900',
    image: '/images/banner_inverter.jpg'
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

  const homeProducts = products.filter(p => p.category === 'home').slice(0, 4);
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

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
    } else if (isRightSwipe) {
      setCurrentBannerIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    }
  };

  return (
    <div className="w-full bg-gray-50 pb-8">
      {/* 1. Hero Swipeable Banner */}
      <div 
        className="relative w-full h-[280px] bg-slate-900 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-4 right-4 text-white">
              <span className="inline-block px-2 py-1 bg-blue-600 rounded text-[10px] font-bold mb-2">{banner.badge || '기획전'}</span>
              <h2 className="text-2xl font-black leading-tight mb-1">
                {banner.title}
              </h2>
              <p className="text-blue-300 font-bold text-sm mb-2">{banner.subtitle}</p>
              <p className="text-xs text-slate-300 line-clamp-1 mb-4">{banner.desc}</p>
              <Link href={banner.link} className="inline-block w-full text-center bg-white text-slate-900 font-bold text-sm py-3 rounded-xl shadow-lg relative z-20">
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
          <Link href="/qna" className="flex flex-col items-center justify-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 gap-2">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-gray-700 text-center">B2B 대량<br/>할인견적</span>
          </Link>
        </div>

        {/* 3. Spec Finder (Important for mobile) */}
        <SpecFinderWidget />

        {/* 4. Mobile Tabbed Products (Grid - Industrial) */}
        <section className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 -mx-2 mt-2">
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

        {/* 5. Horizontal Scroll Section - AVR */}
        <section className="pt-2">
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

        {/* 6. Horizontal Scroll Section - 단상 다운트랜스 (가정용) */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-black text-gray-900">단상 다운트랜스 베스트</h3>
            <Link href="/category/home" className="text-xs font-bold text-blue-600 flex items-center">
              더보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex overflow-x-auto snap-x hide-scrollbar gap-4 pb-4 -mx-4 px-4">
            {homeProducts.map((p) => (
              <div key={p.id} className="min-w-[160px] max-w-[160px] snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
