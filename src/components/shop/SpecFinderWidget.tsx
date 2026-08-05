"use client";

import { useState } from 'react';
import { Calculator, Zap, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SpecFinderWidget() {
  const [wattage, setWattage] = useState<number | ''>(1000);
  const [loadType, setLoadType] = useState<number>(1.25);
  const router = useRouter();

  const calculatedKva = wattage !== '' ? Math.ceil(((wattage / 0.8) * loadType) / 1000) : 1;

  const handleApply = () => {
    // Navigate to search with the calculated capacity
    router.push(`/search?q=${calculatedKva}kVA`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3 font-sans">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
        <Calculator className="w-4 h-4 text-blue-600" />
        <h3 className="font-extrabold text-gray-900 text-xs">간편 용량 계산기</h3>
      </div>

      <div className="space-y-3 text-[11px]">
        <div className="space-y-1">
          <label className="block font-bold text-gray-700">기기 소비 전력 (W)</label>
          <input
            type="number"
            value={wattage}
            onChange={(e) => setWattage(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="예: 1200"
            className="w-full p-2 border border-gray-300 rounded-lg font-bold text-xs focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-bold text-gray-700">기기 종류 (안전율)</label>
          <select
            value={loadType}
            onChange={(e) => setLoadType(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg font-bold focus:ring-2 focus:ring-blue-600 outline-none text-[11px]"
          >
            <option value={1.25}>일반 전자제품 (1.25배)</option>
            <option value={2.5}>모터/펌프 (2.5배)</option>
            <option value={1.3}>전열기구 (1.3배)</option>
          </select>
        </div>
      </div>

      {/* Calculated Result Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
        <span className="text-[10px] text-blue-700 font-bold block mb-0.5">추천 권장 용량</span>
        <div className="text-lg font-black text-blue-900 flex items-center justify-center gap-1">
          약 {calculatedKva} <span className="text-sm">kVA</span>
        </div>
      </div>

      <button
        onClick={handleApply}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] rounded-lg shadow-sm flex items-center justify-center gap-1 transition-colors"
      >
        <Search className="w-3.5 h-3.5" /> 이 용량 상품 찾기
      </button>
    </div>
  );
}
