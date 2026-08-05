import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  // In a real app, this would fetch from a WishlistContext or API
  const wishlistItems: any[] = [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        <Sidebar />

        <div className="flex-1 min-w-0 bg-white border border-gray-200 p-8 rounded-sm shadow-sm">
          <div className="text-[11px] text-gray-500 flex items-center gap-1 border-b border-gray-200 pb-2 mb-6">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>&gt;</span>
            <span className="font-bold text-gray-800">즐겨찾기</span>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-pink-100 text-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">즐겨찾기</h1>
              <p className="text-sm text-gray-500 mt-1">고객님께서 관심 상품으로 찜해두신 목록입니다.</p>
            </div>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border-t border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">즐겨찾기한 상품이 없습니다.</h3>
              <p className="text-gray-500 text-sm mb-6">마음에 드는 상품에 하트를 눌러 찜해보세요!</p>
              <Link 
                href="/" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                상품 보러가기
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* ProductCards would go here */}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
