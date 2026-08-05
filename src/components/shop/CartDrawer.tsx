"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, ShoppingBag, Trash2, Plus, Minus, Truck, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const router = useRouter();
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, removeMultipleFromCart, updateQuantity, totalAmount, clearCart } = useCart();
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  // Reset selection when cart closes
  if (!isCartOpen && selectedIndices.length > 0) {
    setSelectedIndices([]);
  }

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 50000;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalAmount);

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/login');
  };

  const handleSelectAll = () => {
    if (selectedIndices.length === cart.length) {
      setSelectedIndices([]);
    } else {
      setSelectedIndices(cart.map((_, i) => i));
    }
  };

  const toggleSelection = (index: number) => {
    setSelectedIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIndices.length === 0) {
      alert("삭제할 상품을 선택해주세요.");
      return;
    }
    removeMultipleFromCart(selectedIndices);
    setSelectedIndices([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Cart Header */}
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-400" />
            <h3 className="font-extrabold text-base">장바구니 ({cart.length})</h3>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-blue-50 p-4 border-b border-blue-100 text-xs">
          {remainingForFreeShipping > 0 ? (
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-blue-900">
                <span>무료배송까지</span>
                <span>{remainingForFreeShipping.toLocaleString()}원 남음!</span>
              </div>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${Math.min(100, (totalAmount / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 font-bold text-emerald-700">
              <Truck className="w-4 h-4" /> 🎉 5만원 이상 구매로 무료배송 혜택 적용!
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length > 0 && !checkoutSubmitted && (
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={cart.length > 0 && selectedIndices.length === cart.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                전체선택 ({selectedIndices.length}/{cart.length})
              </label>
              <button 
                onClick={handleDeleteSelected}
                className="text-xs text-gray-500 hover:text-red-500 font-bold px-2 py-1 rounded bg-gray-100 hover:bg-red-50 transition-colors"
              >
                선택 삭제
              </button>
            </div>
          )}

          {cart.length === 0 ? (
            <div className="text-center py-16 text-gray-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-gray-300" />
              <p className="font-bold text-sm">장바구니가 비어 있습니다.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                변압기 둘러보기
              </button>
            </div>
          ) : checkoutSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">주문 접수가 완료되었습니다!</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                한일트랜스샵 주문내역이 생성되었습니다. 담당자가 출하 확인 후 송장번호를 발송합니다.
              </p>
              <button
                onClick={() => {
                  clearCart();
                  setCheckoutSubmitted(false);
                  setIsCartOpen(false);
                }}
                className="px-6 py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
              >
                쇼핑 계속하기
              </button>
            </div>
          ) : (
            cart.map((item, index) => {
              const optionPrice = item.selectedOption?.priceModifier || 0;
              const itemTotal = (item.product.price + optionPrice) * item.quantity;

              return (
                <div key={index} className="flex gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200 relative group">
                  <div className="pt-1">
                    <input 
                      type="checkbox"
                      checked={selectedIndices.includes(index)}
                      onChange={() => toggleSelection(index)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-xl border border-gray-200" />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-bold text-xs text-gray-900 truncate">{item.product.name}</h4>
                    {item.selectedOption && (
                      <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold block">
                        옵션: {item.selectedOption.name}
                      </span>
                    )}
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-xs font-black text-gray-900">{itemTotal.toLocaleString()}원</span>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                        <button onClick={() => updateQuantity(index, item.quantity - 1)} className="p-1 hover:bg-gray-100">
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, item.quantity + 1)} className="p-1 hover:bg-gray-100">
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-red-500 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && !checkoutSubmitted && (
          <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>상품금액</span>
                <span>{totalAmount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>배송비</span>
                <span>{totalAmount >= FREE_SHIPPING_THRESHOLD ? '무료' : '3,000원'}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 border-t border-gray-200 pt-2">
                <span>총 결제금액</span>
                <span className="text-blue-600">
                  {(totalAmount + (totalAmount >= FREE_SHIPPING_THRESHOLD ? 0 : 3000)).toLocaleString()}원
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-base rounded-xl shadow-lg shadow-blue-600/30 transition-colors flex items-center justify-center gap-2"
            >
              간편 주문 / 즉시 결제하기 ➔
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
