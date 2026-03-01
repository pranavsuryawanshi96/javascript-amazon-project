import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../../utils/money.js";
import { updateCartQuantity } from "../../data/cart.js";
import deliveryOption from "../../data/deliveryOption.js";
// import from external library of date online without scrips tag in html, we can import it here and use it in this file
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
// using external library of date
const today = dayjs();
const deliveryDate = today.add(7, "days");
deliveryDate.format("dddd, MMMM D");
// to combine html together create a variable
export function renderOrderSummary() {
  let cartSummeryHTML = "";
  cart.forEach((cartItem) => {
    // we have to get the product details for each cart item, so we need to find the product in the products array that matches the productId in the cart item
    const productID = cartItem.productId;
    // to save the result and loop to products array, we need to create a variable to save the matching product
    let matchingProduct;
    // here we can check id property equal productId in cart item, if it is then we can save the product in the variable matchingProduct
    products.forEach((product) => {
      if (product.id === productID) {
        matchingProduct = product;
      }
    });
    // Step 1: Get delivery option ID from cart
    const deliveryOptionID = cartItem.deliveryOptionID;
    // Step 2: Create variable to store matched object
    let matchingDeliveryOption;
    // Step 3: Loop through deliveryOption array
    deliveryOption.forEach((option) => {
      if (option.id === deliveryOptionID) {
        matchingDeliveryOption = option;
      }
    });
    const today = dayjs();
    const deliveryDate = today.add(matchingDeliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    cartSummeryHTML += `
     <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${matchingProduct.getPrice()}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-link"
                  data-product-id="${matchingProduct.id}">
                  <input class="quantity-input"/>
                  <span class="save-quantity-link">Save</span>
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option: 
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
          </div>    

    `;
  });
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOption.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)}
        - `;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionID;

      html += `
      <div class="delivery-option js-delivery-option"
     data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                      ${isChecked ? "checked" : ""}
                  />
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${priceString} - Shipping</div>
                  </div>
                  </div>
    `;
    });
    return html;
  }

  // to load the html in the page of product
  document.querySelector(".js-order-summary").innerHTML = cartSummeryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderOrderSummary();
    });
  });

  document.querySelectorAll(".delivery-option-input").forEach((radio) => {
    radio.addEventListener("change", (event) => {
      const container = event.target.closest(".js-delivery-option");

      const productId = container.dataset.productId;
      const deliveryOptionID = container.dataset.deliveryOptionId;
      console.log("productId:", productId);
      updateDeliveryOption(productId, deliveryOptionID);

      renderOrderSummary();
    });
  });
}
updateCartQuantity();
updateCheckoutHeader();
function updateCheckoutHeader() {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  document.querySelector(".js-return-to-home-link").innerHTML =
    `${totalQuantity} items`;
}
