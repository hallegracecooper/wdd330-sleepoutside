import { getLocalStorage, updateCartCount } from "./utils.mjs";
import cartItemTemplate from "./cartItemTemplate.mjs";

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  async init() {
    const cartItems = getLocalStorage(this.key);
    console.log("Cart Items:", cartItems); // Debug log
    this.renderCartContents(cartItems);
    updateCartCount();
  }

  renderCartContents(cartItems) {
    const cartHTML = document.querySelector(this.parentSelector);
    const cartFooter = document.querySelector("#cart-footer");
    
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      console.log("Cart is empty or invalid"); // Debug log
      cartHTML.innerHTML = "";
      cartFooter.classList.add("hide");
      return;
    }

    console.log("About to render items:", cartItems); // Debug log
    cartHTML.innerHTML = cartItems.map((item) => {
      console.log("Rendering item:", item); // Debug log for each item
      return cartItemTemplate(item);
    }).join("");
    
    // Calculate and display total
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.getElementById("cart-total").textContent = total.toFixed(2);
    cartFooter.classList.remove("hide");
  }
} 