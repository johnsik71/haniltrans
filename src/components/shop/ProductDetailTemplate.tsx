import { Product } from '@/types/mall';
import { ShieldCheck, Target, Zap, Clock, Award, CheckCircle2 } from 'lucide-react';

export default function ProductDetailTemplate({ product }: { product: Product | any }) {
  return (
    <div className="w-full flex flex-col font-sans text-gray-800 bg-white rounded-b-2xl overflow-hidden shadow-sm">
      
      {/* 1. Main Title (Header) */}
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
        <img src="/images/detail/hero_bg.png" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 font-bold text-sm backdrop-blur-md">
            <Zap className="w-4 h-4" /> 100% 국내 자체 생산
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            완벽한 정밀 전력 제어,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">최상의 제조 솔루션</span>
          </h1>
          <p className="text-base md:text-xl text-slate-300 font-medium max-w-2xl mx-auto">
            가장 안정적인 전압 공급을 위해 설계된 한일트랜스의 검증된 기술력.<br className="hidden md:block" /> 어떤 환경에서도 완벽한 내구성을 보장합니다.
          </p>
        </div>
      </div>

      {/* 2. Company / Tech Strengths */}
      <div className="py-16 md:py-24 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">설계부터 납품까지 원스톱 솔루션</h2>
            <p className="text-gray-500 text-base md:text-lg">40년 이상의 축적된 노하우로 최고의 제품을 생산합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">초정밀 맞춤 설계</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                고객의 요구사항과 설치 환경을 분석하여 1:1 맞춤형 도면을 설계합니다. 어떠한 특수 사양도 맞춤 제작이 가능합니다.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-transparent opacity-50 rounded-bl-full"></div>
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">엄격한 품질 관리</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base relative z-10">
                각 공정별 전수 검사 및 최종 부하 테스트를 거쳐 불량률 0%에 도전하는 타협 없는 철저한 품질 관리 시스템.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">신속한 납품 및 A/S</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                자체 생산 라인 가동으로 최단 기간 납품을 실현하며, 촘촘한 전국망 A/S 시스템으로 사후 관리까지 책임집니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Image Divider / Manufacturing Tech */}
      <div className="w-full h-[300px] md:h-[400px] relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-900">
           <img src="/images/detail/tech_bg.png" alt="Technology" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl text-white">
           <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 leading-tight">세계 최고 수준의 권선 기술력과<br/>첨단 진공 함침 공법</h2>
           <p className="text-gray-300 text-base md:text-lg leading-relaxed">
             소음과 발열을 극소화하고 효율을 극대화하는 한일트랜스만의<br className="hidden md:block"/> 핵심 특허 기술이 모든 제품에 적용되어 있습니다.
           </p>
        </div>
      </div>

      {/* 4. Features & Specifications */}
      <div className="py-16 md:py-24 px-4 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">제품 상세 사양 (Specifications)</h2>
            <p className="text-gray-500 text-base md:text-lg">탁월한 수치로 증명되는 압도적인 성능</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse text-sm md:text-base">
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <th className="py-4 md:py-5 px-4 md:px-6 bg-gray-50 text-gray-700 font-bold w-[40%] md:w-1/3 border-r border-gray-100">제품명 (Model)</th>
                  <td className="py-4 md:py-5 px-4 md:px-6 text-gray-900 font-bold">{product?.name || '상세 모델명'}</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <th className="py-4 md:py-5 px-4 md:px-6 bg-gray-50 text-gray-700 font-bold border-r border-gray-100">정격 용량 (Capacity)</th>
                  <td className="py-4 md:py-5 px-4 md:px-6 text-gray-900 font-bold">{product?.capacity || '상세설명 참조'}</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <th className="py-4 md:py-5 px-4 md:px-6 bg-gray-50 text-gray-700 font-bold border-r border-gray-100">입력 전압 (Input)</th>
                  <td className="py-4 md:py-5 px-4 md:px-6 text-gray-900 font-bold text-blue-600">{product?.inputVoltage || '220V'}</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <th className="py-4 md:py-5 px-4 md:px-6 bg-gray-50 text-gray-700 font-bold border-r border-gray-100">출력 전압 (Output)</th>
                  <td className="py-4 md:py-5 px-4 md:px-6 text-gray-900 font-bold text-emerald-600">{product?.outputVoltage || '110V'}</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <th className="py-4 md:py-5 px-4 md:px-6 bg-gray-50 text-gray-700 font-bold border-r border-gray-100">전압 변동률</th>
                  <td className="py-4 md:py-5 px-4 md:px-6 text-gray-600">±1.5% 이내 (최고 등급 정밀도)</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <th className="py-4 md:py-5 px-4 md:px-6 bg-gray-50 text-gray-700 font-bold border-r border-gray-100">절연 계급 / 냉각 방식</th>
                  <td className="py-4 md:py-5 px-4 md:px-6 text-gray-600">F종 (155℃) / 건식 자냉식</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="py-4 md:py-5 px-4 md:px-6 bg-gray-50 text-gray-700 font-bold border-r border-gray-100 align-top">주요 특장점</th>
                  <td className="py-4 md:py-5 px-4 md:px-6 text-gray-600 space-y-2.5">
                    <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 shrink-0 mt-0.5" /> <span className="leading-snug">고효율 방향성 규소강판 사용으로 전력 손실 최소화</span></div>
                    <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 shrink-0 mt-0.5" /> <span className="leading-snug">특수 진공 함침 코팅 마감으로 방수/방진 기능 강화</span></div>
                    <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 shrink-0 mt-0.5" /> <span className="leading-snug">화재에 안전한 난연성 최고 등급 절연재료 전면 적용</span></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Reliability Data */}
      <div className="py-16 md:py-24 px-4 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto text-center">
           <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-50 text-blue-600 rounded-full mb-6">
             <Award className="w-7 h-7 md:w-8 md:h-8" />
           </div>
           <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">품질 보증 및 인증 현황</h2>
           <p className="text-gray-500 text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
             안전보다 중요한 것은 없습니다. 국내외 공인 기관으로부터 검증받은 까다로운 안전 규격을 통과하고 각종 품질 인증서를 보유하고 있습니다.
           </p>
           
           <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 opacity-70">
              <div className="flex flex-col items-center gap-3 p-4 hover:opacity-100 transition-opacity">
                <img src="/images/cert_iso9001.jpg" alt="ISO 9001" className="h-14 md:h-16 object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
                <span className="font-bold text-xs md:text-sm text-gray-600">ISO 9001 품질경영</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 hover:opacity-100 transition-opacity">
                <img src="/images/cert_iso14001.png" alt="ISO 14001" className="h-14 md:h-16 object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
                <span className="font-bold text-xs md:text-sm text-gray-600">ISO 14001 환경경영</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 hover:opacity-100 transition-opacity">
                <img src="/images/cert_kc.png" alt="KC 인증" className="h-14 md:h-16 object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
                <span className="font-bold text-xs md:text-sm text-gray-600">KC 안전확인신고 인증</span>
              </div>
           </div>
           
           <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-gray-100">
             <p className="text-xs md:text-sm font-bold text-gray-400 mb-6 md:mb-8 uppercase tracking-widest">주요 납품 파트너</p>
             <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
               <div className="group cursor-default p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                 <span className="text-2xl md:text-3xl font-black tracking-tighter" style={{ color: '#1428A0', fontFamily: 'Arial, Helvetica, sans-serif' }}>SAMSUNG</span>
               </div>
               <div className="group cursor-default p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center gap-1">
                 <div className="w-6 h-6 rounded-full border-2 border-[#002C5F] flex items-center justify-center skew-x-[-15deg]">
                   <span className="text-[#002C5F] font-black text-xs">H</span>
                 </div>
                 <span className="text-xl md:text-2xl font-black tracking-tight" style={{ color: '#002C5F' }}>HYUNDAI</span>
               </div>
               <div className="group cursor-default p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                 <div className="w-7 h-7 rounded-full bg-[#A50034] flex items-center justify-center relative overflow-hidden">
                    <span className="text-white text-[10px] font-bold absolute left-1 bottom-1">L</span>
                    <span className="text-white text-xs font-bold absolute right-1 top-1">G</span>
                 </div>
                 <span className="text-xl md:text-2xl font-bold text-gray-800">Display</span>
               </div>
               <div className="group cursor-default p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                 <span className="text-2xl md:text-3xl font-bold tracking-widest" style={{ color: '#005aab', fontFamily: 'Impact, sans-serif' }}>POSCO</span>
               </div>
               <div className="group cursor-default p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center gap-1">
                 <span className="text-2xl md:text-3xl font-black text-[#E1002A]">SK</span>
                 <span className="text-xl md:text-2xl font-bold text-orange-500">hynix</span>
               </div>
               <div className="group cursor-default p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                 <span className="text-2xl md:text-3xl font-black tracking-tighter" style={{ color: '#0055A6' }}>KEPCO</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
