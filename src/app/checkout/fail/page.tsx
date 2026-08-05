"use client";

import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CheckoutFailContent() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('message') || '결제 중 알 수 없는 오류가 발생했습니다.';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">결제가 실패했습니다.</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-lg">
          {errorMessage}<br/><br/>
          지속적으로 문제가 발생할 경우 고객센터(032-324-9529)로 문의해 주십시오.
        </p>
        
        <div className="flex gap-4">
          <Link href="/checkout" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
            결제 다시 시도하기
          </Link>
          <Link href="/" className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors">
            메인으로 가기
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CheckoutFailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
      <CheckoutFailContent />
    </Suspense>
  );
}
