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

