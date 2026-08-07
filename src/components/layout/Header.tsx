"use client";

import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

export default function Header() {
  return (
    <header className="w-full max-w-7xl mx-auto font-sans text-gray-900">
      <div className="hidden md:block">
        <HeaderDesktop />
      </div>
      <div className="block md:hidden">
        <HeaderMobile />
      </div>
    </header>
  );
}
