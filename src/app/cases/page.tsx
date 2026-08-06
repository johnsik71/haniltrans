"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Building2, Globe2, ShieldCheck, Factory } from 'lucide-react';
import Image from 'next/image';

const CLIENTS = [
  { name: '한국전자통신연구원', type: '국책 연구기관', logo: 'E' },
  { name: '국립암센터', type: '공공 의료기관', logo: 'N' },
  { name: '서울대학교', type: '산학협력단 설비', logo: 'S' },
  { name: '한국수력원자력', type: '발전소 부대설비', logo: 'K' },
  { name: '오송첨단의료재단', type: '의료기기 지원센터', logo: 'O' },
  { name: '한국표준과학연구원', type: '정밀 측정실', logo: 'K' },
  { name: '연세대학교 세브란스', type: '임상연구센터', logo: 'Y' },
  { name: '시화공단 산업단지', type: '정밀가공 공장군', logo: 'S' },
];

const CASES = [
  {
    title: '서울대학교 공과대학 랩실',
    desc: '고정밀 연구장비용 무소음/노이즈 차단 복권형 트랜스 30kVA 납품',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    date: '2023. 11',
  },
  {
    title: '한국화학연구원 (KRICT)',
    desc: '분석기기 안정화를 위한 AVR(자동전압조정기) 50kVA 특수 제작',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    date: '2023. 09',
  },
  {
    title: '지방자치단체 정수처리장',
    desc: '모터 펌프 제어반용 삼상 380V -> 220V 강압 트랜스 100kVA 납품',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800',
    date: '2023. 05',
  },
  {
    title: '국립 대학병원 MRI/CT 촬영실',
    desc: '의료기기 전용 최고등급 절연 강압 트랜스 30kVA 5기 시공',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800',
    date: '2023. 02',
  },
];

export default function CasesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Header />
      
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">수많은 기업이 증명하는 <br className="md:hidden" /><span className="text-blue-400">품질과 신뢰</span></h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-medium">
              30년 기술력을 바탕으로 대기업, 공공기관, 해외 공장까지<br className="hidden md:block" />
              대한민국 산업 현장 곳곳에 더 한일트랜스의 기술이 함께합니다.
            </p>
          </div>
        </div>

        {/* Major Clients Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-gray-900 flex items-center justify-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" /> 주요 파트너사
            </h2>
            <p className="text-sm text-gray-500 mt-2">안정적인 전력이 필수적인 최고 수준의 산업 현장</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CLIENTS.map((client, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-4 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl font-black text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  {client.logo}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{client.name}</div>
                  <div className="text-xs text-gray-500">{client.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Cases */}
        <div className="bg-white border-t border-gray-200 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-black text-gray-900 flex items-center justify-center gap-2">
                <Factory className="w-6 h-6 text-blue-600" /> 주요 납품 및 시공 사례
              </h2>
              <p className="text-sm text-gray-500 mt-2">용도와 규격에 맞춘 커스텀 주문제작 및 대량 납품</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CASES.map((item, idx) => (
                <div key={idx} className="group rounded-3xl overflow-hidden border border-gray-100 shadow-xs bg-gray-50 flex flex-col sm:flex-row hover:shadow-lg transition-all">
                  <div className="w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {item.date}
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center flex-1">
                    <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-6 py-4 rounded-2xl font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                대량 구매 및 특수 사양(전압/용량) 맞춤 제작 문의: <a href="tel:032-324-9529" className="underline underline-offset-4 font-black">032-324-9529</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
