"use client";

import { MessageSquare, Phone, FileText } from "lucide-react";

export default function FloatingContactBar() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <a href="https://pf.kakao.com" target="_blank" rel="noreferrer" className="bg-[#FEE500] text-black w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform group relative border border-yellow-400">
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-16 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity shadow-xl border border-gray-800">
          카카오톡 1:1 상담
        </span>
      </a>
      
      <a href="tel:010-5424-7571" className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform group relative border border-blue-500">
        <Phone className="w-6 h-6" />
        <span className="absolute right-16 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity shadow-xl border border-gray-800">
          직통전화: 010-5424-7571
        </span>
      </a>
      
      <a href="#wizard" className="bg-orange-500 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform group relative border border-orange-400">
        <FileText className="w-6 h-6" />
        <span className="absolute right-16 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity shadow-xl border border-gray-800">
          변압기 선정 & 견적
        </span>
      </a>
    </div>
  );
}
