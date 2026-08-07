"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FooterMobile() {
  const [isCompanyInfoOpen, setIsCompanyInfoOpen] = useState(false);

  return (
    <footer className="w-full bg-slate-900 text-slate-400 font-sans pb-6">
      {/* Mobile Footer Links */}
      <div className="flex border-b border-slate-800">
        <Link href="/about" className="flex-1 text-center py-2 text-xs font-bold hover:text-white transition-colors border-r border-slate-800">
          회사소개
        </Link>
        <Link href="/guide" className="flex-1 text-center py-2 text-xs font-bold hover:text-white transition-colors border-r border-slate-800">
          이용안내
        </Link>
        <Link href="/privacy" className="flex-1 text-center py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors border-r border-slate-800">
          개인정보방침
        </Link>
        <Link href="/terms" className="flex-1 text-center py-2 text-xs font-bold hover:text-white transition-colors">
          이용약관
        </Link>
      </div>

      <div className="p-4 space-y-4">
        {/* Customer Center */}
        <div>
          <h4 className="font-extrabold text-xs text-white mb-2 uppercase">고객센터</h4>
          <p className="text-2xl font-black text-blue-400 mb-2">032-324-9529</p>
          <div className="text-[11px] space-y-1 text-slate-500">
            <p>평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)</p>
            <p>토/일/공휴일 휴무</p>
          </div>
          <div className="flex gap-2 mt-4">
            <a href="tel:032-324-9529" className="flex-1 text-center py-2 bg-slate-800 text-white rounded-lg text-xs font-bold">전화걸기</a>
            <Link href="/qna" className="flex-1 text-center py-2 bg-slate-800 text-white rounded-lg text-xs font-bold">1:1 문의</Link>
          </div>
        </div>

        {/* Accordion Company Info */}
        <div className="border-t border-slate-800 pt-6">
          <button 
            onClick={() => setIsCompanyInfoOpen(!isCompanyInfoOpen)}
            className="w-full flex items-center justify-between text-xs font-bold text-white mb-2"
          >
            주식회사 한일트랜스샵 사업자 정보
            {isCompanyInfoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {isCompanyInfoOpen && (
            <div className="text-[11px] leading-relaxed text-slate-500 space-y-1 mt-3">
              <p>대표 : 신종철</p>
              <p>주소 : 경기도 부천시 부흥로 315 번길 38</p>
              <p>사업자등록번호 : 121-12-87879</p>
              <p>통신판매업신고 : 2021-경기부천-2423호</p>
              <p>개인정보관리책임자 : 신종철 (johnshin7172@gmail.com)</p>
              <p className="mt-4">
                이용자가 안심하고 쇼핑할 수 있도록 KG 이니시스의<br/>
                에스크로 서비스에 가입하여 결제대금예치 제도를 이용하고 있습니다.
              </p>
            </div>
          )}
        </div>

        <div className="text-[10px] text-slate-600 pt-4 border-t border-slate-800">
          Copyright © 주식회사 한일트랜스몰 All rights reserved.
        </div>
      </div>
    </footer>
  );
}
