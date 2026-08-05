"use client";

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { useRouter } from 'next/navigation';

// Official Toss Payments Sandbox Client Key
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "demo_customer_" + Math.random().toString(36).substring(2, 10);

export default function CheckoutPage() {
  const { cart, totalAmount, clearCart } = useCart();
  const router = useRouter();
  
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // If cart is empty, redirect back
    if (cart.length === 0) {
      alert("장바구니가 비어 있습니다.");
      router.push('/');
      return;
    }
    setPrice(totalAmount >= 50000 ? totalAmount : totalAmount + 3000);
  }, [cart, totalAmount, router]);

  useEffect(() => {
    (async () => {
      // Load payment widget
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      
      // Render payment methods
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-widget',
        { value: price },
        { variantKey: 'DEFAULT' }
      );

      // Render agreement
      paymentWidget.renderAgreement(
        '#agreement',
        { variantKey: 'AGREEMENT' }
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, [price]);

  const handlePayment = async () => {
    const paymentWidget = paymentWidgetRef.current;
    if (!paymentWidget) return;

    try {
      // Simulate real payment request to Toss Payments (Test Mode)
      await paymentWidget.requestPayment({
        orderId: "ORDER_" + Math.random().toString(36).substring(2, 10),
        orderName: cart.length > 1 ? `${cart[0].product.name} 외 ${cart.length - 1}건` : cart[0].product.name,
        successUrl: window.location.origin + "/checkout/success",
        failUrl: window.location.origin + "/checkout/fail",
        customerEmail: "customer@example.com",
        customerName: "홍길동",
        customerMobilePhone: "01012341234",
      });
      // The browser will redirect to successUrl if successful
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  if (cart.length === 0) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Header />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Order Info & Payment Widget */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">배송지 정보 (비회원)</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">받으시는 분</label>
                  <input type="text" placeholder="이름 입력" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">연락처</label>
                  <input type="tel" placeholder="010-0000-0000" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">주소</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" placeholder="우편번호" readOnly className="w-32 border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                  <button className="bg-gray-900 text-white font-bold text-xs px-4 rounded-xl">주소찾기</button>
                </div>
                <input type="text" placeholder="기본주소" readOnly className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none mb-2" />
                <input type="text" placeholder="상세주소 입력" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">결제 수단 (토스페이먼츠 연동)</h2>
            
            {/* Toss Payment Widget Container */}
            <div id="payment-widget" />
            <div id="agreement" />

          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-6">
            <h3 className="text-lg font-black text-gray-900 mb-4 pb-4 border-b border-gray-100">주문 내역</h3>
            
            <div className="space-y-4 mb-6">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-sm">
                  <img src={item.product.image} className="w-12 h-12 rounded bg-gray-100 object-cover" alt={item.product.name} />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-500">수량: {item.quantity}개</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4 mb-4">
              <div className="flex justify-between">
                <span>총 상품금액</span>
                <span>{totalAmount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>배송비</span>
                <span>{totalAmount >= 50000 ? '무료' : '3,000원'}</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-gray-200 pt-4 mb-8">
              <span className="font-bold text-gray-900">최종 결제 금액</span>
              <span className="text-2xl font-black text-blue-600">{price.toLocaleString()}원</span>
            </div>

            <button 
              onClick={handlePayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-lg py-4 rounded-xl shadow-lg transition-colors"
            >
              {price.toLocaleString()}원 결제하기
            </button>
            <p className="text-center text-xs text-gray-400 mt-3 font-bold">
              ※ 테스트 결제이므로 실제 과금되지 않습니다.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
