import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    console.log("Product Data:", this.product);
    this.renderProductDetails();

    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  renderProductDetails() {
    console.log("Rendering product details...");

    const imagePath =
      this.product.Images?.PrimaryLarge ||
      this.product.PrimaryImage ||
      "https://placehold.co/320x240?text=No+Image";

    document.querySelector('#productBrand').textContent = this.product.Brand?.Name || this.product.Brand;
    document.querySelector('#productNameWithoutBrand').textContent = this.product.NameWithoutBrand;
    document.querySelector('#productImage').src = imagePath;
    document.querySelector('#productImage').alt = this.product.Name;
    document.querySelector('#productPrice').textContent = `$${this.product.FinalPrice}`;
    document.querySelector('#productColor').textContent = this.product.Colors?.[0]?.ColorName || "N/A";
    document.querySelector('#productDescription').innerHTML = this.product.DescriptionHtmlSimple;

    console.log("Product details rendered successfully");
  }

  addProductToCart() {
    let cart = getLocalStorage('so-cart') || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
    updateCartCount();
    console.log("Product added to cart:", this.product.Name);
  }
} 