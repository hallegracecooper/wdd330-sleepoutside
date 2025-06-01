import { getLocalStorage } from "./utils.mjs";
import cartItemTemplate from "./cartItemTemplate.mjs";

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  async init() {
    const cartItems = getLocalStorage(this.key);
    this.renderCartContents(cartItems);
  }

  renderCartContents(cartItems) {
    const cartHTML = document.querySelector(this.parentSelector);
    const cartFooter = document.querySelector("#cart-footer");
    
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      cartHTML.innerHTML = "";
      cartFooter.classList.add("hide");
      return;
    }

    cartHTML.innerHTML = cartItems.map((item) => cartItemTemplate(item)).join("");
    
    // Calculate and display total
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.getElementById("cart-total").textContent = total.toFixed(2);
    cartFooter.classList.remove("hide");
  }
} 