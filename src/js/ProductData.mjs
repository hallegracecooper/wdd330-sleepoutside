let baseURL = import.meta.env.VITE_SERVER_URL || 'https://wdd330-backend.onrender.com';

// Remove any trailing slash to avoid double slashes in the URL
if (baseURL.endsWith('/')) {
  baseURL = baseURL.slice(0, -1);
}

export default class ProductData {
  constructor() {}

  async getData(category) {
    const url = `${baseURL}/products/search/${category}`;
    console.log("Fetching from:", url);  // ✅ Should show clean URL
    const response = await fetch(url);
    const data = await response.json();
    return data.Result; // ✅ Return the result array from API response
  }

  async getProductById(id) {
    const url = `${baseURL}/product/${id}`;
    console.log("Fetching single product:", url);
    const response = await fetch(url);
    const data = await response.json();
    return data.Result;
  }

  async findProductById(id) {
    return await this.getProductById(id);
  }
}