//Hamburger

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navlinks = document.querySelectorAll('.nav-link li');

    burger.addEventListener('click',()=>{
        
        nav.classList.toggle('main-nav');
    });
}
navSlide();

//Contact

function validate(){
    var name = document.getElementById("name").value;
    var subject = document.getElementById("subject").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var error_message = document.getElementById("error_message");
    
    error_message.style.padding = "10px";
    
    var text;
    if(name.length < 1){
      text = "Please Enter Name";
      error_message.innerHTML = text;
      return false;
    }
    if(subject.length < 1){
      text = "Please Enter Subject";
      error_message.innerHTML = text;
      return false;
    }
    if(isNaN(phone) || phone.length != 10){
      text = "Please Enter valid Phone Number";
      error_message.innerHTML = text;
      return false;
    }
    if(email.indexOf("@") == -1 || email.length < 6){
      text = "Please Enter valid Email";
      error_message.innerHTML = text;
      return false;
    }
    if(message.length <= 140){
      text = "Please Enter More Than 140 Characters";
      error_message.innerHTML = text;
      return false;
    }
    alert("Form Submitted Successfully!");
    return true;
  }


  //Single Product slider
  
  const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);


const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.cardHold');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1;

eventListeners();

// all event listeners
function eventListeners(){
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
        loadCart();
    });
   

    
    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

    
    productList.addEventListener('click', purchaseProduct);

  
    cartList.addEventListener('click', deleteProduct);
}


function updateCartInfo(){
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
}

function loadJSON(){
    fetch('pList.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += `
                <div class="card">
                    <div class="card-img">
                        <a href="singleProductPage.html"><img src="${product.img}" alt="product"></a>
                    </div>
                    <div class="product-name">
                        <a href="singleProductPage.html">
                            <h4>${product.name}</h4>
                        </a>
                    </div>
                    <div class="product-price">
                        <a href="singleProductPage.html">${product.price}</a>
                    </div>
                </div>      
            `;
            


           
            
        });
        
        productList.innerHTML = html;
    })
  }


function getProductFromStorage(){
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
}


function loadCart(){
    let products = getProductFromStorage();
    if(products.length < 1){
        cartItemID = 1; 
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
        
    }
    products.forEach(product => addToCartList(product));

    updateCartInfo();
}


function findCartInfo(){
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1)); 
        return acc += price;
    }, 0); 

    return{
        total: total.toFixed(2),
        productCount: products.length
    }
}


