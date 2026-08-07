import Link from 'next/link';

export default function FooterDesktop() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-4 px-6 text-[10px] font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 break-words break-keep">
        
        {/* Compact Top Row */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-white font-bold">회사소개</Link>
            <Link href="/terms" className="hover:text-white font-bold">이용약관</Link>
            <Link href="/privacy" className="hover:text-white font-bold text-blue-400">개인정보처리방침</Link>
            <Link href="/guide" className="hover:text-white font-bold">이용안내</Link>
          </div>
          <div className="flex gap-4 text-slate-300">
            <span>고객센터: <a href="tel:032-324-9529" className="font-bold text-blue-400 text-xs">032-324-9529</a></span>
            <span>기업은행: 000-000000-00-000 (더 한일트랜스 스토어)</span>
          </div>
        </div>

        {/* Compact Bottom Row */}
        <div className="flex justify-between items-end text-[9px] text-slate-500">
          <div className="space-y-1">
            <p>상호명: 더 한일트랜스 스토어 | 대표: 홍길동 | 사업자등록번호: 123-45-67890 | 통신판매업신고: 2024-서울가상-0123호</p>
            <p>주소: 서울특별시 가상구 가상로 123 | 개인정보관리책임자: 홍길동 (privacy@example.com) | 팩스: 02-123-4567</p>
          </div>
          <div className="text-right">
            <p className="mb-1">근무시간: 평일 08:30~19:00 / 점심 12:00~13:00 / 토 09:00~12:00 (일요일 휴무)</p>
            <p>Copyright © 2026 더 한일트랜스 스토어. All rights reserved.</p>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
