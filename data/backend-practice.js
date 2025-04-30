// const xhr = new XMLHttpRequest(); // creats new Http message to send to the backend.
// xhr.open('GET',"https://supersimplebackend.dev");

// xhr.addEventListener('load',()=>{
//     console.log(xhr.response);
// })

// xhr.send();


// async function makes a function return a promise
async function loadPage(){
    console.log('load page');
    return 'value2'
}  //the return value will be saved inside the parameters
loadPage().then((value)=>{
    console.log('next-step');
    console.log(value);
});
