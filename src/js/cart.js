import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();

// Add click event listener to checkout button
document.getElementById('checkout-button').addEventListener('click', () => {
  window.location.href = '/checkout/index.html';
});
