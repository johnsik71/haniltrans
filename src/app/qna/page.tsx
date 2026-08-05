"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { HelpCircle, MessageSquarePlus, ChevronDown, CheckCircle2 } from 'lucide-react';

const FAQS = [
  {
    q: "해외 가전제품을 한국에서 쓰려고 하는데 어떤 변압기를 사야 하나요?",
    a: "해외(110V/120V) 가전을 국내(220V)에서 사용하시려면 '다운 트랜스(강압기)'를 구매하셔야 합니다. 가전제품의 소비전력(W)을 확인하신 후, 안전을 위해 소비전력의 2~3배 이상 용량(VA)을 가진 변압기를 선택하시는 것을 권장합니다. (예: 1000W 헤어드라이어 -> 3KVA 변압기 추천)"
  },
  {
    q: "오후 몇 시까지 주문해야 당일 발송되나요?",
    a: "평일(월~금) 오후 4시 이전 결제 완료 건에 한하여 당일 발송 처리됩니다. (단, 재고 상황이나 특수 주문제작 상품의 경우 발송이 지연될 수 있으며, 이 경우 개별 연락을 드립니다.)"
  },
  {
    q: "공업용 특수 전압(380V -> 220V) 변압기 주문 제작이 가능한가요?",
    a: "네, 가능합니다. 한일트랜스샵은 산업용/공업용 특수 변압기 주문 제작 전문 업체입니다. 1:1 문의 게시판이나 고객센터(032-324-9529)로 원하시는 사양(입력/출력 전압, 용량, 단상/삼상 여부 등)을 남겨주시면 엔지니어가 신속하게 견적을 내어 드립니다."
  },
  {
    q: "변압기 작동 시 웅~ 하는 소음이 나는데 정상인가요?",
    a: "변압기 내부에 전기가 흐르면서 철심(코어)이 미세하게 진동하여 발생하는 '자왜현상'으로 인한 약한 소음은 정상입니다. 하지만 소음이 비정상적으로 크거나 타는 냄새가 날 경우 즉시 사용을 중지하고 고객센터로 문의해 주시기 바랍니다."
  }
];

function QnaContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'faq' | 'inquiry'>('faq');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (tabParam === 'inquiry') {
      setActiveTab('inquiry');
    }
  }, [tabParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        <Sidebar />

        <div className="flex-1 min-w-0 bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
          {/* Breadcrumb */}
          <div className="text-[11px] text-gray-500 flex items-center gap-1 border-b border-gray-200 pb-3 mb-6">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>&gt;</span>
            <span className="font-bold text-gray-800">고객센터</span>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">고객센터 / Q&A</h1>
              <p className="text-sm text-gray-500 mt-1">자주 묻는 질문을 확인하시거나 1:1 견적/기술 문의를 남겨주세요.</p>
            </div>
          </div>

          {/* Modern Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('faq')}
              className={`pb-4 px-6 font-bold text-sm transition-colors border-b-2 ${
                activeTab === 'faq' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              자주 묻는 질문 (FAQ)
            </button>
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`pb-4 px-6 font-bold text-sm transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'inquiry' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <MessageSquarePlus className="w-4 h-4" />
              1:1 기술 및 견적 문의
            </button>
          </div>

          {/* Content Area */}
          <div className="min-h-[400px]">
            {activeTab === 'faq' ? (
              <div className="space-y-4 max-w-3xl">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:border-blue-300 bg-white shadow-sm">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-blue-600 font-black text-lg">Q.</span>
                        <span className="font-bold text-gray-800">{faq.q}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 flex items-start gap-3">
                        <span className="text-gray-400 font-black text-lg">A.</span>
                        <p className="text-gray-700 text-sm leading-relaxed pt-1">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-2xl bg-gray-50 border border-gray-200 rounded-2xl p-8">
                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="text-xl font-black text-gray-900">문의글이 성공적으로 접수되었습니다.</div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      전문 엔지니어가 내용을 꼼꼼히 검토한 후,<br/>기재해주신 연락처로 신속하게 답변해 드리겠습니다.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">
                      새로운 문의 작성하기
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="block font-bold text-gray-700 text-sm">작성자 성함/상호 *</label>
                        <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow" placeholder="홍길동 / (주)대한전자" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block font-bold text-gray-700 text-sm">연락처 *</label>
                        <input type="tel" required className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow" placeholder="010-0000-0000" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-bold text-gray-700 text-sm">문의 제목 *</label>
                      <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow" placeholder="[주문제작 견적문의] 공업용 삼상 변압기 사양 문의" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-bold text-gray-700 text-sm">문의 내용 *</label>
                      <textarea rows={6} required className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow resize-y" placeholder="사용하실 기기의 [소비전력(W)], [입력 전압], [출력 전압] 등을 자세히 적어주시면 더 정확한 안내가 가능합니다."></textarea>
                    </div>

                    <button type="submit" className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg">
                      <MessageSquarePlus className="w-5 h-5" />
                      엔지니어에게 문의하기
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function QnaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <QnaContent />
    </Suspense>
  );
}
