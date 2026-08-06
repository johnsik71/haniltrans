"use client";

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { Settings, FileText, CheckCircle2 } from 'lucide-react';

export default function RequestPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    phone: '',
    inputVoltage: '',
    outputVoltage: '',
    capacity: '',
    quantity: '1',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
        window.scrollTo(0, 0);
      } else {
        alert('의뢰 접수 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
        <Header />
        <main className="flex-1 max-w-3xl mx-auto px-4 py-20 w-full flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black mb-4">제작 의뢰가 접수되었습니다.</h1>
          <p className="text-gray-500 mb-8 max-w-md">
            작성해주신 의뢰서를 확인 후, 담당 엔지니어가 기재된 연락처로 신속히 회신해 드리겠습니다. 감사합니다.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
          >
            메인으로 돌아가기
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl mb-4">
            <Settings className="w-6 h-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black mb-3">판넬용 트랜스 맞춤 제작 의뢰</h1>
          <p className="text-gray-500 text-sm">
            설비 규격에 맞는 정확한 사양을 입력해 주시면, 최적의 맞춤형 변압기를 설계해 드립니다.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 flex items-center gap-2 border-b border-slate-800">
            <FileText className="w-5 h-5 text-blue-400" />
            <h2 className="text-white font-bold text-sm">제작 의뢰서 작성</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            
            {/* 고객 정보 */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 text-sm">의뢰인 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">업체명 (또는 성함) <span className="text-red-500">*</span></label>
                  <input required name="company" value={formData.company} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="예: 한일산업" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">담당자 성함</label>
                  <input name="contactName" value={formData.contactName} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="예: 홍길동 대리" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">연락처 <span className="text-red-500">*</span></label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="010-0000-0000" />
                </div>
              </div>
            </div>

            {/* 변압기 사양 */}
            <div className="space-y-4 pt-4">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 text-sm">요구 사양 (Spec)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">입력 전압 (Input) <span className="text-red-500">*</span></label>
                  <input required name="inputVoltage" value={formData.inputVoltage} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="예: 단상 220V" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">출력 전압 (Output) <span className="text-red-500">*</span></label>
                  <input required name="outputVoltage" value={formData.outputVoltage} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="예: 단상 110V" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">요구 용량 (Capacity) <span className="text-red-500">*</span></label>
                  <input required name="capacity" value={formData.capacity} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="예: 5kVA" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">제작 수량 <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-2">
                    <input required name="quantity" value={formData.quantity} onChange={handleChange} type="number" min="1" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-right font-bold" />
                    <span className="text-sm font-bold text-gray-500">대</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 요청사항 */}
            <div className="space-y-4 pt-4">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 text-sm">특이사항 및 요청사항</h3>
              <div>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none" placeholder="탭(Tap) 구성, 함체 규격, 케이블 인출 방향 등 특별히 요구하시는 사항을 자유롭게 적어주세요."></textarea>
              </div>
            </div>

            <div className="pt-4">
              <button disabled={isSubmitting} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold text-base py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2">
                {isSubmitting ? '의뢰서 접수 중...' : '맞춤 제작 의뢰서 제출하기'}
              </button>
            </div>
          </form>
        </div>

      </main>
      <Footer />
    </div>
  );
}
