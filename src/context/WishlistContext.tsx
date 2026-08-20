"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => Promise<boolean | void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    if (session) {
      fetch('/api/wishlist')
        .then(res => res.json())
        .then(data => {
          if (data.items) {
            setWishlistIds(data.items.map((item: any) => item.id));
          }
        })
        .catch(console.error);
    } else {
      setWishlistIds([]);
    }
  }, [session]);

  const toggleWishlist = async (productId: string) => {
    if (!session) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });

      if (res.ok) {
        const data = await res.json();
        setWishlistIds(prev => 
          data.isWishlisted 
            ? [...prev, productId] 
            : prev.filter(id => id !== productId)
        );
        return data.isWishlisted;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
