// script for fixed scrollUp button
const scrollUp = {
    element: document.querySelector('.scrollup'),
    show: function() {
        this.element.classList.remove('hide')
    },
    hide: function () {
        this.element.classList.add('hide');
    }
}

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    scrollY > 400 ? scrollUp.show() : scrollUp.hide();
})

scrollUp.element.addEventListener('click', () => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
})