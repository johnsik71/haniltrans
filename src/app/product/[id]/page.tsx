"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Star, ShieldCheck, Truck, ArrowLeft, Heart, Share2, ShoppingCart, Gift, MessageCircle } from 'lucide-react';
import ProductDetailTemplate from '@/components/shop/ProductDetailTemplate';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  type TabType = 'detail' | 'review' | 'qna' | 'delivery';
  const [activeTab, setActiveTab] = useState<TabType>('detail');

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
        try {
          const recent = JSON.parse(localStorage.getItem('recentProducts') || '[]');
          const newRecent = [{ id: data.id, image: data.image, name: data.name }, ...recent.filter((p: any) => p.id !== data.id)].slice(0, 10);
          localStorage.setItem('recentProducts', JSON.stringify(newRecent));
          window.dispatchEvent(new Event('recentProductsUpdated'));
        } catch (e) {}
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product || product.error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-20 w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">상품을 찾을 수 없습니다.</h2>
          <p className="text-gray-500">요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/login');
  };

  const handleNaverPay = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <span>홈</span> &gt; <span>{product.categoryName}</span> &gt; 
          <span className="font-bold text-gray-900">{product.subCategory || '상세'}</span>
        </div>

        {/* Product Top Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row mb-12">
          
          {/* Left: Product Image Gallery */}
          <div className="w-full md:w-1/2 p-6 md:p-12 bg-gray-50 flex items-center justify-center border-r border-gray-100">
            <img 
              src={product.image || 'https://via.placeholder.com/600'} 
              alt={product.name} 
              className="w-full max-w-md object-contain rounded-xl shadow-sm"
            />
          </div>

          {/* Right: Product Info */}
          {/* Mobile responsive fix: p-4 md:p-8 lg:p-12 to save space on mobile */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 lg:p-12 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold text-blue-600">{product.categoryName}</span>
              <div className="flex gap-2 text-gray-400">
                <button className="hover:text-red-500 transition-colors"><Heart className="w-5 h-5" /></button>
                <button className="hover:text-blue-500 transition-colors"><Share2 className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Mobile responsive fix: scaled down text-3xl to text-xl md:text-2xl lg:text-3xl */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-700">{product.rating || '5.0'}</span>
              <span className="text-xs text-gray-400">({product.reviewCount || '0'}개의 리뷰)</span>
            </div>

            <div className="border-t border-b border-gray-100 py-6 mb-6 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-gray-500 font-bold">판매가</span>
                <div className="text-right flex items-end gap-2">
                  {product.originalPrice && (
                    <div className="flex flex-col items-end justify-end mb-1">
                      <span className="text-sm text-gray-400 line-through block leading-none">
                        {product.originalPrice.toLocaleString()}원
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {product.originalPrice && product.price && Math.floor(((product.originalPrice - product.price) / product.originalPrice) * 100) > 0 && (
                      <span className="text-2xl md:text-3xl font-black text-red-500">
                        {Math.floor(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    )}
                    <span className="text-2xl md:text-3xl font-black text-gray-900">
                      {product.price ? product.price.toLocaleString() : 0}<span className="text-lg md:text-xl font-bold ml-1">원</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="text-xs text-blue-600 font-bold mb-1">용량</div>
                <div className="font-black text-gray-900">{product.capacity || '상세설명 참조'}</div>
              </div>
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                <div className="text-xs text-emerald-600 font-bold mb-1">전압</div>
                <div className="font-black text-gray-900">{product.inputVoltage || '220V'} ➔ {product.outputVoltage || '110V'}</div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-gray-400" /> 
                <span className="font-bold text-gray-900">무료배송</span> (제주/도서산간 제외)
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck className="w-5 h-5 text-gray-400" /> 
                <span>100% 국내 수작업 제조 정품 보증</span>
              </div>
            </div>

            {/* Smart Store Style Purchase UI */}
            <div className="mt-auto flex flex-col gap-4">
              {/* Options & Quantity Selector */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 flex flex-col gap-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-[13px] font-bold text-gray-700">기본 옵션 (필수)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-medium text-gray-600">수량</span>
                  <div className="flex border border-gray-300 rounded bg-white overflow-hidden w-[100px] h-8">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex-1 bg-white hover:bg-gray-50 text-gray-500 font-bold transition-colors"
                    >-</button>
                    <div className="flex-1 flex items-center justify-center font-bold text-gray-900 border-x border-gray-300 text-[13px]">
                      {quantity}
                    </div>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex-1 bg-white hover:bg-gray-50 text-gray-500 font-bold transition-colors"
                    >+</button>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[13px] font-bold text-gray-500">총 상품금액</span>
                  <span className="text-lg font-black text-[#f23535]">{(product.price * quantity).toLocaleString()}<span className="text-sm font-bold ml-0.5">원</span></span>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="flex flex-col gap-2">
                {/* Row 1: Gift & Naver Pay */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-white border border-[#03C75A] text-[#03C75A] hover:bg-[#03C75A]/5 font-bold text-[15px] rounded-lg py-3.5 flex items-center justify-center gap-1.5 transition-colors">
                    <Gift className="w-[18px] h-[18px]" /> 선물하기
                  </button>
                  <button 
                    onClick={handleNaverPay}
                    className="flex-[2] bg-[#03C75A] hover:bg-[#02b350] text-gray-900 font-bold text-[15px] rounded-lg py-3.5 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <div className="bg-white text-[#03C75A] w-4 h-4 rounded-sm flex items-center justify-center -mr-0.5">
                      <span className="font-black text-[12px] leading-none">N</span>
                    </div>
                    구매하기
                  </button>
                </div>
                
                {/* Row 2: Wish, Talk, Cart */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white">
                  <button className="flex-1 py-3.5 text-[14px] text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors">
                    <Heart className="w-[18px] h-[18px] text-gray-400" /> 찜하기
                  </button>
                  <div className="w-[1px] bg-gray-200 my-2.5"></div>
                  <button className="flex-1 py-3.5 text-[14px] text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors">
                    <MessageCircle className="w-[18px] h-[18px] text-gray-400" /> 톡톡문의
                  </button>
                  <div className="w-[1px] bg-gray-200 my-2.5"></div>
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 text-[14px] text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingCart className="w-[18px] h-[18px] text-gray-400" /> 장바구니
                  </button>
                </div>
              </div>
            </div>
          </div>

        {/* Product Details Section with Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-12">
          {/* Tabs Navigation */}
          {/* Mobile responsive fix: use flex overflow-x-auto whitespace-nowrap hide-scrollbar for tabs */}
          <div className="flex overflow-x-auto hide-scrollbar whitespace-nowrap border-b border-gray-200">
            {[
              { id: 'detail', label: '상세정보' },
              { id: 'review', label: `구매후기 (${product.reviewCount || 0})` },
              { id: 'qna', label: '상품문의' },
              { id: 'delivery', label: '배송/교환/반품' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-4 py-4 text-[13px] md:text-sm font-bold transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50/30 font-black'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {/* Mobile responsive fix: p-4 md:p-8 lg:p-12 */}
          <div className="p-4 sm:p-8 lg:p-12 min-h-[400px]">
            {activeTab === 'detail' && (
              <div className="text-center animate-in fade-in duration-300">
                <h3 className="text-xl font-black text-gray-900 mb-8 pb-4 border-b border-gray-100">상품 상세 정보</h3>
                <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  {product.description || '이 변압기는 산업 및 가정 환경에서 안정적인 전압 공급을 위해 설계된 제품입니다. 100% 국내 수작업 제조로 뛰어난 내구성과 품질을 자랑합니다.'}
                </p>
                {product.detailImage ? (
                  <div className="mt-12 rounded-2xl overflow-hidden border border-gray-200">
                    <img src={product.detailImage} alt="상세 설명" className="w-full h-auto" />
                  </div>
                ) : (
                  <div className="mt-12">
                    <ProductDetailTemplate product={product} />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'review' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-xl font-black text-gray-900 mb-6">구매후기</h3>
                <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-xl border border-gray-100">
                  아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
                </div>
              </div>
            )}

            {activeTab === 'qna' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-xl font-black text-gray-900 mb-6">상품문의</h3>
                <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-xl border border-gray-100">
                  상품에 대한 문의사항을 남겨주시면 신속하게 답변해 드립니다.
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-xl font-black text-gray-900 mb-6">배송/교환/반품 안내</h3>
                <div className="space-y-4 text-sm text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <p><strong>배송 정보:</strong> 평일 오후 2시 이전 결제 완료 건에 한해 당일 출고됩니다.</p>
                  <p><strong>배송비:</strong> 5만원 이상 구매 시 무료 (제주/도서산간 지역 추가 운임 발생)</p>
                  <p><strong>교환/반품:</strong> 상품 수령 후 7일 이내 고객센터를 통해 접수 가능합니다.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
