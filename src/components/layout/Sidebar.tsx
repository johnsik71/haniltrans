import Link from 'next/link';
import { Phone, CreditCard, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { CATEGORIES_SIDEBAR } from '@/data/products';
import SpecFinderWidget from '@/components/shop/SpecFinderWidget';

export default function Sidebar({ activeCatId }: { activeCatId?: string }) {
  return (
    <aside className="hidden md:block w-60 shrink-0 space-y-5 font-sans">
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
          <Link
              href="/cases"
              className="flex items-center justify-between px-4 py-3 font-black transition-all text-blue-700 bg-blue-50 border-t border-blue-100 hover:bg-blue-100"
            >
              <span>💼 주요 납품사례 / 고객사</span>
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </Link>
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
    </aside>
  );
}
