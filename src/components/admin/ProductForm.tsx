"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Upload, Save, Loader2 } from 'lucide-react';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
  onSave: () => void;
}

export default function ProductForm({ product, onClose, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState({
    id: product?.id || '',
    name: product?.name || '',
    category: product?.category || 'industrial',
    categoryName: product?.categoryName || '공업용 변압기',
    subCategory: product?.subCategory || '',
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    image: product?.image || '',
    inputVoltage: product?.inputVoltage || '',
    outputVoltage: product?.outputVoltage || '',
    capacity: product?.capacity || '',
    description: product?.description || '',
    costPrice: product?.costPrice || 0,
    detailImage: product?.detailImage || '',
  });

  const formDataRef = useRef(formData);
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingDetail, setIsUploadingDetail] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['price', 'originalPrice', 'costPrice'].includes(name) ? Number(value) : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.url) {
        setFormData(prev => ({ ...prev, image: result.url }));
      } else {
        alert('업로드 실패');
      }
    } catch (error) {
      console.error(error);
      alert('업로드 중 오류 발생');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDetailImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploadingDetail(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.url) {
        setFormData(prev => ({ ...prev, detailImage: result.url }));
      } else {
        alert('업로드 실패');
      }
    } catch (error) {
      console.error(error);
      alert('업로드 중 오류 발생');
    } finally {
      setIsUploadingDetail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formElement = e.currentTarget;
    const domFormData = new FormData(formElement);
    
    // Fallback directly to DOM elements if FormData behaves weirdly
    const getVal = (name: string) => {
      const el = formElement.querySelector(`[name="${name}"]`) as HTMLInputElement;
      return el ? el.value : '';
    };

    const payload = {
      id: product?.id || '',
      name: domFormData.get('name') as string || getVal('name') || '',
      category: domFormData.get('category') as string || getVal('category') || 'industrial',
      categoryName: domFormData.get('categoryName') as string || getVal('categoryName') || '공업용 변압기',
      subCategory: domFormData.get('subCategory') as string || getVal('subCategory') || '',
      price: Number(domFormData.get('price') || getVal('price')) || 0,
      originalPrice: Number(domFormData.get('originalPrice') || getVal('originalPrice')) || 0,
      costPrice: Number(domFormData.get('costPrice') || getVal('costPrice')) || 0,
      image: domFormData.get('image') as string || getVal('image') || '',
      detailImage: domFormData.get('detailImage') as string || getVal('detailImage') || '',
      inputVoltage: domFormData.get('inputVoltage') as string || getVal('inputVoltage') || '',
      outputVoltage: domFormData.get('outputVoltage') as string || getVal('outputVoltage') || '',
      capacity: domFormData.get('capacity') as string || getVal('capacity') || '',
      description: domFormData.get('description') as string || getVal('description') || '',
    };
    
    const isEdit = !!product?.id;
    const url = isEdit ? `/api/products/${product.id}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        onSave();
        onClose();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`저장에 실패했습니다: ${errorData.error || errorData.details || res.status}\n\n전송된 데이터: ${JSON.stringify(errorData.receivedBody || payload)}`);
      }
    } catch (error) {
      console.error(error);
      alert(`저장 중 오류 발생: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-black text-gray-900">
            {product ? '상품 수정' : '새 상품 등록'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form id="productForm" onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Image Upload Area */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">상품 사진</label>
              <div className="flex gap-4 items-start">
                <div className="w-32 h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0 relative group">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-gray-400 p-2">
                      <Upload className="w-6 h-6 mx-auto mb-1 opacity-50" />
                      <span className="text-[10px] font-bold">이미지 없음</span>
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors w-fit text-sm font-bold">
                    <Upload className="w-4 h-4" /> PC에서 사진 선택
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <p className="text-xs text-gray-500">
                    권장 사이즈: 800x800px (1:1 비율)<br/>
                    또는 이미지 URL 직접 입력:
                  </p>
                  <input
                    type="text"
                    name="image"
                    defaultValue={formData.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">상품명 *</label>
                <input type="text" name="name" defaultValue={formData.name} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">카테고리 분류명 * (표시용)</label>
                <input type="text" name="categoryName" defaultValue={formData.categoryName} onChange={handleChange} placeholder="예: 공업용 변압기" className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">카테고리 ID *</label>
                <select name="category" defaultValue={formData.category} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option value="industrial">industrial (공업용)</option>
                  <option value="oil">oil (유입식)</option>
                  <option value="avr">avr (AVR자동전압기)</option>
                  <option value="panel">panel (판넬용트랜스)</option>
                  <option value="home">home (가정용)</option>
                  <option value="global">global (해외용)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">서브 카테고리</label>
                <input type="text" name="subCategory" defaultValue={formData.subCategory} onChange={handleChange} placeholder="예: 삼상 단권" className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">판매가 *</label>
                <input type="number" name="price" defaultValue={formData.price} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>
              <div className="space-y-1 flex gap-2">
                <div className="flex-1 space-y-1">
                  <label className="block text-sm font-bold text-gray-700">원가 (마진계산용, 고객미노출)</label>
                  <input type="number" name="costPrice" defaultValue={formData.costPrice} onChange={handleChange} className="w-full p-2.5 border border-red-200 bg-red-50 rounded-lg focus:border-red-500 focus:outline-none" />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="block text-sm font-bold text-gray-700">소비자가 (할인표시용)</label>
                  <input type="number" name="originalPrice" defaultValue={formData.originalPrice} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">용량</label>
                <input type="text" name="capacity" defaultValue={formData.capacity} onChange={handleChange} placeholder="예: 3kVA" className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>
              <div className="space-y-1 flex gap-2">
                <div className="flex-1 space-y-1">
                  <label className="block text-sm font-bold text-gray-700">입력전압</label>
                  <input type="text" name="inputVoltage" defaultValue={formData.inputVoltage} onChange={handleChange} placeholder="220V" className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="block text-sm font-bold text-gray-700">출력전압</label>
                  <input type="text" name="outputVoltage" defaultValue={formData.outputVoltage} onChange={handleChange} placeholder="110V" className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700">상세 설명</label>
              <textarea name="description" defaultValue={formData.description} onChange={handleChange} rows={4} className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none" placeholder="제품에 대한 상세한 설명을 입력하세요..."></textarea>
            </div>

            {/* Detail Image Upload Area */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">상세 설명 이미지</label>
              <div className="flex gap-4 items-start">
                <div className="w-32 h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0 relative group">
                  {formData.detailImage ? (
                    <img src={formData.detailImage} alt="Detail Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-blue-500 p-2">
                      <div className="font-black text-[11px] bg-blue-100 text-blue-700 px-2 py-1 rounded mb-1 mx-1 leading-tight">AI 프리미엄<br/>템플릿 적용됨</div>
                    </div>
                  )}
                  {isUploadingDetail && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors w-fit text-sm font-bold">
                    <Upload className="w-4 h-4" /> PC에서 상세 이미지 선택
                    <input type="file" accept="image/*" onChange={handleDetailImageUpload} className="hidden" />
                  </label>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    <span className="text-blue-600 font-bold">💡 이미지를 등록하지 않으면 고품질 프리미엄 템플릿이 자동 적용됩니다!</span><br/>
                    직접 등록 권장 사이즈: 가로 800px 이상<br/>
                    또는 이미지 URL 직접 입력:
                  </p>
                  <input
                    type="text"
                    name="detailImage"
                    defaultValue={formData.detailImage}
                    onChange={handleChange}
                    placeholder="https://... (비워두면 프리미엄 템플릿 적용)"
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
              취소
            </button>
            <button type="submit" disabled={isSaving} className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-2 transition-all shadow-md disabled:opacity-50">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
