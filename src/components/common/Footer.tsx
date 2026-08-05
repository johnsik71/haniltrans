export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-black text-lg mb-2">주식회사 한일트랜스솔루션</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              30년 전통의 전력 인프라 전문 기술 기업.<br />
              공업용, 유입식, AVR, 슬라이닥스, 특수 위상변환기 설계 및 제조.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">고객지원센터</h4>
            <p className="text-2xl font-black text-blue-400 mb-1">010-5424-7571</p>
            <p className="text-xs text-slate-500">평일 08:30 - 18:00 (토/일/공휴일 휴무)</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">본사 및 제조공장</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              서울특별시 금천구 가산디지털2로 123<br />
              사업자등록번호: 000-00-00000 | 대표이사: 한일트랜스
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">품질 및 인증</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              ISO9001 품질경영시스템 인증<br />
              CE 유럽 안전 인증 / KTR 시험성적서
            </p>
          </div>
        </div>
        <div className="border-t border-slate-900 pt-6 text-center text-xs text-slate-600">
          © 2026 Hanil TransLab (한일트랜스솔루션). All rights reserved.
        </div>
      </div>
    </footer>
  );
}
