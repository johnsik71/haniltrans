"use client";

import { Product } from '@/types/mall';
import { Star, Zap, Heart } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductCard({ product }: { product: Product | any }) {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const isWishlisted = wishlistIds.includes(product.id);

  const discountRate = product.originalPrice && product.price 
    ? Math.floor(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group relative">
      <Link href={`/product/${product.id}`} className="block flex-1 cursor-pointer relative z-0">
          {/* Product Image Container */}
          <div className="relative w-full pt-[100%] bg-gray-100 overflow-hidden shrink-0">
            <img
              src={product.image || 'https://via.placeholder.com/500'}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
              {product.badge && (
                <span className="bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md w-fit">
                  {product.badge}
                </span>
              )}
              {discountRate > 0 && (
                <span className="bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md w-fit">
                  {discountRate}% 할인
                </span>
              )}
            </div>
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

        {/* Price Area */}
        <div className="p-4 pt-3 border-t border-gray-100 mt-2">
          {product.originalPrice && (
            <span className="text-[11px] text-gray-400 line-through block mb-0.5">
              {product.originalPrice.toLocaleString()}원
            </span>
          )}
          <div className="text-base sm:text-lg font-black text-gray-900 leading-tight flex items-center gap-1.5">
            {discountRate > 0 && <span className="text-red-500">{discountRate}%</span>}
            {product.price ? product.price.toLocaleString() : '0'}<span className="text-xs sm:text-sm font-bold ml-0.5">원</span>
          </div>
        </div>
      {/* Heart Button Overlay */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 
          ${isWishlisted 
            ? 'bg-white/90 text-pink-500 hover:bg-white' 
            : 'bg-black/20 text-white hover:bg-black/40'}`}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>
      
      {product.isFreeShipping && (
        <span className="absolute top-12 right-3 z-10 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
          무료배송
        </span>
      )}
    </div>
  );
}
