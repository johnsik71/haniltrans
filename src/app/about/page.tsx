import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Zap, ShieldCheck, Settings, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Header />

      {/* Mobile responsive fix: container padding and gap adjustments */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 w-full flex flex-col md:flex-row gap-4 md:gap-8">
        <Sidebar />

        {/* Mobile responsive fix: content box padding p-10 -> p-6 md:p-10 */}
        <div className="flex-1 min-w-0 bg-white border border-gray-200 p-6 md:p-10 rounded-2xl shadow-sm">
          {/* Breadcrumb */}
          <div className="text-[11px] text-gray-500 flex items-center gap-1 border-b border-gray-200 pb-3 mb-8">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>&gt;</span>
            <span className="font-bold text-gray-800">회사소개</span>
          </div>

          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Hero Section */}
            <div className="text-center space-y-6 pt-4">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-600/30">
                <Zap className="w-8 h-8 fill-current" />
              </div>
              <div>
                {/* Mobile responsive fix: text-3xl -> text-2xl md:text-4xl */}
                <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                  대한민국 변압기 기술의 표준,<br />
                  <span className="text-blue-600">더 한일트랜스 스토어</span>
                </h1>
                <p className="mt-4 text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto font-medium">
                  단순한 유통을 넘어, 산업 현장과 가정의 안전을 책임지는<br/>고품질 전력 솔루션 전문 기업입니다.
                </p>
              </div>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center space-y-3 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-black text-gray-900 text-lg">무결점 안전 제일주의</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  엄격한 품질 관리(QC) 절차를 통과한 100% 검증된 정품 변압기만을 공급하여 화재 및 누전의 위험을 원천 차단합니다.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center space-y-3 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mx-auto">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="font-black text-gray-900 text-lg">맞춤형 엔지니어링</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  공업용 삼상 변압기부터 복잡한 판넬용 특수 트랜스까지, 고객의 현장 사양에 정확히 맞춘 커스텀 주문제작을 지원합니다.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center space-y-3 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-black text-gray-900 text-lg">B2B & B2C 통합 솔루션</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  산업 단지의 대량 납품부터 해외 직구족을 위한 가정용 소형 변압기까지, 모든 고객층에 최적화된 라인업을 구축했습니다.
                </p>
              </div>
            </div>

            {/* CEO Message */}
            <div className="border-t border-gray-200 pt-16">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-sm"></span>
                전문성이 차이를 만듭니다
              </h2>
              <div className="prose prose-sm md:prose-base text-gray-600 leading-loose max-w-none">
                <p>
                  안녕하십니까, <strong>더 한일트랜스 스토어</strong>를 찾아주신 고객 여러분 진심으로 환영합니다.
                </p>
                <p>
                  전기는 현대 사회의 심장이지만, 작은 전압의 불일치나 불안정한 파형은 고가의 장비를 망가뜨리거나 안전 사고로 이어질 수 있습니다. 
                  그렇기에 변압기는 단순한 전자 부품이 아니라 <strong>'안전을 담보하는 핵심 인프라'</strong>여야 합니다.
                </p>
                <p>
                  저희 더 한일트랜스 스토어는 검증되지 않은 저가형 제품을 무분별하게 유통하는 것을 철저히 배제합니다. 
                  대신, 산업 현장의 가혹한 환경에서도 견딜 수 있는 <strong>최상급 코일과 코어</strong>가 적용된 제품, 
                  그리고 <strong>철저한 발열 제어 및 소음 방지 기술</strong>이 탑재된 프리미엄 변압기만을 고집합니다.
                </p>
                <p>
                  공장 자동화 라인에 들어가는 AVR 및 슬라이닥스부터, 가정 내 수입 가전제품을 위한 다운트랜스까지. 
                  어떤 용량이든, 어떤 전압 조건이든 더 한일트랜스 스토어의 전문 엔지니어링 팀이 가장 완벽하고 안전한 솔루션을 제안해 드리겠습니다.
                </p>
                <p className="font-bold text-gray-900 text-lg mt-8">
                  타협하지 않는 품질, 그것이 더 한일트랜스 스토어의 약속입니다.
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl space-y-3 mt-16 shadow-xl">
              <div className="font-black text-xl text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400 fill-current" />
                더 한일트랜스 스토어 본사 정보
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><strong className="text-slate-400">대표전화 :</strong> <a href="tel:032-324-9529" className="text-white hover:text-blue-400">032-324-9529</a></div>
                <div><strong className="text-slate-400">팩스번호 :</strong> 0504-001-7571</div>
                <div><strong className="text-slate-400">이메일 :</strong> <a href="mailto:johnshin7172@gmail.com" className="text-white hover:text-blue-400 transition-colors">johnshin7172@gmail.com</a></div>
                <div><strong className="text-slate-400">사업장 주소 :</strong> [추후 사업장 주소 기재 예정]</div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
