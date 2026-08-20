"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Star, ShieldCheck, Truck, ArrowLeft, Heart, Share2, ShoppingCart } from 'lucide-react';
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
  const [selectedOption, setSelectedOption] = useState('');
  
  const PRODUCT_OPTIONS = [
    "220V/380V 단권형",
    "380V/220V 단권형",
    "440V/220V 단권형",
    "220V/380V 복권형 (+170,000원)",
    "380V/220V 복권형 (+170,000원)",
    "440V/220V 복권형 (+170,000원)"
  ];
  
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

            {/* Options Dropdown */}
            <div className="border-t-2 border-b border-gray-200 py-4 mb-4 mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                <span className="w-full sm:w-32 text-[13px] text-gray-700 font-bold">입출력 전압 + 권선형식</span>
                <select 
                  className="flex-1 border border-gray-300 p-2 text-[13px] focus:outline-none focus:border-blue-500 w-full"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="">-[필수] 옵션을 선택해 주세요-</option>
                  <optgroup label="-------------------">
                    {PRODUCT_OPTIONS.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
              <div className="text-[12px] text-gray-500 mb-1.5">(최소주문수량 1개 이상)</div>
              <div className="text-[12px] text-gray-500 flex items-center gap-1">
                <span className="border border-gray-300 px-1 text-[10px] font-bold">!</span> 위 옵션선택 박스를 선택하시면 아래에 상품이 추가됩니다.
              </div>
            </div>

            {/* Selected Option Display */}
            {selectedOption && (
              <div className="bg-[#f8f9fa] border-t border-b border-gray-200 p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[13px] text-gray-700">{selectedOption}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex border border-gray-300 bg-white overflow-hidden w-[80px] h-7">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 hover:bg-gray-50">-</button>
                    <div className="flex-1 flex items-center justify-center font-bold text-[12px] border-x border-gray-300">{quantity}</div>
                    <button onClick={() => setQuantity(quantity + 1)} className="flex-1 hover:bg-gray-50">+</button>
                  </div>
                  <span className="font-bold text-[14px]">{( ((product?.price || 0) + (selectedOption.includes('+170,000') ? 170000 : 0)) * quantity ).toLocaleString()}원</span>
                </div>
              </div>
            )}

            {/* Total Price Display */}
            <div className="flex justify-end items-end gap-2 mb-6">
              <span className="text-[13px] text-gray-700">총 상품금액(수량) :</span>
              <span className="text-xl md:text-2xl font-black text-[#0066cc]">{( ((product?.price || 0) + (selectedOption.includes('+170,000') ? 170000 : 0)) * quantity ).toLocaleString()}</span>
              <span className="text-[13px] text-[#0066cc]">({quantity}개)</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              {/* Row 1 */}
              <div className="flex gap-1 h-11">
                <button onClick={handleAddToCart} className="flex-[2] bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-[13px] font-bold transition-colors shadow-sm">장바구니담기</button>
                <button onClick={() => router.push('/wishlist')} className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-[13px] font-bold transition-colors shadow-sm">관심상품</button>
                <button onClick={() => window.location.href = 'mailto:contact@haniltrans.com'} className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-[13px] font-bold transition-colors shadow-sm">메일보내기</button>
              </div>
              
              {/* Row 2 */}
              <div className="flex gap-1 h-[52px]">
                <button onClick={() => router.push('/')} className="flex-1 bg-[#9ea7ad] hover:bg-[#8d969c] text-white text-[15px] font-bold transition-colors shadow-sm">쇼핑계속하기</button>
                <button onClick={handleBuyNow} className="flex-1 bg-[#f39c12] hover:bg-[#e67e22] text-white text-[15px] font-bold transition-colors shadow-sm">바로구매하기</button>
              </div>

              {/* Row 3 - NPay */}
              <div className="border-t border-b border-gray-300 py-3 mt-4 flex items-center gap-2">
                <div className="flex flex-col w-[120px]">
                  <span className="text-[#03C75A] font-black text-sm tracking-tighter">NAVER</span>
                  <span className="text-[11px] text-gray-500 leading-tight tracking-tighter">네이버ID로 간편구매<br/>네이버페이</span>
                </div>
                <button onClick={handleNaverPay} className="flex-1 bg-[#00DE5A] hover:bg-[#00c950] text-black font-extrabold text-[15px] py-3 rounded-sm flex items-center justify-center transition-colors shadow-sm tracking-tight">
                  <div className="bg-black text-[#00DE5A] w-[18px] h-[18px] rounded-full flex items-center justify-center mr-1.5">
                    <span className="font-black text-[12px] italic leading-none ml-[1px]">N</span>
                  </div>
                  pay 구매
                </button>
                <button onClick={() => router.push('/wishlist')} className="w-[50px] bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-[13px] py-3 rounded-sm flex items-center justify-center transition-colors shadow-sm">
                  찜
                </button>
              </div>
              
              <div className="text-[12px] text-[#03C75A] mt-1 flex items-center justify-between px-1">
                <span onClick={() => router.push('/event')} className="font-medium cursor-pointer hover:underline">이벤트 100% 지급! 최대 1만원 혜택 확인...</span>
                <div className="flex border border-gray-200 rounded-sm text-gray-400 bg-white cursor-pointer">
                  <span className="px-1.5 py-0.5 border-r border-gray-200 hover:bg-gray-50">{"<"}</span>
                  <span className="px-1.5 py-0.5 hover:bg-gray-50">{">"}</span>
                </div>
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
                {product.detailImage && (
                  <div className="mt-12 rounded-2xl overflow-hidden border border-gray-200">
                    <img src={product.detailImage} alt="상세 설명" className="w-full h-auto" />
                  </div>
                )}
                <div className="mt-12">
                  <ProductDetailTemplate product={product} />
                </div>
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
