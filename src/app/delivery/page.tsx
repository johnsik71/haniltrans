import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Truck, Search, Package } from 'lucide-react';

export default function DeliveryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        <Sidebar />

        <div className="flex-1 min-w-0 bg-white border border-gray-200 p-8 rounded-sm shadow-sm">
          <div className="text-[11px] text-gray-500 flex items-center gap-1 border-b border-gray-200 pb-2 mb-6">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>&gt;</span>
            <span className="font-bold text-gray-800">배송조회</span>
          </div>

          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">배송조회</h1>
              <p className="text-sm text-gray-500 mt-1">주문하신 상품의 실시간 배송 현황을 확인하실 수 있습니다.</p>
            </div>
          </div>

          {/* Tracking Input Area */}
          <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-6">운송장 번호로 조회하기</h2>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
              <select className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 bg-white text-sm font-medium">
                <option>CJ대한통운</option>
                <option>로젠택배</option>
                <option>우체국택배</option>
                <option>경동택배</option>
              </select>
              <input 
                type="text" 
                placeholder="운송장 번호를 입력하세요 (- 제외)" 
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Search className="w-4 h-4" />
                조회
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-6">
              * 오후 4시 이전 결제 완료 건은 당일 발송됩니다. (주말/공휴일 제외)<br/>
              * 화물 택배(경동/대신)의 경우 배송 조회가 원활하지 않을 수 있으니 영업소로 문의 바랍니다.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
