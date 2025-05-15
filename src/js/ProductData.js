export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  async getData() {
    const response = await fetch(this.path);
    const data = await response.json();
    return data;
  }
} 