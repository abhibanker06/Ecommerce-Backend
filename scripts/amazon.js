// Note:to get modules to work we need to open it with live server
import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';

let productHtml='';

products.forEach((product)=>{
    productHtml+=`
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
              src="images/ratings/rating-${product.rating.stars *10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            <!--toFixed() fun formats the number to a fixed decimal place and return it as string.-->
            $${(product.priceCents/100).toFixed(2)}
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
              <option value="11">11</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-checkmark-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <!--data attribute is used to store data on html element-->
          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-Id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});

// console.log(productHtml);

document.querySelector('.js-products-grid').innerHTML=productHtml;



function updateCartQuantity(){
  // calculating the Total Quantity
  let cartQuantity=0;

  cart.forEach((cartItem)=>{
    cartQuantity+=cartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
};


// making Add to cart button interactive
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
      // dataset property gives all the data attributes that is attached to this button
        const productId=button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();

        // displaying the added msg after clicking add to cart button.
        const addedMessage=document.querySelector(`.js-added-checkmark-${productId}`);

        addedMessage.classList.add('js-added-checkmark-visible');

        setInterval(()=>{
          addedMessage.classList.remove('js-added-checkmark-visible')
        },4000);

        console.log(cartQuantity);
        console.log(cart);
    });
});



