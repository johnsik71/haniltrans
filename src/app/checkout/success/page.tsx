"use client";

import { useEffect, useState, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const processed = useRef(false);

  useEffect(() => {
    // Only process once
    if (processed.current) return;
    processed.current = true;

    // Simulate PG validation delay
    setTimeout(async () => {
      try {
        if (cart.length > 0) {
          // Record sales in DB
          const res = await fetch('/api/sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart })
          });
          
          if (res.ok) {
            clearCart();
            setStatus('success');
          } else {
            setStatus('error');
          }
        } else {
          // If hit directly without cart
          setStatus('success');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    }, 1500);
  }, [cart, clearCart]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-20 flex flex-col items-center justify-center text-center">
        {status === 'loading' && (
          <div className="space-y-6 flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
            <h1 className="text-2xl font-black">결제를 안전하게 처리하고 있습니다...</h1>
            <p className="text-gray-500">창을 닫거나 새로고침하지 마십시오.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6 flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-black text-gray-900">결제가 완료되었습니다!</h1>
            <p className="text-gray-500 text-lg">주문하신 상품이 안전하게 배송될 예정입니다.<br/>(결제번호: {searchParams.get('orderId') || `ORD-${Date.now()}`})</p>
            
            <div className="pt-8 flex gap-4">
              <Link href="/" className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors">
                홈으로 가기
              </Link>
              <Link href="/mypage" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                주문내역 확인
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-black text-gray-900">결제 처리 중 오류가 발생했습니다.</h1>
            <p className="text-gray-500">고객센터(032-324-9529)로 문의해 주십시오.</p>
            <Link href="/" className="px-8 py-3 bg-white border border-gray-300 rounded-xl font-bold mt-4">
              돌아가기
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
