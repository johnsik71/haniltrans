"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import CartDrawer from '@/components/shop/CartDrawer';
import SpecFinderWidget from '@/components/shop/SpecFinderWidget';
import { Shield, Phone, ChevronRight, Zap, Briefcase, Factory, Activity, Cpu } from 'lucide-react';
import Link from 'next/link';

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

export default function Home() {
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

  // Filter tabbed items for main showcase
  const tabbedProducts = products.filter((p) => {
    if (activeTab === 'single') return p.subCategory === '삼상 단권' && p.category === 'industrial';
    if (activeTab === 'double') return p.subCategory === '삼상 복권' && p.category === 'industrial';
    if (activeTab === 'oil') return p.category === 'oil';
    if (activeTab === 'panel') return p.category === 'panel';
    if (activeTab === 'avr') return p.category === 'avr';
    return true;
  });

  const industrialProducts = products.filter((p) => p.category === 'industrial').slice(0, 5);
  const avrProducts = products.filter((p) => p.category === 'avr').slice(0, 5);
  const panelProducts = products.filter((p) => p.category === 'panel').slice(0, 10);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full relative">
        {/* 2-Column Layout (Sidebar + Main Content + Quick Wing) */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* Left Category Sidebar */}
          <Sidebar />

          {/* Center Main Content Area */}
          <div className="flex-1 min-w-0 space-y-8">

            
            {/* Main Hero Slider Banner */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg border border-slate-800 h-[260px] md:h-[220px]">
              {BANNERS.map((banner, idx) => {
                return (
                  <div 
                    key={idx}
                    className={`absolute inset-0 p-8 w-full h-full bg-gradient-to-r ${banner.bg} transition-opacity duration-1000 ease-in-out ${idx === currentBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                    {/* Background Silhouette Image */}
                    <div className="absolute right-[-20px] md:right-[60px] top-1/2 -translate-y-1/2 opacity-80 pointer-events-none mix-blend-screen">
                      <img 
                        src={banner.image} 
                        alt="Transformer Background" 
                        className="w-72 h-72 md:w-[28rem] md:h-[28rem] object-cover grayscale transition-transform duration-[8000ms] ease-out scale-110" 
                        style={{ maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)', WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)' }}
                      />
                    </div>

                    <div className="max-w-xl space-y-3 relative z-20 h-full flex flex-col justify-center">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white font-bold text-xs rounded-full shadow-md">
                          <Shield className="w-3.5 h-3.5" /> {banner.badge}
                        </span>
                      </div>
                      <h2 className="text-3xl font-black leading-tight text-white drop-shadow-md">
                        {banner.title}<br />
                        <span className="text-blue-400">{banner.subtitle}</span>
                      </h2>
                      <p className="text-xs text-slate-300 line-clamp-2 max-w-[400px]">
                        {banner.desc}
                      </p>
                      <div className="pt-2">
                        <Link href={banner.link} className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg transition-colors">
                          추천 상품 보러가기 ➔
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Dots indicator */}
              <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-30">
                {BANNERS.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentBannerIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentBannerIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>
            </div>

            {/* 3 Sub-Banners matching screenshot */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold">
              <a href="tel:010-5424-7571" className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-3 hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-gray-500 text-[10px]">변압기 견적문의 / 기술상담</div>
                  <div className="text-base font-black text-gray-900 group-hover:text-blue-600">010.5424.7571</div>
                  <div className="text-[10px] text-blue-600">johnshin7172@gmail.com</div>
                </div>
              </a>

              <Link href="/request" className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-3 hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-gray-900 font-bold text-sm group-hover:text-emerald-600">제작 의뢰서 작성</div>
                  <div className="text-[11px] text-gray-500 font-normal">판넬용 맞춤 트랜스 견적/제작</div>
                </div>
              </Link>

              <Link href="/cases" className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-3 hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-gray-900 font-bold text-sm group-hover:text-amber-600">납품사례 / 고객사</div>
                  <div className="text-[11px] text-gray-500 font-normal">연구기관, 관공서, 대학교, 병원 검증</div>
                </div>
              </Link>
            </div>

            {/* Section 1: 삼상 공업용변압기 Carousel Header */}
            <section className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-4 bg-blue-600 rounded-xs"></span>
                  삼상 공업용변압기 추천 라인업
                </h3>
                <Link href="/category/industrial" className="text-xs text-gray-500 hover:text-blue-600 font-bold flex items-center">
                  전체보기 <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {industrialProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>

            {/* Section 2: Tabbed Showcase Section matching PDF page 5 */}
            <section className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-1 border-b border-gray-300">
                {[
                  { id: 'single', label: '삼상단권변압기' },
                  { id: 'double', label: '삼상복권변압기' },
                  { id: 'oil', label: '유입식변압기' },
                  { id: 'panel', label: '판넬용트랜스' },
                  { id: 'avr', label: 'AVR 자동전압조정기' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-5 py-2.5 text-xs font-bold transition-all border-b-2 -mb-[2px] ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 bg-blue-50/50 font-black'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
                {tabbedProducts.slice(0, 10).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>

            {/* Section 3: AVR 자동전압조정기 Grid */}
            <section className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-4 bg-amber-500 rounded-xs"></span>
                  AVR 자동전압조정기
                </h3>
                <Link href="/category/avr" className="text-xs text-gray-500 hover:text-blue-600 font-bold flex items-center">
                  전체보기 <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {avrProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>

            {/* Section 4: 판넬용 트랜스 Grid */}
            <section className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-4 bg-emerald-600 rounded-xs"></span>
                  판넬용 트랜스
                </h3>
                <Link href="/category/panel" className="text-xs text-gray-500 hover:text-blue-600 font-bold flex items-center">
                  전체보기 <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {panelProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>

          </div>



        </div>
      </main>

      {/* Floating Helpers */}
      <CartDrawer />

      <Footer />
    </div>
  );
}
