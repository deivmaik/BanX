
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