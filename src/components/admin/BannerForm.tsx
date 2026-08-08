"use client";

import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

export default function BannerForm({ 
  onClose, 
  onSuccess,
  initialData = null 
}: { 
  onClose: () => void, 
  onSuccess: () => void,
  initialData?: any 
}) {
  const [formData, setFormData] = useState({
    badge: 'HOT EVENT',
    title: 'B2B 대량구매\n특별 할인전',
    subtitle: '맞춤형 특수사양 변압기\n공장직영 최저가 견적',
    link: '/qna',
    isActive: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        badge: initialData.badge || '',
        title: initialData.title || '',
        subtitle: initialData.subtitle || '',
        link: initialData.link || '',
        isActive: initialData.isActive !== false
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = initialData ? `/api/banners/${initialData.id}` : '/api/banners';
      const method = initialData ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{initialData ? '사이드 배너 수정' : '새 사이드 배너 등록'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="banner-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">뱃지 텍스트</label>
              <input 
                type="text" 
                name="badge" 
                value={formData.badge} 
                onChange={handleChange} 
                placeholder="예: HOT EVENT"
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">메인 타이틀 (줄바꿈 가능)</label>
              <textarea 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required
                rows={2}
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">서브 타이틀 (줄바꿈 가능)</label>
              <textarea 
                name="subtitle" 
                value={formData.subtitle} 
                onChange={handleChange} 
                rows={2}
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">이동할 링크 URL</label>
              <input 
                type="text" 
                name="link" 
                value={formData.link} 
                onChange={handleChange} 
                required
                placeholder="예: /qna 또는 /category/industrial"
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox" 
                id="isActive" 
                name="isActive" 
                checked={formData.isActive} 
                onChange={handleChange} 
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm font-bold text-gray-700 cursor-pointer">활성화 (사이드바에 노출)</label>
            </div>
          </form>
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button 
            type="submit" 
            form="banner-form" 
            disabled={loading}
            className="px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
