import { cart,saveTostorage } from "../../data/cart.js";


export function updateCartQuantity(){
  // calculating the Total Quantity
  let cartQuantity=0;

  cart.forEach((cartItem)=>{
    cartQuantity+=cartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;

  saveTostorage();
};