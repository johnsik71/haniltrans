import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Info, CreditCard, Truck, RefreshCcw } from 'lucide-react';

export default function GuidePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        <Sidebar />

        <div className="flex-1 min-w-0 bg-white border border-gray-200 p-8 rounded-sm shadow-sm">
          <div className="text-[11px] text-gray-500 flex items-center gap-1 border-b border-gray-200 pb-2 mb-6">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>&gt;</span>
            <span className="font-bold text-gray-800">이용안내</span>
          </div>

          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">이용안내</h1>
              <p className="text-sm text-gray-500 mt-1">쇼핑몰 결제, 배송, 교환 및 반품에 대한 안내입니다.</p>
            </div>
          </div>

          <div className="space-y-12">
            {/* Payment Info */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-gray-900 border-b border-gray-100 pb-2">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-bold">결제 안내</h2>
              </div>
              <div className="text-sm text-gray-600 space-y-2 pl-7 leading-relaxed">
                <p>고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등 정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수 있습니다.</p>
                <p>무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.</p>
                <p>주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.</p>
              </div>
            </section>

            {/* Delivery Info */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-gray-900 border-b border-gray-100 pb-2">
                <Truck className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-bold">배송 안내</h2>
              </div>
              <div className="text-sm text-gray-600 space-y-2 pl-7 leading-relaxed flex flex-col">
                <span><strong className="text-gray-800">배송 방법</strong> : 택배 및 화물 (CJ대한통운, 로젠, 경동/대신화물)</span>
                <span><strong className="text-gray-800">배송 지역</strong> : 전국지역</span>
                <span><strong className="text-gray-800">배송 비용</strong> : 조건부 무료배송</span>
                <span><strong className="text-gray-800">배송 기간</strong> : 1일 ~ 3일</span>
                <p className="pt-2 text-red-500 text-xs">
                  - 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가 있습니다.<br/>
                  - 고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만, 상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.<br/>
                  - 맞춤형 제작 상품(판넬용 트랜스 등)의 경우 제작 기간이 별도로 소요될 수 있습니다.
                </p>
              </div>
            </section>

            {/* Return & Exchange Info */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-gray-900 border-b border-gray-100 pb-2">
                <RefreshCcw className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-bold">교환 및 반품 안내</h2>
              </div>
              <div className="text-sm text-gray-600 space-y-4 pl-7 leading-relaxed">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">교환 및 반품이 가능한 경우</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>상품을 공급 받으신 날로부터 7일이내. 단, 가전제품의 경우 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우에는 교환/반품이 불가능합니다.</li>
                    <li>공급받으신 상품 및 용역의 내용이 표시,광고 내용과 다르거나 다르게 이행된 경우에는 공급받은 날로부터 3월이내, 그사실을 알게 된 날로부터 30일이내</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">교환 및 반품이 불가능한 경우</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손된 경우</li>
                    <li>포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우</li>
                    <li>고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우</li>
                    <li>맞춤형 주문 제작 상품의 경우 (제품 불량 제외)</li>
                  </ul>
                </div>
                <p className="text-xs text-blue-600 font-bold bg-blue-50 p-3 rounded-lg">
                  ※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은 고객님께서 부담하셔야 합니다. (색상 교환, 사이즈 교환 등 포함)
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
