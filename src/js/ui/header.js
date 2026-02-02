
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.header__nav-link, .mobile-menu__link');

navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Check if it's the home link (index.html or root /)
    const isHome = href === './index.html' || href === 'index.html' || href === '/';
    const isAtHome = currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '';

    if (isHome && isAtHome) {
        link.classList.add('is-active');
    } else if (!isHome && currentPath.endsWith(href.replace('./', ''))) {
        link.classList.add('is-active');
    } else {
        link.classList.remove('is-active');
    }
});
