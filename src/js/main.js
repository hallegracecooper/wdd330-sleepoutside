import ProductData from './ProductData.js';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const productList = new ProductList('tents', dataSource, element);
productList.init();

loadHeaderFooter();

// ... existing code ...
