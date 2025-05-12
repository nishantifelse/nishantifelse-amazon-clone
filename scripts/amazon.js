import { cart, addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formateCurrency } from './utils/money.js';

loadProducts(renderProductsGrid); // callback to run in the future

function renderProductsGrid() {
  updateCartQuantity();
  
  let productsHTML = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  if (search){ //18P
    filteredProducts = products.filter((product)=>{
      let mathingKeyword = false;

      product.keywords.forEach((keyword)=>{
        if(keyword.toLowerCase().includes(search.toLowerCase())){
          mathingKeyword = true;
        }
      });

      return mathingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
      
    });
  }

  filteredProducts.forEach((product)=>{

    productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
              ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
            ${product.getPrice()}
            </div>

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
            
            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
          `;

  })

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  function updateCartQuantity(){

    let cartQuantity = 0;
      cart.forEach((cartItem)=>{
        cartQuantity += Number(cartItem.quantity) || 0;
      });
      
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
      console.log(cartQuantity === 0 ? 'cart is empty' : cartQuantity);
  }

  document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click', ()=>{
      const productId = button.dataset.productId;

      addToCart(productId);

      updateCartQuantity();
      
    });
    
  });

  document.querySelector('.js-search-button')
    .addEventListener('keydown', (event) => {
      if (event.key === 'Enter'){
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
      }
    });
}