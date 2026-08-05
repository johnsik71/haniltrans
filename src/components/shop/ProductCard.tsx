"use client";

import { useState } from 'react';
import { Product } from '@/types/mall';
import { Star, ShoppingCart, Check, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import OptionModal from './OptionModal';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product | any }) {
  const { addToCart } = useCart();
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.options && product.options.length > 0) {
      setIsOptionModalOpen(true);
    } else {
      addToCart(product);
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 2000);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group relative">
        <Link href={`/product/${product.id}`} className="block flex-1 cursor-pointer">
          {/* Product Image Container */}
          <div className="relative w-full pt-[100%] bg-gray-100 overflow-hidden shrink-0">
            <img
              src={product.image || 'https://via.placeholder.com/500'}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md">
                {product.badge}
              </span>
            )}
            {product.isFreeShipping && (
              <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                무료배송
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-1">
              <span className="font-bold text-blue-600 truncate">{product.categoryName}</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold shrink-0">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-[11px]">{product.rating || 5.0} ({product.reviewCount || 0})</span>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Spec Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] font-extrabold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                용량: {product.capacity || '별도표기'}
              </span>
              <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                전압: {product.inputVoltage || '220V'} ➔ {product.outputVoltage || '110V'}
              </span>
            </div>

            <p className="text-xs text-gray-500 line-clamp-2 pt-1 leading-relaxed">
              {product.description || '변압기 제품입니다.'}
            </p>
          </div>
        </Link>

        {/* Price & Add to Cart Action */}
        <div className="p-4 pt-3 border-t border-gray-100 mt-2 flex flex-wrap items-end justify-between gap-2">
          <div className="break-keep flex-1 min-w-0">
            {product.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through block mb-0.5">
                {product.originalPrice.toLocaleString()}원
              </span>
            )}
            <div className="text-lg sm:text-xl font-black text-gray-900 leading-none">
              {product.price ? product.price.toLocaleString() : 0}<span className="text-xs sm:text-sm font-bold ml-0.5">원</span>
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            title="장바구니 담기"
            className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
              addedToast
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-100 shadow-sm hover:shadow-md'
            }`}
          >
            {addedToast ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            ) : (
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            )}
          </button>
        </div>
      </div>

      {/* Option Modal */}
      {isOptionModalOpen && (
        <OptionModal product={product} onClose={() => setIsOptionModalOpen(false)} />
      )}
    </>
  );
}
