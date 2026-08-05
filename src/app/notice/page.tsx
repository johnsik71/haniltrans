import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Bell } from 'lucide-react';

const notices = [
  { id: 1, title: '[공지] 한일트랜스샵 홈페이지 리뉴얼 오픈 안내', date: '2026-08-01', views: 1250, isImportant: true },
  { id: 2, title: '[공지] 하계 휴가 및 택배 배송 마감 안내', date: '2026-07-25', views: 890, isImportant: true },
  { id: 3, title: '변압기(트랜스) 용량 선택 가이드라인', date: '2026-07-10', views: 342, isImportant: false },
  { id: 4, title: '무통장 입금 계좌 변경 안내', date: '2026-06-15', views: 512, isImportant: false },
  { id: 5, title: '제주도 및 도서산간지역 배송비 추가 안내', date: '2026-05-20', views: 231, isImportant: false },
];

export default function NoticePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 min-w-0 bg-white border border-gray-200 p-8 rounded-sm shadow-sm">
          {/* Breadcrumb */}
          <div className="text-[11px] text-gray-500 flex items-center gap-1 border-b border-gray-200 pb-2 mb-6">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>&gt;</span>
            <span className="font-bold text-gray-800">공지사항</span>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">공지사항</h1>
              <p className="text-sm text-gray-500 mt-1">한일트랜스샵의 새로운 소식과 안내 사항을 알려드립니다.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-bold border-t-2 border-b border-gray-900">
                <tr>
                  <th className="px-4 py-4 w-20 text-center">번호</th>
                  <th className="px-4 py-4">제목</th>
                  <th className="px-4 py-4 w-32 text-center">작성일</th>
                  <th className="px-4 py-4 w-24 text-center">조회수</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                    <td className="px-4 py-4 text-center text-gray-500">
                      {notice.isImportant ? (
                        <span className="bg-red-50 text-red-600 font-bold px-2 py-1 rounded text-xs">공지</span>
                      ) : (
                        notice.id
                      )}
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {notice.title}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-500 text-xs">{notice.date}</td>
                    <td className="px-4 py-4 text-center text-gray-500 text-xs">{notice.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50">&lt;</button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-900 text-white font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50">&gt;</button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
