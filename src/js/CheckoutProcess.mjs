import { getLocalStorage, loadHeaderFooter, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
    this.addSubmitListener();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((sum, item) => {
      const price = parseFloat(item.FinalPrice || item.price || 0);
      const qty = parseInt(item.Quantity || item.quantity || 1);
      return sum + price * qty;
    }, 0);

    const subtotalElement = document.querySelector(`${this.outputSelector} #summary-subtotal`);
    if (subtotalElement) {
      subtotalElement.innerText = this.itemTotal.toFixed(2);
    }

    this.calculateOrderTotal();
  }

  calculateOrderTotal() {
    const totalItems = this.list.reduce((sum, item) => {
      const qty = parseInt(item.Quantity || item.quantity || 1);
      return sum + qty;
    }, 0);

    this.tax = this.itemTotal * 0.06;
    this.shipping = totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxElement = document.querySelector(`${this.outputSelector} #summary-tax`);
    const shippingElement = document.querySelector(`${this.outputSelector} #summary-shipping`);
    const totalElement = document.querySelector(`${this.outputSelector} #summary-total`);

    if (taxElement) taxElement.innerText = this.tax.toFixed(2);
    if (shippingElement) shippingElement.innerText = this.shipping.toFixed(2);
    if (totalElement) totalElement.innerText = this.orderTotal.toFixed(2);
  }

  packageItems(items) {
    return items.map(item => {
      return {
        id: item.Id || item.id,
        name: item.Name || item.name,
        price: item.FinalPrice || item.price,
        quantity: item.Quantity || item.quantity || 1
      };
    });
  }

  formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
      convertedJSON[key] = value;
    });
    return convertedJSON;
  }

  async checkout(form) {
    const order = this.formDataToJSON(form);

    // Enrich order data with calculated fields
    order.orderDate = new Date().toISOString();
    order.items = this.packageItems(this.list);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;

    try {
      // 🔁 Attempt to submit the order to the server
      const result = await this.services.checkout(order);

      console.log("✅ Order submitted:", result);
      alert("Order submitted successfully!");

      // Clear the cart and redirect to success page
      localStorage.removeItem(this.key);
      window.location.href = "/checkout/success.html";
    } catch (err) {
      // 🛑 Catch and handle errors thrown from ExternalServices.checkout()
      console.error("❌ Order failed:", err);

      if (err.name === 'servicesError') {
        const serverMessage = err.message.message || "There was a problem with your order.";
        alertMessage(serverMessage);
      } else {
        alertMessage("An unexpected error occurred. Please try again.");
      }
    }
  }

  addSubmitListener() {
    const form = document.querySelector("#checkout-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const isValid = form.checkValidity();
        form.reportValidity(); // this will show built-in browser error hints

        if (isValid) {
          this.checkout(form);
        }
      });
    }
  }
}
