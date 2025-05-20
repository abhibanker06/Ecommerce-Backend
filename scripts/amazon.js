// Note:to get modules to work we need to open it with live server
import {addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updateCartQuantity } from './utils/cartQuantity.js';


function rendorProdcuts(productList){
  let productHtml='';
  productList.forEach((product)=>{
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
            $${formatCurrency(product.priceCents)}
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

document.querySelector('.js-products-grid').innerHTML=productHtml;
}
rendorProdcuts(products);

updateCartQuantity();

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

    });
});


function handleSearch(){
  const searchInput = document.querySelector('.js-search-bar').value.toLowerCase();
  const productsGrid = document.querySelector('.js-products-grid');
  productsGrid.removeAttribute('style');

  const filteredProducts = products.filter((product) => {
    // Check if the product name includes the search text
    const nameMatch = product.name.toLowerCase().includes(searchInput);

    // Check if any keyword includes the search text
    const keywordMatch = product.keywords.some(keyword =>
      keyword.toLowerCase().includes(searchInput)
    );

    return nameMatch || keywordMatch;
  });

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `<div class="no-results">
    <img src="https://img.icons8.com/?size=100&id=ZQVLPXCCdZMh&format=png&color=000000">
    <p>Sorry,No products found!</p>
    <p id="not-available">Please check the spelling or try searching for something else</p>
    </div>
    `;
    productsGrid.style.display = 'flex';
    productsGrid.style.justifyContent = 'center';
    productsGrid.style.alignItems = 'center';
    productsGrid.style.minHeight = '500px';
    return;
  }

  rendorProdcuts(filteredProducts);
  // Reattach event listeners to the Add to Cart buttons
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();

      const addedMessage = document.querySelector(`.js-added-checkmark-${productId}`);
      addedMessage.classList.add('js-added-checkmark-visible');

      setTimeout(() => {
        addedMessage.classList.remove('js-added-checkmark-visible');
      }, 4000);
    });
  });

}

document.querySelector('.js-search-bar').addEventListener('keydown', (event)=>{
  if (event.key === 'Enter') {
    handleSearch();
  }
});

document.querySelector('.js-search-button').addEventListener('click',handleSearch);

