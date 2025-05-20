export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'))||[];
}

export function saveTostorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    // first make the cart and its property like productName,quantity and deliveryOptionId
    let matchingItem;
      cart.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          matchingItem=cartItem;
        }
      });
        
      if(matchingItem){
        matchingItem.quantity+=1;
      }else{
        cart.push({
          productId:productId,
          quantity:1,
          deliveryOptionId:'1'
        });
      }

      saveTostorage();
  };

  export function removeFromCart(productId){
    const newCart=[];

    cart.forEach((cartItem)=>{
      if(cartItem.productId!= productId){
        newCart.push(cartItem);
      }
    });
    
    cart=newCart;

    saveTostorage();
    
  }

  export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
      cart.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          matchingItem=cartItem;
        }
      });

      matchingItem.deliveryOptionId=deliveryOptionId;

      saveTostorage();
  }
