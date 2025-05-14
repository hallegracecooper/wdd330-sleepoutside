function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }
  async getData() {
    try {
      const response = await fetch(this.path);
      const data = await convertToJson(response);
      return data;
    } catch (err) {
      console.error("Error loading product data:", err);
      throw err;
    }
  }
  async findProductById(id) {
    try {
      const products = await this.getData();
      const product = products.find((item) => item.Id === id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return product;
    } catch (err) {
      console.error("Error finding product:", err);
      throw err;
    }
  }
}
