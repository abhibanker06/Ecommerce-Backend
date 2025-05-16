import { getMyOrder } from '../data/orders.js';
import { getProduct } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');


const matchingOrder=getMyOrder(orderId);
const products=matchingOrder.products;
const matchingProduct=getProduct(productId);

function rendortrackingSummary(){
    let trackingSummaryHTML='';
    const matchingItem=getMyItem(productId);
    const deliveryDate=matchingItem.estimatedDeliveryTime;
    const quantity=matchingItem.quantity;

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
            <div class="progress-label current-status">
            Shipped
            </div>
            <div class="progress-label">
            Delivered
            </div>
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

rendortrackingSummary();