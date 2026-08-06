"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { User, Package, Heart, Settings, MapPin, CreditCard, LogOut, ChevronRight } from 'lucide-react';

export default function MyPage() {
  const { data: session, status } = useSession();

  // For demonstration purposes, if unauthenticated, we show a dummy user profile
  // so the client can see the UI without having to log in.
  const isDemo = status === 'unauthenticated' || !session;
  
  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">로딩중...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        <Sidebar />

        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-gray-500 flex items-center gap-1 border-b border-gray-200 pb-2 mb-6">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>&gt;</span>
            <span className="font-bold text-gray-800">마이페이지</span>
          </div>

          {/* Profile Header */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
              <User className="w-10 h-10" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-black text-gray-900 mb-1">
                반갑습니다, <span className="text-blue-600">{isDemo ? '방문자 (로그인 필요)' : (session?.user?.name || '고객')}</span>님!
              </h1>
              <p className="text-sm text-gray-500">{isDemo ? '테스트로 둘러보는 중입니다' : session?.user?.email}</p>
            </div>
            <div className="flex gap-4 w-full sm:w-auto mt-4 sm:mt-0">
              <div className="flex-1 bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <div className="text-xs text-gray-500 font-bold mb-1">적립금</div>
                <div className="text-lg font-black text-blue-600">0 원</div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <div className="text-xs text-gray-500 font-bold mb-1">쿠폰</div>
                <div className="text-lg font-black text-blue-600">0 장</div>
              </div>
            </div>
          </div>

          {/* Grid Menu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/delivery" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 flex items-center justify-between">
                주문/배송 조회 <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </h3>
              <p className="text-xs text-gray-500 mt-2">최근 주문하신 상품의 배송 상태를 확인합니다.</p>
            </Link>

            <Link href="/wishlist" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 flex items-center justify-between">
                관심 상품 <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-pink-600" />
              </h3>
              <p className="text-xs text-gray-500 mt-2">찜해둔 상품과 장바구니 내역을 확인합니다.</p>
            </Link>

            <Link href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 flex items-center justify-between">
                쿠폰 및 적립금 <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
              </h3>
              <p className="text-xs text-gray-500 mt-2">사용 가능한 쿠폰과 적립금 내역을 조회합니다.</p>
            </Link>

            <Link href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 flex items-center justify-between">
                배송지 관리 <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
              </h3>
              <p className="text-xs text-gray-500 mt-2">자주 쓰는 배송지를 등록하고 수정합니다.</p>
            </Link>

            <Link href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 flex items-center justify-between">
                회원 정보 수정 <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-slate-600" />
              </h3>
              <p className="text-xs text-gray-500 mt-2">비밀번호 변경 및 개인정보를 관리합니다.</p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
