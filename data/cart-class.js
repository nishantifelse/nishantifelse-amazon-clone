// oops // class
class Cart {
  cartItem ;
  #localStorageKey;

  constructor(localStorageKey) { //we will put code inside and it will run automaticaly
    
    this.#localStorageKey = localStorageKey;    // setup code //constructor let us put inside the class
    
    this.#loadFromStorage();

  }
  #loadFromStorage(){
    this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)); //this means this object
  
    if (!this.cartItem){
  
      this.cartItem = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
      }];
    
    }
  }

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
  }

  addToCart(productId){
  
    let matchingItem;
  
    this.cartItem.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
    
    if(matchingItem){
      matchingItem.quantity += 1;
    } else {
      this.cartItem.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }

  removeFromCart(productId){
    const newCart = [];
  
    this.cartItem.forEach((cartItem)=>{
      if (cartItem.productId != productId){
        newCart.push(cartItem);
      }
    });
  
    this.cartItem = newCart;
  
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId){
    
    let matchingItem;
  
    this.cartItem.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
  
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

  totalCartQuantity(){
    let CheckoutCartQuantity = 0;
  
    this.cartItem.forEach((cartItem)=>{
      CheckoutCartQuantity += Number(cartItem.quantity) || 0;
    });
  
    return CheckoutCartQuantity || 0 ;
  }

}


const cart = new Cart('cart-oop'); // instance of class
const BusinessCart = new Cart('cart-business'); //instance of class



console.log(cart);
console.log(BusinessCart);


console.log(BusinessCart instanceof Cart);