import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-oop.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";
// take dat from backend api by loadProducts

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    //once loadCart finish runs the fn
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderOrderSummary();
});

// promise;

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve("value");
//   });
// })
//   .then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//       //once loadCart finish runs the fn
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderOrderSummary();
//   });

/*
loadProducts(() => {
    //wait for finish
  loadCart(() => {
    renderOrderSummary();
  });
});
*/
