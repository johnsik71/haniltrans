"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGuestCheckout = () => {
    router.push('/checkout');
  };

  const handleKakaoLogin = async () => {
    // Call next-auth signIn for kakao
    await signIn('kakao', { callbackUrl: '/checkout' });
  };

  const handleEmailLogin = async () => {
    if (!email || !password) return alert('이메일과 비밀번호를 입력해주세요.');
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });
    
    if (res?.error) {
      alert('로그인에 실패했습니다.');
    } else {
      router.push('/checkout');
    }
  };

  const handleEmailSignup = async () => {
    if (!email || !password) return alert('가입하실 이메일과 비밀번호를 입력해주세요.');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (res.ok) {
      alert('회원가입이 완료되었습니다. 자동으로 로그인됩니다.');
      handleEmailLogin();
    } else {
      alert('회원가입 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Header />
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-16 flex flex-col items-center">
        
        <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">로그인 및 결제</h2>
        
        {/* Social Login Buttons */}
        <div className="w-full flex flex-col gap-3 mb-6">
          <button 
            onClick={handleKakaoLogin}
            className="w-full bg-[#FEE500] hover:bg-[#F4DC00] text-black font-bold text-[15px] py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16 4.64c-6.96 0-12.64 4.48-12.64 10.08 0 3.52 2.32 6.64 5.76 8.48l-1.44 5.44c-0.08 0.32 0.24 0.64 0.56 0.48l6.4-4.24c0.48 0.08 0.88 0.08 1.36 0.08 6.96 0 12.64-4.48 12.64-10.08S22.96 4.64 16 4.64z"/>
            </svg>
            카카오로 1초 만에 시작하기
          </button>
          
          <button 
            onClick={() => signIn('naver', { callbackUrl: '/checkout' })}
            className="w-full bg-[#03C75A] hover:bg-[#02b350] text-white font-bold text-[15px] py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
            </svg>
            네이버로 로그인
          </button>
          
          <button 
            onClick={() => signIn('google', { callbackUrl: '/checkout' })}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold text-[15px] py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm border border-gray-200"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google로 계속하기
          </button>
        </div>

        <div className="w-full flex items-center justify-between text-gray-400 text-xs font-bold mb-6">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="px-4">또는</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* Email Login/Signup */}
        <div className="w-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">이메일 (아이디)</label>
            <input 
              type="email" 
              placeholder="example@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">비밀번호</label>
            <input 
              type="password" 
              placeholder="비밀번호 입력" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" 
            />
          </div>
          <button onClick={handleEmailLogin} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-colors">
            이메일로 로그인
          </button>
          <div className="flex justify-center gap-4 text-xs text-gray-500 font-bold pt-2">
            <button onClick={handleEmailSignup} className="hover:text-blue-600">이메일 가입</button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-blue-600">비밀번호 찾기</button>
          </div>
        </div>

        {/* Guest Checkout Option */}
        <div className="w-full bg-gray-100 p-6 rounded-2xl border border-gray-200 text-center space-y-3">
          <p className="text-sm font-bold text-gray-700">비회원으로 결제하시겠습니까?</p>
          <p className="text-xs text-gray-500">회원가입 없이 주문 및 배송조회가 가능합니다.</p>
          <button 
            onClick={handleGuestCheckout}
            className="w-full bg-white border border-gray-300 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-bold py-3.5 rounded-xl transition-colors"
          >
            비회원 구매하기
          </button>
        </div>

      </main>
      <Footer />
    </div>
  );
}
