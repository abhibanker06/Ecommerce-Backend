import {orders} from '../data/orders.js';
import { getProduct } from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartQuantity } from './utils/cartQuantity.js';

function rendorPlaceOrderSummary(){

    let placeOrderSummaryHTML='';
    orders.forEach((orderItems) => {
        let orderProductsHTML = '';
        const products = orderItems.products;
        products.forEach((product)=>{
            const productId = product.productId;
            const deliveryDate=product.estimatedDeliveryTime;
            const matchingProduct = getProduct(productId);

            orderProductsHTML+=
            `
            <div class="order-product">
                <div class="product-image-container">
                    <img src="${matchingProduct.image}">
                </div>

                <div class="product-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${dayjs(deliveryDate).format('MMMM D YYYY')}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${product.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <span class="buy-again-message">Cancel Order</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html?orderId=${orderItems.id}&productId=${matchingProduct.id}">
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                </div>

            </div>
            `;
            
        });

        placeOrderSummaryHTML+=
      `
      <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(orderItems.orderTime).format('MMMM D YYYY')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderItems.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItems.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${orderProductsHTML}
          </div>
        </div>
      
      `;    
      });      


      document.querySelector('.js-place-order').innerHTML=placeOrderSummaryHTML;
}

updateCartQuantity();
rendorPlaceOrderSummary();


