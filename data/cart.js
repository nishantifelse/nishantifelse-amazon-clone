export let cart; //prosudural programing: a set of step-step instruction

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart){

    cart = [{
      productId,
      quantity,
      deliveryOptionId
    }];
  
  }
}



function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){

  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  
  if(matchingItem){
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
  totalCartQuantity();
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem)=>{
    if (cartItem.productId != productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
  totalCartQuantity();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }

  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
/*
export function loadCart(fun){ 
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', ()=>{
    console.log(xhr.response);
    
    fun(); // callback function 
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}
*/
export function totalCartQuantity(){
  let CheckoutCartQuantity = 0;

  cart.forEach((cartItem)=>{
    CheckoutCartQuantity += Number(cartItem.quantity) || 0;
  });

  return CheckoutCartQuantity || 0 ;
}
//18 H
export async function loadCartFetch(fun) {
  const response = await fetch('https://supersimplebackend.dev/cart');
  
  const textvalue = await response.text();
  console.log(textvalue);
  return textvalue;
}

export function resetCart() {
  cart = [];
  saveToStorage();
}