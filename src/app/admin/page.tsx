"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, ExternalLink, Package, Users, BarChart3, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'users' | 'sales'>('products');
  const [users, setUsers] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
        console.error('Products API returned non-array:', data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSales = async () => {
    try {
      const res = await fetch('/api/sales');
      const data = await res.json();
      if (Array.isArray(data)) {
        setSales(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchSales();
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const thisMonth = today.slice(0, 7);

  const dailySales = sales.filter(s => s.orderDate.startsWith(today)).reduce((sum, s) => sum + s.totalSales, 0);
  const dailyMargin = sales.filter(s => s.orderDate.startsWith(today)).reduce((sum, s) => sum + s.margin, 0);
  const monthlySales = sales.filter(s => s.orderDate.startsWith(thisMonth)).reduce((sum, s) => sum + s.totalSales, 0);
  const totalMargin = sales.reduce((sum, s) => sum + s.margin, 0);

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts();
      } else {
        alert('삭제 실패');
      }
    } catch (error) {
      alert('오류 발생');
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleFormSave = () => {
    setIsFormOpen(false);
    fetchProducts();
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'products' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          <Package className="w-5 h-5" /> 상품 관리
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          <Users className="w-5 h-5" /> 회원 관리
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          className={`pb-3 font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'sales' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          <BarChart3 className="w-5 h-5" /> 판매·마진 관리
        </button>
      </div>

      {activeTab === 'products' && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">상품 관리</h1>
              <p className="text-gray-500 text-sm mt-1">총 {products.length}개의 변압기 상품이 등록되어 있습니다.</p>
            </div>
            
            <button 
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-600/20"
            >
              <Plus className="w-5 h-5" /> 새 상품 등록
            </button>
          </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="상품명, 카테고리 또는 ID 검색..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold">상품정보</th>
                <th className="px-6 py-4 font-bold">카테고리</th>
                <th className="px-6 py-4 font-bold text-right">판매가</th>
                <th className="px-6 py-4 font-bold text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    로딩 중...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={p.image || 'https://via.placeholder.com/150'} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                        <div>
                          <div className="font-bold text-gray-900 line-clamp-1">{p.name}</div>
                          <div className="text-xs text-gray-500 font-mono">ID: {p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                        {p.categoryName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-gray-900">
                      {p.price.toLocaleString()}원
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/product/${p.id}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="상품 보기">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleEdit(p)} className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="수정">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="삭제">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <ProductForm 
          product={editingProduct} 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleFormSave} 
        />
      )}
      </>
      )}

      {activeTab === 'users' && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">회원 관리</h1>
              <p className="text-gray-500 text-sm mt-1">가입된 전체 회원을 조회하고 관리합니다.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-bold">이름</th>
                    <th className="px-6 py-4 font-bold">이메일</th>
                    <th className="px-6 py-4 font-bold">가입경로</th>
                    <th className="px-6 py-4 font-bold">가입일시</th>
                    <th className="px-6 py-4 font-bold text-center">권한</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                        가입된 회원이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900">{u.name}</td>
                        <td className="px-6 py-4 text-gray-500">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${
                            u.provider === 'kakao' ? 'bg-yellow-100 text-yellow-800' :
                            u.provider === 'naver' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {u.provider.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(u.createdAt).toLocaleString('ko-KR')}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider ${
                            u.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'sales' && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">판매 및 마진 관리</h1>
              <p className="text-gray-500 text-sm mt-1">이커머스 비즈니스의 핵심인 매출과 이익을 한눈에 파악하세요.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 mb-2 font-bold text-sm">
                <Calendar className="w-4 h-4 text-blue-500" /> 오늘 일일 매출
              </div>
              <div className="text-2xl font-black text-gray-900">{dailySales.toLocaleString()}원</div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-50 text-red-600 px-2 py-1 text-[10px] font-bold rounded-bl-lg">순이익</div>
              <div className="flex items-center gap-2 text-gray-500 mb-2 font-bold text-sm">
                <TrendingUp className="w-4 h-4 text-red-500" /> 오늘 일일 마진
              </div>
              <div className="text-2xl font-black text-red-600">{dailyMargin.toLocaleString()}원</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 mb-2 font-bold text-sm">
                <Calendar className="w-4 h-4 text-blue-500" /> 이번 달 누적 매출
              </div>
              <div className="text-2xl font-black text-gray-900">{monthlySales.toLocaleString()}원</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm bg-blue-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 text-[10px] font-bold rounded-bl-lg">전체 마진</div>
              <div className="flex items-center gap-2 text-blue-700 mb-2 font-bold text-sm">
                <DollarSign className="w-4 h-4" /> 누적 총 마진금액
              </div>
              <div className="text-2xl font-black text-blue-900">{totalMargin.toLocaleString()}원</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-6">
            <div className="p-4 border-b border-gray-100 bg-slate-50 font-bold text-gray-700">
              최근 판매 및 마진 상세 내역
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-bold">결제일시</th>
                    <th className="px-6 py-4 font-bold">상품명</th>
                    <th className="px-6 py-4 font-bold text-right">수량</th>
                    <th className="px-6 py-4 font-bold text-right">판매가</th>
                    <th className="px-6 py-4 font-bold text-right">원가</th>
                    <th className="px-6 py-4 font-bold text-right">마진(이익)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sales.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                        판매 내역이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    sales.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(s.orderDate).toLocaleString('ko-KR')}
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900 line-clamp-1 max-w-[200px]">
                          {s.productName}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">{s.quantity}개</td>
                        <td className="px-6 py-4 text-right font-bold text-gray-900">{s.unitPrice.toLocaleString()}원</td>
                        <td className="px-6 py-4 text-right text-gray-500">{(s.totalCost / s.quantity).toLocaleString()}원</td>
                        <td className="px-6 py-4 text-right font-black text-red-600">
                          +{s.margin.toLocaleString()}원
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
