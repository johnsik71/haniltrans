const fs = require('fs');
let c = fs.readFileSync('src/components/admin/ProductForm.tsx', 'utf8');

const head = c.split('const handleSubmit')[0];
const tail = c.split('<div className="p-6 overflow-y-auto flex-1 space-y-6">')[1];

const replacement = `const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formElement = e.currentTarget;
    const domFormData = new FormData(formElement);
    
    // Fallback directly to DOM elements if FormData behaves weirdly
    const getVal = (name: string) => {
      const el = formElement.querySelector(\`[name="\${name}"]\`) as HTMLInputElement;
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
    const url = isEdit ? \`/api/products/\${product.id}\` : '/api/products';
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
        alert(\`저장에 실패했습니다: \${errorData.error || errorData.details || res.status}\\n\\n전송된 데이터: \${JSON.stringify(errorData.receivedBody || payload)}\`);
      }
    } catch (error) {
      console.error(error);
      alert(\`저장 중 오류 발생: \${error instanceof Error ? error.message : 'Unknown error'}\`);
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
          <div className="p-6 overflow-y-auto flex-1 space-y-6">`;

fs.writeFileSync('src/components/admin/ProductForm.tsx', head + replacement + tail);
console.log('File successfully reconstructed!');
