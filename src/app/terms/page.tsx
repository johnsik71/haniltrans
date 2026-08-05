import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-gray-900">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-black mb-8">이용약관</h1>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-gray-600 leading-relaxed">
            제1조 (목적)
            이 약관은 더 한일트랜스 스토어가 운영하는 사이버 몰에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
          {/* Add more terms here */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
