const xhr = new XMLHttpRequest(); // creats new Http message to send to the backend.
xhr.open('GET',"https://supersimplebackend.dev");

xhr.addEventListener('load',()=>{
    console.log(xhr.response);
})

xhr.send();

