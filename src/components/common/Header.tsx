import Link from 'next/link';
import { Zap, Phone, ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white block">HANIL TRANSLAB</span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block">한일트랜스솔루션 전력기술연구소</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-300">
            <Link href="#wizard" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              자동 변압기 선정
            </Link>
            <Link href="#lineup" className="hover:text-blue-400 transition-colors">9대 모델 라인업</Link>
            <Link href="#consult" className="hover:text-blue-400 transition-colors">B2B 기술 견적</Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:010-5424-7571" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-300 hover:border-slate-700 transition-colors">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>010-5424-7571</span>
            </a>
            <a href="#wizard" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-lg shadow-md shadow-blue-600/20 transition-all">
              1:1 기술상담
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
