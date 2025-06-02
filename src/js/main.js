import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from "./utils.mjs";
import Alert from './Alert.js';

// Optional: Let home still show tents OR get from URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category') || 'tents'; // fallback to 'tents'

const dataSource = new ProductData();
const element = document.querySelector('.product-list');

<const productList = new ProductList(category, dataSource, element);
productList.init();

const alert = new Alert();
alert.init();

productList.init();

loadHeaderFooter();
