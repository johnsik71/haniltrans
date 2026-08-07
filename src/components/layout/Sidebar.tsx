import Link from 'next/link';
import { Phone, CreditCard, Clock, ShieldCheck, ChevronRight, Zap } from 'lucide-react';
import { CATEGORIES_SIDEBAR } from '@/data/products';
import SpecFinderWidget from '@/components/shop/SpecFinderWidget';

export default function Sidebar({ activeCatId }: { activeCatId?: string }) {
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 gap-5 font-sans">
      {/* Category Menu Box */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="bg-slate-900 text-white font-extrabold text-xs px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <span>전체 상품 카테고리</span>
          <span className="text-[10px] text-blue-400 font-bold">12개 라인업</span>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {CATEGORIES_SIDEBAR.map((cat) => {
            const isActive = activeCatId === cat.id;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className={`flex items-center justify-between px-4 py-2.5 font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span>• {cat.name}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* CS Center & Bank Box matching screenshot structure */}
      <div className="bg-white border border-gray-200 p-5 rounded-2xl text-xs space-y-4 text-gray-600 shadow-xs">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
          <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="font-black text-gray-900 text-base"><a href="tel:032-324-9529" className="hover:text-blue-600 transition-colors">032-324-9529</a></div>
            <div className="text-[10px] text-gray-400">Fax: 0504-001-7571</div>
          </div>
        </div>

        <div className="text-[11px] leading-relaxed space-y-1 text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>평일: am 08:30 ~ pm 07:00</span>
          </div>
          <div>점심: am 12:00 ~ pm 01:00</div>
          <div>토요일: am 09:00 ~ pm 12:00</div>
        </div>

        <div className="border-t border-gray-100 pt-3 space-y-1.5">
          <div className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-blue-600" /> 무통장 입금 계좌
          </div>
          <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-[11px] text-gray-700 leading-normal">
            기업은행<br />
            <strong className="text-blue-900 font-black text-xs">000-000000-00-000</strong><br />
            예금주: 주식회사 한일트랜스샵
          </div>
        </div>
      </div>

      {/* 긴급문의 CS Box matching screenshot structure */}
      <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 border border-yellow-400 p-5 rounded-2xl text-center space-y-2 shadow-md hover:shadow-lg transition-shadow">
        <div className="inline-flex items-center gap-1.5 text-yellow-900 font-extrabold text-xs bg-white/40 px-2.5 py-0.5 rounded-full mb-1">
          <Phone className="w-3.5 h-3.5 text-yellow-800" /> 긴급 문의 핫라인
        </div>
        <div className="flex flex-col items-center justify-center">
          <a href="tel:010-5424-7571" className="text-2xl font-black text-gray-900 tracking-tight hover:text-black transition-colors block drop-shadow-sm whitespace-nowrap">
            010-5424-7571
          </a>
        </div>
        <div className="text-[11px] text-yellow-900 font-bold">
          (am 08:00 ~ pm 24:00 연중무휴)
        </div>
      </div>

      {/* 간편 용량 계산기 */}
      <SpecFinderWidget />

      {/* Animated Vertical Ad Banner (GIF-like) */}
      <div className="flex-1 flex flex-col min-h-[450px]">
        <Link href="/qna" className="block w-full flex-1 relative rounded-2xl overflow-hidden group shadow-md border border-gray-200 bg-slate-900">
          {/* Animated Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-purple-700 to-slate-900 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Decorative Animated Shapes */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-500/30 blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 left-0 -ml-8 w-24 h-24 rounded-full bg-purple-500/30 blur-xl animate-pulse delay-75"></div>

          {/* Ad Content - Sticky inside the stretched banner */}
          <div className="sticky top-24 w-full h-[450px] flex flex-col items-center justify-center text-center p-5 z-10">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Zap className="w-10 h-10 text-yellow-300 fill-current" />
            </div>
            
            <div className="space-y-2 mb-8">
              <span className="inline-block bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-bounce">
                HOT EVENT
              </span>
              <h4 className="text-white font-black text-2xl tracking-tighter leading-tight drop-shadow-md">
                B2B 대량구매<br/>특별 할인전
              </h4>
              <p className="text-blue-200 font-bold text-[11px] drop-shadow-sm pt-2">
                맞춤형 특수사양 변압기<br/>공장직영 최저가 견적
              </p>
            </div>
            
            <div className="w-full bg-white text-blue-900 font-black text-sm py-3.5 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 group-hover:bg-blue-50 transition-colors">
              견적 문의하기 <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          
          {/* Scanline overlay for retro/GIF feel */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
        </Link>
      </div>
    </aside>
  );
}
