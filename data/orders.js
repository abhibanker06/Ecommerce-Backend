export const orders=JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}

export function getMyOrder(orderId){
    let matchingOrder;
    orders.forEach((orders)=>{
        if(orders.id===orderId){
            matchingOrder=orders;
        }
    });
    return matchingOrder;
}

