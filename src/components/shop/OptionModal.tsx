"use client";

import { useState } from 'react';
import { Product, ProductOption } from '@/types/mall';
import { X, ShoppingBag, Zap, Truck, ShieldCheck, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function OptionModal({
  product,
  onClose
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addToCart } = useCart();
  const [selectedOption, setSelectedOption] = useState<ProductOption | undefined>(
    product.options && product.options.length > 0 ? product.options[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  const optionPrice = selectedOption?.priceModifier || 0;
  const totalPrice = (product.price + optionPrice) * quantity;

  const handleAddToCart = () => {
    addToCart(product, selectedOption, quantity);
    onClose();
  };

  const handleDirectBuy = () => {
    addToCart(product, selectedOption, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-gray-900 text-base">상품 옵션 선택 및 바로구매</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="flex gap-4">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-2xl border border-gray-200" />
            <div className="space-y-1">
              <span className="text-xs text-blue-600 font-bold">{product.categoryName}</span>
              <h4 className="font-bold text-gray-900 text-base leading-tight">{product.name}</h4>
              <div className="text-sm font-black text-gray-900 pt-1">
                기본가: {product.price.toLocaleString()}원
              </div>
            </div>
          </div>

          {/* Voltage & Capacity Details */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 text-xs space-y-1.5 text-blue-950">
            <div className="flex justify-between">
              <span className="text-gray-500">입력 전압 ➔ 출력 전압:</span>
              <strong className="font-bold">{product.inputVoltage} ➔ {product.outputVoltage}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">정격 변압 용량:</span>
              <strong className="font-bold">{product.capacity}</strong>
            </div>
          </div>

          {/* Option Selector */}
          {product.options && product.options.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">전압/출력 세부 옵션 선택</label>
              <div className="space-y-2">
                {product.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full p-3 min-h-[44px] rounded-xl border text-left text-xs font-bold flex justify-between items-center transition-all ${
                      selectedOption?.id === opt.id
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-600/20'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{opt.name}</span>
                    <span className="text-gray-500">
                      {opt.priceModifier > 0 ? `+${opt.priceModifier.toLocaleString()}원` : '추가금 없음'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between border-t border-b border-gray-100 py-4">
            <span className="text-sm font-bold text-gray-700">주문 수량</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-sm font-black text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Total Price Sum */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-500">총 결제예정금액</span>
            <div className="text-2xl font-black text-blue-600">
              {totalPrice.toLocaleString()}<span className="text-sm font-bold text-gray-900">원</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-800 font-bold text-sm hover:bg-gray-100 transition-colors flex justify-center items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> 장바구니 담기
          </button>
          <button
            onClick={handleDirectBuy}
            className="flex-1 py-3.5 rounded-xl bg-blue-600 text-white font-black text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex justify-center items-center gap-2"
          >
            바로 구매하기 ➔
          </button>
        </div>
      </div>
    </div>
  );
}
