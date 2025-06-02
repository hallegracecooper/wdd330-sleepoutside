import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  let imagePath;
  if (product.Images && product.Images.PrimaryLarge) {
    imagePath = product.Images.PrimaryLarge;
  } else if (product.PrimaryImage) {
    imagePath = product.PrimaryImage;
  } else {
    imagePath = "https://via.placeholder.com/320x240?text=No+Image";
  }

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}&category=${product.Category}">
      <img
        src="${imagePath}"
        alt="Image of ${product.Name}"
        onerror="this.onerror=null; this.src='/images/tents/${product.Id.toLowerCase()}_01~320.jpg';"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    console.log("First product from API:", list[0]); // You can remove this after confirming it's fixed
    this.renderList(list);
    this.updateTitle();
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  updateTitle() {
    const title = document.querySelector('.products h2');
    if (title) {
      // Capitalize first letter of category and replace hyphens with spaces
      const formattedCategory = this.category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      title.textContent = `Top Products: ${formattedCategory}`;
    }
  }
}
