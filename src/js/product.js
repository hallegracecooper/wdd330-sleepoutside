import { getParam } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();

const dataSource = new ExternalServices();
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();
