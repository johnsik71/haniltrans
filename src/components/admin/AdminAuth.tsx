"use client";

import { useState, useEffect } from 'react';
import { Lock, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthenticated = status === 'authenticated' && (session?.user as any)?.role === 'admin';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      isAdmin: 'true',
      password: password,
    });
    
    if (res?.error) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  if (!mounted || status === 'loading') return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 font-sans text-gray-900">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">관리자 로그인</h1>
            <p className="text-sm text-slate-500 mt-2">비밀번호를 입력해주세요</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
              {error && <p className="text-red-500 text-xs mt-2 ml-1">비밀번호가 일치하지 않습니다.</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-600/30"
            >
              로그인
            </button>
          </form>
          
          <div className="mt-6 text-center">
             <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 font-bold transition-colors">홈페이지로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <span className="font-black text-lg tracking-tight">한일트랜스샵 관리자</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">스토어 보기</Link>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 font-bold transition-colors bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20">
            <LogOut className="w-4 h-4" /> 로그아웃
          </button>
        </div>
      </header>
      <main className="flex-1 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
