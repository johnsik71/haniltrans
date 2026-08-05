export interface ProductOption {
  id: string;
  name: string;
  priceModifier: number; // e.g. +10000 KRW
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isBest?: boolean;
  isNew?: boolean;
  isFreeShipping?: boolean;
  badge?: string;
  inputVoltage: string;
  outputVoltage: string;
  capacity: string; // e.g. "1kVA", "3kVA", "5kVA"
  options?: ProductOption[];
  description: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  selectedOption?: ProductOption;
  quantity: number;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  inputVoltage: string;
  outputVoltage: string;
  capacity: string;
  priceRange: [number, number];
  sortBy: 'popular' | 'lowPrice' | 'highPrice' | 'newest';
}
