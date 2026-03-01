function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionID: "1",
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionID: "2",
          },
        ];
      }
    },

    saveStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      const quantitySelector = document.querySelector(
        `.js-product-quantity${productId}`,
      );
      const quantity = Number(quantitySelector.value);

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: quantity,
          deliveryOptionID: "1",
        });
      }
      this.saveStorage();
    },
    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveStorage();
    },

    updateDeliveryOption(productId, deliveryOptionID) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        console.log(cartItem.productId);
        if (String(cartItem.productId).trim() === String(productId).trim()) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionID = deliveryOptionID;

      this.saveStorage();
    },

    //
    updateCartQuantity() {
      let cartQuantity = 0;
      // to add product quantity in cart, loop through cart and add quantity of each item to cartQuantity
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      const quantityElement = document.querySelector(".js-cart-quantity");

      if (!quantityElement) return;

      quantityElement.innerHTML = cartQuantity;
    },
  };
  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart();

cart.loadFromStorage();
cart.updateCartQuantity();
console.log(cart);
