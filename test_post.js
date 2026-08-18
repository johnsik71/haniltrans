const http = require('http');

async function request(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3006,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data ? JSON.parse(data) : null
        });
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log("POST /api/products");
  const res = await request('/api/products', 'POST', {
    name: "Test POST Product",
    category: "home",
    categoryName: "Home Transformer",
    price: 15000,
    detailImage: "https://example.com/detail.jpg"
  });
  console.log("Status:", res.status, res.data);
}

runTests().catch(console.error);
