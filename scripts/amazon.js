import { cart, addToCart } from "../data/cart.js";
import { formatCurrency } from "../utils/money.js";
//why here we are importing cart from cart.js? because we want to use the cart variable in this file to add items to the cart and update the cart quantity in the header. if we don't import cart from cart.js for the product also, we won't be able to access the cart variable in this file and we won't be able to add items to the cart or update the cart quantity in the header.
import { products } from "../data/products.js";
let productsHTML = "";
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">${formatCurrency(product.priceCents)}</div>

          <div class="product-quantity-container">
            <select class="js-product-quantity${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="/images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
        //  for each product, add data attribute with product name to the button
          data-product-id="${product.id}">Add to Cart</button>
        </div>
    `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

// add btn to cart when add to cart button is clicked
function updateCartQuantity() {
  let cartQuantity = 0;
  // to add product quantity in cart, loop through cart and add quantity of each item to cartQuantity
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    //  data-product-name="${product.name}">Add to Cart</button> take product name from button and log it
    // console.log(button.dataset.productName);
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
    // after adding to cart, show the added to cart message
    const addedToCartMessage = document.querySelector(
      `.js-added-to-cart-${productId}`,
    );
    addedToCartMessage.classList.add("show");
  });
});
