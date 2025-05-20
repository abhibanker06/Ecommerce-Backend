import { getMyOrder } from '../data/orders.js';
import { getProduct } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartQuantity } from './utils/cartQuantity.js';

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');


const matchingOrder=getMyOrder(orderId);
const products=matchingOrder.products;
const matchingProduct=getProduct(productId);

const matchingItem=getMyItem(productId);
let deliveryDate=matchingItem.estimatedDeliveryTime;
const quantity=matchingItem.quantity;

function rendortrackingSummary(){
    let trackingSummaryHTML='';
    

    trackingSummaryHTML+=
    `
    
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>

        <div class="delivery-date">
            Arriving on ${dayjs(deliveryDate).format('MMMM D YYYY')}
        </div>

        <div class="product-info">
            ${matchingProduct.name}
        </div>

        <div class="product-info">
            Quantity: ${quantity}
        </div>

        <div class="product-image-container">
            <img class="product-image" src="${matchingProduct.image}">
        </div>

        <div class="progress-labels-container">
            <div class="progress-label">
            Preparing
            </div>
            <div class="progress-label">
            Shipped
            </div>
            <div class="progress-label">
            Delivered
            </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>

        
    `;

    

    document.querySelector('.js-track-orders').innerHTML=trackingSummaryHTML;

}

function getMyItem(productId){
    let matchingItem;
    products.forEach((item)=>{
        
        if(productId===item.productId){
            matchingItem=item;
        }
    });
    return matchingItem;
};

updateCartQuantity();
rendortrackingSummary();

function ProgressBasedOnDelivery() {
    const today = dayjs();
    const delivery = dayjs(deliveryDate);
    const daysLeft = delivery.diff(today, 'day');

    const progressBar = document.querySelector('.progress-bar');
    const labels = document.querySelectorAll('.progress-label');
  
    let width = 0;
    let activeIndex = 0;

    if (daysLeft > 2) {
        width = 23;
        activeIndex = 0; 
    } else if (daysLeft > 0 && daysLeft<=2) {
        width = 50;
        activeIndex = 1; 
    } else if(daysLeft===0) {
        width = 100;
        activeIndex = 2; 
    }                      
  
    
    labels.forEach((label, index) => {
        label.classList.remove('current-status');
        if (index === activeIndex) {
          label.classList.add('current-status');
        }
      });

    progressBar.style.width = `${width}%`;


  };

  ProgressBasedOnDelivery();

  

