import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FooterMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="w-full bg-gray-50 text-gray-500 font-sans pb-4">
      {/* Super Compact Links */}
      <div className="flex border-b border-gray-200 text-[10px] font-bold">
        <Link href="/about" className="flex-1 text-center py-2 border-r border-gray-200 hover:text-gray-900">회사소개</Link>
        <Link href="/guide" className="flex-1 text-center py-2 border-r border-gray-200 hover:text-gray-900">이용안내</Link>
        <Link href="/privacy" className="flex-1 text-center py-2 border-r border-gray-200 text-gray-700 hover:text-gray-900">개인정보방침</Link>
        <Link href="/terms" className="flex-1 text-center py-2 hover:text-gray-900">이용약관</Link>
      </div>

      <div className="px-4 py-3 space-y-3">
        {/* Compact CS */}
        <div className="flex justify-between items-center">
          <div>
            <span className="font-extrabold text-[10px] text-gray-900 mr-2">고객센터</span>
            <a href="tel:032-324-9529" className="text-sm font-black text-blue-600">032-324-9529</a>
          </div>
          <Link href="/qna" className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded text-[10px] font-bold shadow-sm">1:1 문의</Link>
        </div>

        {/* Compact Accordion */}
        <div className="border-t border-gray-200 pt-3">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between text-[10px] font-bold text-gray-700 hover:text-gray-900"
          >
            사업자정보
            {isOpen ? <ChevronUp className="w-3 h-3 text-gray-500" /> : <ChevronDown className="w-3 h-3 text-gray-500" />}
          </button>
          
          {isOpen && (
            <div className="text-[9px] text-gray-500 mt-2 space-y-0.5">
              <p>상호명: 더 한일트랜스 스토어 | 대표: 홍길동</p>
              <p>주소: 서울특별시 가상구 가상로 123</p>
              <p>사업자등록번호: 123-45-67890 | 통신판매업: 2024-서울가상-0123호</p>
              <p>개인정보관리책임자: 홍길동 (privacy@example.com)</p>
            </div>
          )}
        </div>

        <div className="text-[9px] text-gray-400 text-center pt-2">
          Copyright © 2026 더 한일트랜스 스토어 All rights reserved.
        </div>
      </div>
    </footer>
  );
}
