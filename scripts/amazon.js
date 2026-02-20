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

          <div class="product-price">${(product.priceCents / 100).toFixed(2)}</div>

          <div class="product-quantity-container">
            <select>
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

          <div class="added-to-cart">
            <img src="${product.image}" />
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
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    //  data-product-name="${product.name}">Add to Cart</button> take product name from button and log it
    // console.log(button.dataset.productName);
    const productId = button.dataset.productId;
    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
      });
    }
    let cartQuantity = 0;
    // to add product quantity in cart, loop through cart and add quantity of each item to cartQuantity
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  });
});
