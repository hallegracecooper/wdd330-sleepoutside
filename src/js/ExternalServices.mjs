let baseURL = import.meta.env.VITE_SERVER_URL || 'https://wdd330-backend.onrender.com';

if (baseURL.endsWith('/')) {
  baseURL = baseURL.slice(0, -1);
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const url = `${baseURL}/products/search/${category}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.Result;
  }

  async getProductById(id) {
    const url = `${baseURL}/product/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.Result;
  }

  async findProductById(id) {
    return await this.getProductById(id);
  }

  async checkout(order) {
    const url = `${baseURL}/checkout`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }
} 