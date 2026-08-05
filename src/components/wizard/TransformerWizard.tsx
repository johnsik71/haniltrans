"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { SelectionCriteria } from "@/types/transformer";
import { calculateTransformer } from "@/lib/transformer-engine";
import WizardResult from "./WizardResult";
import { ChevronRight, ChevronLeft, Zap, Factory, Home, Activity } from "lucide-react";

const wizardSchema = z.object({
  purpose: z.enum(['Home', 'Industrial', 'Medical', 'Laboratory', 'Export', 'Factory']),
  inputVoltage: z.coerce.number().min(1, "입력 전압을 입력하세요."),
  outputVoltage: z.coerce.number().min(1, "출력 전압을 입력하세요."),
  powerConsumption: z.coerce.number().min(0.1, "소비 전력(용량)을 0.1 이상 입력하세요."),
  powerUnit: z.enum(['kW', 'kVA']),
  loadType: z.enum(['Continuous', 'Motor', 'Heating', 'Electronic', 'Unknown']),
  environment: z.enum(['Indoor', 'Outdoor', 'Special']),
  phase: z.enum(['Single', 'Three']),
});

type FormData = z.infer<typeof wizardSchema>;

export default function TransformerWizard() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<ReturnType<typeof calculateTransformer> | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      purpose: 'Industrial',
      powerUnit: 'kW',
      loadType: 'Continuous',
      environment: 'Indoor',
      phase: 'Three',
      inputVoltage: 380,
      outputVoltage: 220,
      powerConsumption: 15
    }
  });

  const onSubmit = (data: FormData) => {
    if (step < 3) {
      nextStep();
      return;
    }
    const engineResult = calculateTransformer(data as SelectionCriteria);
    setResult(engineResult);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (step < 3) {
        nextStep();
      } else {
        handleSubmit(onSubmit)();
      }
    }
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const handleReset = () => {
    setResult(null);
    setStep(1);
  };

  if (result) {
    return <WizardResult result={result} onReset={handleReset} />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden text-slate-100">
      <div className="bg-slate-950/80 border-b border-slate-800 p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/40 rounded-xl flex items-center justify-center text-blue-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">한일 변압기 용량 자동 선정 시스템</h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Deterministic Engineering Rule Engine: 전기 부하 및 환경 특성에 맞춰 엔지니어링 마진을 자동 산출합니다.
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mt-8">
          {[
            { num: 1, label: '기본 사양' },
            { num: 2, label: '부하 특성' },
            { num: 3, label: '설치 환경' }
          ].map((item) => (
            <div key={item.num} className="flex-1 flex flex-col gap-2">
              <div className={`h-2 rounded-full transition-colors ${step >= item.num ? 'bg-blue-500' : 'bg-slate-800'}`} />
              <span className={`text-xs font-bold ${step >= item.num ? 'text-blue-400' : 'text-slate-500'}`}>
                Step {item.num}. {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">1. 기본 전기 사양 설정</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-300">사용 목적 (Application)</label>
                    <select {...register("purpose")} className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="Industrial">공장 및 산업 설비 (Industrial)</option>
                      <option value="Factory">대형 제조 공장 (Factory)</option>
                      <option value="Medical">의료 장비 (Medical)</option>
                      <option value="Laboratory">시험 연구소 (Laboratory)</option>
                      <option value="Export">해외 수출 장비 (Export)</option>
                      <option value="Home">가정 및 일반 건물 (Home)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-300">상수 구분 (Phase)</label>
                    <div className="flex gap-4">
                      <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-blue-500/50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-950/40">
                        <input type="radio" value="Single" {...register("phase")} className="hidden" />
                        <span className="font-bold text-sm text-slate-200">단상 (Single Phase)</span>
                      </label>
                      <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-blue-500/50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-950/40">
                        <input type="radio" value="Three" {...register("phase")} className="hidden" />
                        <span className="font-bold text-sm text-slate-200">삼상 (Three Phase)</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-300">입력 전압 (Input Voltage)</label>
                    <input type="number" {...register("inputVoltage")} placeholder="예: 380" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" />
                    {errors.inputVoltage && <p className="text-red-400 text-xs">{errors.inputVoltage.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-300">출력 전압 (Output Voltage)</label>
                    <input type="number" {...register("outputVoltage")} placeholder="예: 220" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" />
                    {errors.outputVoltage && <p className="text-red-400 text-xs">{errors.outputVoltage.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">2. 소비 전력 및 부하 특성</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-300">소비 전력 용량</label>
                    <div className="flex gap-2">
                      <input type="number" step="0.1" {...register("powerConsumption")} className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" />
                      <select {...register("powerUnit")} className="w-24 p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none font-bold">
                        <option value="kW">kW</option>
                        <option value="kVA">kVA</option>
                      </select>
                    </div>
                    {errors.powerConsumption && <p className="text-red-400 text-xs">{errors.powerConsumption.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-300">부하 종별 (안전 마진 계수)</label>
                    <select {...register("loadType")} className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="Continuous">일반 연속 부하 (125% 안전 마진)</option>
                      <option value="Motor">모터 / 펌프 (250% 기동 기동전류 마진)</option>
                      <option value="Heating">히터 / 열선 (130% 열 마진)</option>
                      <option value="Electronic">정밀 전자 장비 (120% 마진)</option>
                      <option value="Unknown">부하 특성 미확인 (150% 권장 마진)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">3. 설치 환경 선택</h3>
                
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-300">설치 장소 및 구조 조건</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex flex-col items-center gap-3 p-5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-blue-500/50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-950/40">
                      <input type="radio" value="Indoor" {...register("environment")} className="hidden" />
                      <Factory className="w-8 h-8 text-blue-400" />
                      <span className="font-bold text-sm text-slate-200">옥내 (Indoor Dry)</span>
                    </label>
                    <label className="flex flex-col items-center gap-3 p-5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-blue-500/50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-950/40">
                      <input type="radio" value="Outdoor" {...register("environment")} className="hidden" />
                      <Home className="w-8 h-8 text-emerald-400" />
                      <span className="font-bold text-sm text-slate-200">옥외 (Outdoor Waterproof)</span>
                    </label>
                    <label className="flex flex-col items-center gap-3 p-5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-blue-500/50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-950/40">
                      <input type="radio" value="Special" {...register("environment")} className="hidden" />
                      <Activity className="w-8 h-8 text-orange-400" />
                      <span className="font-bold text-sm text-slate-200">특수 (분진/습기 방폭)</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-6 border-t border-slate-800">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 flex items-center gap-2 transition-colors">
                <ChevronLeft className="w-4 h-4" /> 이전 단계
              </button>
            ) : <div />}
            
            {step < 3 ? (
              <button type="button" onClick={nextStep} className="px-7 py-3 rounded-xl bg-blue-600 text-white font-extrabold hover:bg-blue-500 flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/30">
                다음 단계 <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="submit" className="px-8 py-3.5 rounded-xl bg-orange-500 text-white font-black hover:bg-orange-400 shadow-xl shadow-orange-500/30 flex items-center gap-2 transition-transform transform hover:-translate-y-0.5">
                용량 산출 & 추천 모델 보기 <Zap className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
