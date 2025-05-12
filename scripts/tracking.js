import { getOrder } from "../data/orders.js";
import {getProduct, loadProductsFetch, products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders } from "../data/orders.js";
import { formateCurrency } from "./utils/money.js";
console.log(orders);
async function loadPage() {
  await loadProductsFetch();
  
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  

  const order = getOrder(orderId);
  const product = getProduct(productId);

  let productDetails;
  let priceCents;

  order.products.forEach((details) => {
    if (details.productId === product.id){
      productDetails = details;
      priceCents = product.priceCents;
    }
  });



  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveyTime);
  const percentProgress = ((today - orderTime)/(deliveryTime - orderTime));
  const deliveryMessage = percentProgress < 100 ? 'Arriving on' : 'Delivered on';

  
  const trackingHTML = `
         <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
        ${deliveryMessage} ,
          ${dayjs(productDetails.estimatedDeliveyTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>
        <div>Price : &#8377;${formateCurrency(priceCents)* productDetails.quantity}</div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${
        percentProgress < 50 ? 'current-status' : ''
      }">
            Preparing
          </div>
          <div class="progress-label ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
      }">
            Shipped
          </div>
          <div class="progress-label ${
        percentProgress >= 100 ? "current-status" : ''
      }">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;"></div>
        </div>
  `;
  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}
loadPage();