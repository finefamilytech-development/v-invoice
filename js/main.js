document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Simple scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .roadmap-step, .analytics-row, .section-header');
    animatedElements.forEach((el, index) => {
        el.classList.add('reveal-element');
        if (el.classList.contains('delay-1')) el.style.transitionDelay = '0.1s';
        if (el.classList.contains('delay-2')) el.style.transitionDelay = '0.2s';
        if (el.classList.contains('delay-3')) el.style.transitionDelay = '0.3s';
        observer.observe(el);
    });
});
