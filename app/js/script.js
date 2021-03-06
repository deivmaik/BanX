
const hamburger = document.querySelector('#hamburger')
const body = document.querySelector('body')
const header = document.querySelector('.header')
const overlay = document.querySelector('.overlay')
const fadeElements = document.querySelectorAll('.contains-fade')

hamburger.addEventListener('click', function () {
    if (header.classList.contains('open')) {
        // close hamburger menu
        header.classList.remove('open')
        body.classList.remove('noScroll')
        fadeElements.forEach(function (element) {
            element.classList.remove('fade-in')
            element.classList.add('fade-out')
        })

    } else {
        // open hamburger menu
        body.classList.add('noScroll')
        header.classList.add('open')
        fadeElements.forEach(function (element) {
            element.classList.remove('fade-out')
            element.classList.add('fade-in')
        })
    }
})

document.getElementById('overlay').onclick = function(event) {
    document.getElementById('overlay').className = "hidden";
}

// Testimonials

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slides = document.querySelectorAll('.testimonials__slide');

let index = 0;
display(index);
function display(index) {
    slides.forEach((slide) => {
        slide.style.display = 'none';
    });
    slides[index].style.display = 'flex';
}

function nextSlide() {
    index++;
    if (index > slides.length - 1) {
        index = 0;
    }
    display(index);
}
function prevSlide() {
    index--;
    if (index < 0) {
        index = slides.length - 1;
    }
    display(index);
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

// Sign up modal

const modalBtn = document.querySelector('.hero__cta')
const modal = document.querySelector('.modal')
const modalClose = document.querySelector('.modal__container--close')

modalBtn.addEventListener('click', function () {
    modal.classList.add('modal--active')
})

modalClose.addEventListener('click', function () {
    modal.classList.remove('modal--active')
})