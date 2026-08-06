const fs = require('fs');
const path = require('path');

const imageMap = {
  industrial: '/images/banner_industrial.jpg',
  oil: '/images/banner_oil.jpg',
  avr: '/images/banner_avr.jpg',
  panel: '/images/banner_panel.jpg',
  slidacs: '/images/banner_slidacs.jpg',
  inverter: '/images/banner_inverter.jpg',
  'phase-single': '/images/banner_industrial.jpg',
  'phase-double': '/images/banner_industrial.jpg',
  home: '/images/banner_avr.jpg',
  global: '/images/banner_avr.jpg'
};

const jsonFile = path.join(__dirname, '../src/data/products.json');
let data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

data.forEach(product => {
  if (imageMap[product.category]) {
    product.image = imageMap[product.category];
  }
});

fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
console.log('Updated products.json');

// Update products.ts
const tsFile = path.join(__dirname, '../src/data/products.ts');
let tsContent = fs.readFileSync(tsFile, 'utf8');

const regex = /\{([^}]+)\}/g;
tsContent = tsContent.replace(regex, (match, inner) => {
  const categoryMatch = inner.match(/category:\s*'([^']+)'/);
  if (categoryMatch && categoryMatch[1]) {
    const cat = categoryMatch[1];
    if (imageMap[cat]) {
      return match.replace(/image:\s*'[^']+'/, `image: '${imageMap[cat]}'`);
    }
  }
  return match;
});

fs.writeFileSync(tsFile, tsContent);
console.log('Updated products.ts');
