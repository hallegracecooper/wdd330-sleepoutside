import ProductData from './ProductData.js';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from "./utils.mjs";
import Alert from './Alert.js';

const category = 'tents';
const dataSource = new ProductData(category);
const element = document.querySelector('.product-list');
const productList = new ProductList(category, dataSource, element);

const alert = new Alert();
alert.init();
productList.init();

loadHeaderFooter();

// ... existing code ...
