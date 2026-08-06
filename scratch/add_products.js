const fs = require('fs');
const path = require('path');

const jsonFile = path.join(__dirname, '../src/data/products.json');
let data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

const newProducts = [
  {
    id: 'slidacs-1',
    name: '정밀 슬라이닥스 1KVA (단상)',
    category: 'slidacs',
    categoryName: '슬라이닥스',
    price: 155000,
    image: '/images/banner_slidacs.jpg',
    subCategory: '단상 슬라이닥스',
    isRecommend: true
  },
  {
    id: 'slidacs-2',
    name: '정밀 슬라이닥스 3KVA (단상)',
    category: 'slidacs',
    categoryName: '슬라이닥스',
    price: 245000,
    image: '/images/banner_slidacs.jpg',
    subCategory: '단상 슬라이닥스',
    isBest: true,
    badges: ['베스트']
  },
  {
    id: 'inv-1',
    name: 'DARDA 차량용 인버터 12V 1000W',
    category: 'inverter',
    categoryName: '인버터',
    price: 189000,
    image: '/images/banner_inverter.jpg',
    subCategory: '차량용 인버터',
    isRecommend: true
  },
  {
    id: 'inv-2',
    name: 'DARDA 차량/산업용 인버터 24V 2000W',
    category: 'inverter',
    categoryName: '인버터',
    price: 320000,
    image: '/images/banner_inverter.jpg',
    subCategory: '산업용 인버터',
    isBest: true,
    badges: ['추천']
  }
];

// Append only if they don't exist
const existingIds = new Set(data.map(p => p.id));
newProducts.forEach(p => {
  if (!existingIds.has(p.id)) {
    data.push(p);
  }
});

fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
console.log('Added new products to products.json');

// Re-generate products.ts
const tsFile = path.join(__dirname, '../src/data/products.ts');
let tsContent = fs.readFileSync(tsFile, 'utf8');

// Replace the PRODUCTS_DATA array with a new one
// First, find the start of PRODUCTS_DATA array
const tsArrayStart = tsContent.indexOf('export const PRODUCTS_DATA: HanilProduct[] = [');
if (tsArrayStart !== -1) {
  const tsPre = tsContent.substring(0, tsArrayStart);
  
  // Format the array
  const formattedArray = data.map(p => {
    let props = [];
    props.push(`id: '${p.id}'`);
    props.push(`name: '${p.name}'`);
    props.push(`category: '${p.category}'`);
    props.push(`categoryName: '${p.categoryName}'`);
    props.push(`price: ${p.price}`);
    props.push(`image: '${p.image}'`);
    if (p.badges) props.push(`badges: ${JSON.stringify(p.badges)}`);
    if (p.subCategory) props.push(`subCategory: '${p.subCategory}'`);
    if (p.isBest) props.push(`isBest: ${p.isBest}`);
    if (p.isRecommend) props.push(`isRecommend: ${p.isRecommend}`);
    
    return `  { ${props.join(', ')} }`;
  }).join(',\n');

  const tsPost = `export const PRODUCTS_DATA: HanilProduct[] = [\n${formattedArray}\n];\n`;
  fs.writeFileSync(tsFile, tsPre + tsPost);
  console.log('Updated products.ts');
}
