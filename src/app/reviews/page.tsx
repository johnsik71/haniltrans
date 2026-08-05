import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { MessageSquare, Star } from 'lucide-react';

const reviews = [
  { id: 1, author: '김*환', product: '판넬용 트랜스(단상복권) 3KVA', rating: 5, date: '2026-08-05', content: '포장도 너무 꼼꼼하게 잘 되어 있고, 제품 마감이나 성능 모두 만족스럽습니다. 다음에도 여기서 주문할게요!' },
  { id: 2, author: '이*영', product: '공업용 강압기 5KVA', rating: 5, date: '2026-08-02', content: '용량이 넉넉해서 산업 현장에서 아주 잘 쓰고 있습니다. 배송이 하루만에 와서 작업 일정에 차질이 없었네요.' },
  { id: 3, author: '박*준', product: '유입식 변압기 10KVA', rating: 4, date: '2026-07-28', content: '제품은 아주 좋습니다. 소음도 적고 발열도 잘 잡히네요. 무게가 상당해서 옮길 때 고생 좀 했습니다 ㅎㅎ' },
  { id: 4, author: '최*민', product: '가정용 승압기 2KVA', rating: 5, date: '2026-07-15', content: '해외직구한 가전제품 쓰려고 샀는데 너무 예쁘고 조용해요! 디자인이 투박하지 않아서 거실에 두어도 괜찮습니다.' },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        <Sidebar />

        <div className="flex-1 min-w-0 bg-white border border-gray-200 p-8 rounded-sm shadow-sm">
          <div className="text-[11px] text-gray-500 flex items-center gap-1 border-b border-gray-200 pb-2 mb-6">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>&gt;</span>
            <span className="font-bold text-gray-800">사용후기</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">상품 사용후기</h1>
                <p className="text-sm text-gray-500 mt-1">고객님들의 생생한 제품 사용 후기를 확인하세요.</p>
              </div>
            </div>
            <button className="px-5 py-2.5 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold rounded-lg transition-colors">
              후기 작성하기
            </button>
          </div>

          <div className="grid gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-xs font-bold text-blue-600 mb-1">{review.product}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-gray-800">{review.author}</span>
                      <span className="text-[11px] text-gray-400">|</span>
                      <span className="text-[11px] text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-900 text-white font-bold">1</button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
