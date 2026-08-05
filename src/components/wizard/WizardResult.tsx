"use client";

import { useState } from "react";
import { EngineResult } from "@/types/transformer";
import { CheckCircle2, ShieldCheck, ArrowRight, Download, Calculator, PhoneCall, RefreshCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

const quoteSchema = z.object({
  companyName: z.string().min(1, "상호명/회사명을 입력해 주세요."),
  contactName: z.string().min(1, "담당자 성함을 입력해 주세요."),
  phone: z.string().min(1, "연락처를 입력해 주세요."),
  email: z.string().email("유효한 이메일 주소를 입력해 주세요."),
  projectName: z.string().optional(),
  expectedQuantity: z.coerce.number().min(1),
  notes: z.string().optional()
});

type QuoteData = z.infer<typeof quoteSchema>;

export default function WizardResult({ result, onReset }: { result: EngineResult, onReset: () => void }) {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<QuoteData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { expectedQuantity: 1 }
  });

  const onSubmitQuote = (data: QuoteData) => {
    console.log("Quote Request:", { ...data, engineResult: result });
    setQuoteSubmitted(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl mx-auto space-y-6 text-slate-100">
      
      {/* Verified by Engineer Badge */}
      <div className="bg-emerald-950/60 border border-emerald-500/40 p-5 rounded-2xl flex items-start gap-4 shadow-lg backdrop-blur-sm">
        <ShieldCheck className="text-emerald-400 w-9 h-9 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-emerald-300 font-extrabold text-lg flex items-center gap-2">
            Verified by Technical Sales Engineer
            <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30">공식 기술검증</span>
          </h3>
          <p className="text-emerald-200/80 text-xs md:text-sm mt-1 leading-relaxed">
            본 추천은 한일 변압기 자동 선정 시스템(Hanil Transformer Selection System)에 의해 계산되었습니다. 
            최종 견적서 발급 전 담당 전력 전문 기술 엔지니어가 부하 조건 및 회로를 재검토합니다.
          </p>
        </div>
      </div>

      {/* Calculation Summary */}
      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Calculator className="text-blue-400" />
          변압기 용량 산출 계산 결과
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400 font-bold uppercase">적용 안전 마진 계수</div>
            <div className="text-2xl font-black text-white mt-1">{result.safetyMarginFactor * 100}%</div>
          </div>
          <div className="bg-blue-950/40 p-5 rounded-xl border border-blue-900/50 text-center">
            <div className="text-xs text-blue-400 font-bold uppercase">권장 변압기 방식</div>
            <div className="text-2xl font-black text-blue-300 mt-1">{result.recommendedType} / {result.recommendedPhase}상</div>
          </div>
          <div className="bg-orange-950/40 p-5 rounded-xl border border-orange-900/50 text-center">
            <div className="text-xs text-orange-400 font-bold uppercase">최소 필요 용량 (Required)</div>
            <div className="text-2xl font-black text-orange-400 mt-1">{result.requiredKva} kVA</div>
          </div>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed">
          <strong className="text-blue-400 block mb-1">산출 근거 (Rationale):</strong>
          {result.rationale}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-6">최적 추천 모델 라인업</h2>
        {result.products.length === 0 ? (
          <div className="text-center py-10 text-slate-400 border border-dashed border-slate-800 rounded-xl">
            표준 모델 범위를 초과하였습니다. 맞춤 주문 제작 견적을 신청해 주세요.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {result.products.map((product) => (
              <div key={product.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800">
                      {product.type} / {product.phase}상
                    </span>
                    <span className="text-base font-black text-orange-400">{product.capacityKva} kVA</span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{product.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{product.description}</p>
                  
                  <div className="text-xs text-slate-500 mb-4 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    입력 {product.inputVoltage}V ➔ 출력 {product.outputVoltage}V
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300 mb-6">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      {!showQuoteForm && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center py-4">
          <button onClick={onReset} className="px-6 py-3.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 font-bold hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors">
            <RefreshCcw className="w-4 h-4" /> 조건 재설정
          </button>
          <button onClick={() => setShowQuoteForm(true)} className="px-8 py-3.5 rounded-xl bg-blue-600 text-white font-extrabold hover:bg-blue-500 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-transform transform hover:-translate-y-0.5">
            엔지니어 검증 및 맞춤 견적 신청 <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Quote Form */}
      {showQuoteForm && !quoteSubmitted && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-slate-900 rounded-2xl shadow-inner border border-slate-800 p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-2">기술 영업 엔지니어 직접 검증 신청서</h2>
          <p className="text-xs text-slate-400 mb-6">신청 정보를 남겨주시면 전력 엔지니어가 1:1로 도면 검토 및 최저가 견적서를 발송해 드립니다.</p>

          <form onSubmit={handleSubmit(onSubmitQuote)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">회사명 / 상호 *</label>
                <input type="text" {...register("companyName")} placeholder="(주)한일산업" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" />
                {errors.companyName && <p className="text-red-400 text-xs">{errors.companyName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">담당자 성함 *</label>
                <input type="text" {...register("contactName")} placeholder="홍길동 팀장" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" />
                {errors.contactName && <p className="text-red-400 text-xs">{errors.contactName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">연락처 *</label>
                <input type="tel" {...register("phone")} placeholder="010-1234-5678" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" />
                {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">이메일 *</label>
                <input type="email" {...register("email")} placeholder="engineer@hanil.com" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" />
                {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">프로젝트명 / 수량</label>
                <input type="text" {...register("projectName")} placeholder="가산공장 2라인 설치용 (1대)" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">필요 수량 *</label>
                <input type="number" {...register("expectedQuantity")} className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">추가 전달사항 (특수 전압, 설치 조건 등)</label>
              <textarea {...register("notes")} rows={3} placeholder="탭 전압 변경 필요 여부나 특수 옥외 함체 요구사항이 있으면 적어주세요." className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button type="submit" className="px-8 py-3.5 rounded-xl bg-orange-500 text-white font-black hover:bg-orange-400 shadow-xl flex-1 flex justify-center items-center gap-2 transition-colors">
                엔지니어 검증 견적 요청하기
              </button>
              <button type="button" onClick={() => setShowQuoteForm(false)} className="px-6 py-3.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 font-bold hover:bg-slate-900 transition-colors">
                취소
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {quoteSubmitted && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-950/80 border border-emerald-500/40 rounded-2xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">기술 견적 요청이 성공적으로 접수되었습니다!</h2>
          <p className="text-emerald-200/80 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            제출하신 전기 계산 리포트가 한일 기술영업팀에 전달되었습니다. 전력 엔지니어가 사양 검토 후 신속히 연락드리겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 font-bold hover:bg-slate-800 flex items-center justify-center gap-2 shadow-md transition-colors">
              <Download className="w-4 h-4" /> 계산 리포트 (PDF) 다운로드
            </button>
            <a href="tel:010-5424-7571" className="px-6 py-3 bg-blue-600 rounded-xl text-white font-extrabold hover:bg-blue-500 flex items-center justify-center gap-2 shadow-lg transition-colors">
              <PhoneCall className="w-4 h-4" /> 기술 상담 전화 (010-5424-7571)
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
