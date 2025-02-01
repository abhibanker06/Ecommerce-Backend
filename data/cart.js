export const cart=[];

export function addToCart(productId){
    // first make the cart and its property like productName and quantity
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
          quantity:1
        });
      }
  };