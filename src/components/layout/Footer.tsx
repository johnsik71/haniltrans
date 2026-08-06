import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 4 Columns matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-slate-800 pb-8 text-slate-300">
          <div>
            <h4 className="font-extrabold text-sm text-white mb-2 uppercase tracking-wider">CS CENTER</h4>
            <p className="text-2xl font-black text-blue-400 mb-1"><a href="tel:032-324-9529" className="hover:text-blue-300 transition-colors">032-324-9529</a></p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Fax: 0504-001-7571<br />
              평일: am 8:30 ~ pm 07:00<br />
              점심: am 12:00 ~ pm 1:00<br />
              토요일: am 09:00 ~ pm 12:00
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-white mb-2 uppercase tracking-wider">BANK INFO</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              기업은행: 000-000000-00-000<br />
              예금주: 더 한일트랜스 스토어
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-white mb-2 uppercase tracking-wider">STORE GUIDE</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
              <Link href="/notice" className="bg-slate-950 p-2 rounded border border-slate-800 hover:border-slate-600 block text-center">공지사항</Link>
              <Link href="/delivery" className="bg-slate-950 p-2 rounded border border-slate-800 hover:border-slate-600 block text-center">배송조회</Link>
              <Link href="/reviews" className="bg-slate-950 p-2 rounded border border-slate-800 hover:border-slate-600 block text-center">사용후기</Link>
              <Link href="/qna" className="bg-slate-950 p-2 rounded border border-slate-800 hover:border-slate-600 block text-center">Q & A 상품문의</Link>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-white mb-2 uppercase tracking-wider">RETURN & EXCHANGE</h4>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-bold text-slate-200">택배 / 배송 안내</div>
              <div>택배사: CJ 대한통운 (1588-1255)</div>
              <div>[월~금 09:00~18:00 / 토 09:00~13:00]</div>
              <div className="text-red-400 font-bold">매주 일요일 휴무</div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-300 border-b border-slate-800 pb-4">
          <Link href="/about" className="hover:text-white">회사소개</Link>
          <span>|</span>
          <Link href="/terms" className="hover:text-white">이용약관</Link>
          <span>|</span>
          <Link href="/privacy" className="hover:text-white text-blue-400">개인정보처리방침</Link>
          <span>|</span>
          <Link href="/guide" className="hover:text-white">이용안내</Link>
          <span>|</span>
          <a href="mailto:johnshin7172@gmail.com" className="hover:text-white">광고/제휴 문의</a>
        </div>

        {/* Legal Info */}
        <div className="text-[11px] text-slate-500 leading-relaxed space-y-1">
          <p>
            상호 : 더 한일트랜스 스토어 / 대표 : [대표자명] / 사업자등록번호 : 000-00-00000 / 통신판매업신고번호 : 202X-[지역]-0000
          </p>
          <p>
            대표번호 : <a href="tel:032-324-9529" className="hover:text-blue-400">032-324-9529</a> / 팩스번호 : 0504-001-7571 / 주소 : [추후 사업장 주소 기재 예정] / 개인정보관리책임자 : (<a href="mailto:johnshin7172@gmail.com" className="hover:text-blue-400">johnshin7172@gmail.com</a>)
          </p>
        </div>

        <div className="text-[10px] text-slate-600 text-center pt-4 border-t border-slate-950">
          Copyright © 2026 더 한일트랜스 스토어. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
