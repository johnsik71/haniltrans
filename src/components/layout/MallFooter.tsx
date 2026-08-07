import { Phone, ShieldCheck, Truck, Clock } from 'lucide-react';

export default function MallFooter() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 text-xs w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full">
        
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-slate-800 pb-8 text-slate-200">
          <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <Truck className="w-8 h-8 text-blue-400" />
            <div>
              <div className="font-bold text-sm text-white">당일 안전 배송</div>
              <div className="text-[11px] text-slate-400">오후 4시 전 결제 시 당일 출하</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <div>
              <div className="font-bold text-sm text-white">100% 정품 보장</div>
              <div className="text-[11px] text-slate-400">무산소 동선 규격 공식 인증</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <Clock className="w-8 h-8 text-amber-400" />
            <div>
              <div className="font-bold text-sm text-white">1년 무상 A/S</div>
              <div className="text-[11px] text-slate-400">한일 직영 기술지원센터</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <Phone className="w-8 h-8 text-orange-400" />
            <div>
              <div className="font-bold text-sm text-white">전화 주문 가능</div>
              <div className="text-[11px] text-slate-400">010-5424-7571 (상담전화)</div>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-sm text-white mb-2">주식회사 한일트랜스샵</h4>
            <p className="leading-relaxed text-slate-400">
              대표이사: 한일트랜스 | 사업자등록번호: 000-00-00000<br />
              통신판매업신고: 202X-[지역]-0000호<br />
              주소: 서울특별시 금천구 가산디지털2로 123 (한일 빌딩)
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white mb-2">고객만족센터</h4>
            <p className="text-xl font-black text-blue-400 mb-1">010-5424-7571</p>
            <p className="leading-relaxed text-slate-400">
              평일: 08:30 ~ 18:00 (점심시간 12:00 ~ 13:00)<br />
              토/일/공휴일 휴무 (카카오톡 24h 접수)
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white mb-2">결제 및 입금계좌</h4>
            <p className="leading-relaxed text-slate-400">
              기업은행: 000-000000-00-000<br />
              예금주: 주식회사 한일트랜스샵<br />
              신용카드, 계좌이체, 무통장입금, 세금계산서 발급
            </p>
          </div>
        </div>

        <div className="border-t border-slate-950 pt-6 text-center text-slate-500">
          Copyright © 2026 주식회사 한일트랜스샵 All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
