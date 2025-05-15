import { cart, removeFromCart, updateDeliveryOption, totalCartQuantity, updateQuantity } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { formateCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOption.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary(){

  let cartSummaryHtml = '';

  cart.forEach((cartItem)=>{

    const productId =  cartItem.productId;

    let matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHtml +=
          `
              <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                      ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                        Update
                      </span>
                      <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                      <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                      <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
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
          
          `;
  });

function deliveryOptionsHTML (matchingProduct, cartItem){
  let html = '';
  deliveryOptions.forEach((deliveryOption)=>{
    const dateString = calculateDeliveryDate(deliveryOption);
    const priceString = deliveryOption.priceCents === 0 ? 'FREE': `&#8377;${formateCurrency(deliveryOption.priceCents)} -` ;

    const ischecked = deliveryOption.id === cartItem.deliveryOptionId;
    html += `
              <div class="delivery-option js-delivery-option"
              data-product-id="${matchingProduct.id}"
              data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${ischecked ? 'checked': ''}
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
              </div>
            `
  });
  return html;
}



document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
    link.addEventListener('click', ()=>{
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      renderCheckoutHeader();
       renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
      element.addEventListener('click', ()=>{
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

    document.querySelectorAll('.js-update-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
      });
    });

    document.querySelectorAll('.js-save-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const inputValue = Number(quantityInput.value);
        const container = document.querySelector(
        `.js-cart-item-container-${productId}`
        );
        updateQuantity(productId, inputValue);
      container.classList.remove('is-editing-quantity');
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

}

