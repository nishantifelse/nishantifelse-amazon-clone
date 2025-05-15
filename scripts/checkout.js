import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import {loadProductsFetch } from "../data/products.js";
import {loadCartFetch } from "../data/cart.js";
// import '../data/cart-class.js'; // runn every contain in this file
// import '../data/backend-practice.js';

async function loadPage(){
  try {
    await Promise.all([ // 18I
      loadProductsFetch(),
      loadCartFetch()
    ]);

  } catch (error){
    console.log('unexpected error, please try again later..');
  }
  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary(); 
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })

]).then((value)=>{
  console.log(value);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve('value1');
  });

}).then((value)=>{
  console.log(value);
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });

}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});


loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/