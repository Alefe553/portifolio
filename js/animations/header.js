window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const nav = document.querySelector('.navigation');
    const scrollPosition = window.scrollY;

    if (scrollPosition > header.offsetHeight) {
        nav.classList.add('show');
    } else {
        nav.classList.remove('show');
    }
});












