
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.header__nav-link');

navLinks.forEach(link => {
    if (link.getAttribute('href') === './index.html' && (currentPath === '/' || currentPath.endsWith('index.html'))) {
        link.classList.add('is-active');
    } else if (currentPath.endsWith(link.getAttribute('href').replace('./', ''))) {
        link.classList.add('is-active');
    } else {
        link.classList.remove('is-active');
    }
});
