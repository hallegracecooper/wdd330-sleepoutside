import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from "./utils.mjs";

// ✅ Step 1: Get category from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category');

if (!category) {
  console.error("❌ Missing category in URL!");
} else {
  // ✅ Step 2: Use ProductData and ProductList with the category
  const dataSource = new ProductData();
  const element = document.querySelector('.product-list');
  const productList = new ProductList(category, dataSource, element);

  productList.init();
}

loadHeaderFooter();