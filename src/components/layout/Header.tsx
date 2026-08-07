"use client";

import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

export default function Header() {
  return (
    <header className="w-full font-sans text-gray-900 shadow-sm border-b border-gray-200">
      <div className="hidden md:block">
        <HeaderDesktop />
      </div>
      <div className="block md:hidden">
        <HeaderMobile />
      </div>
    </header>
  );
}
