import ProductData from './ProductData.js';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from "./utils.mjs";
import Alert from './Alert.js';

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const productList = new ProductList('tents', dataSource, element);

const alert = new Alert();
alert.init();
productList.init();

loadHeaderFooter();

// ... existing code ...
