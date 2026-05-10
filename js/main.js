document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar Scroll Effect ─────────────────────────────────────────────────
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ── Mobile Hamburger Menu ────────────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');
    let menuOpen = false;

    function toggleMenu(force) {
        menuOpen = typeof force === 'boolean' ? force : !menuOpen;
        hamburger.classList.toggle('open', menuOpen);
        mobileNav.classList.toggle('open', menuOpen);
        hamburger.setAttribute('aria-expanded', menuOpen.toString());
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => toggleMenu());

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (menuOpen && !navbar.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) toggleMenu(false);
    });

    // ── Intersection Observer (Reveal Elements) ──────────────────────────────
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-element').forEach(el => {
        observer.observe(el);
    });

    // ── Number Counter Animation ─────────────────────────────────────────────
    const statNums = document.querySelectorAll('.stat-num[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);

            // Skip non-numeric targets
            if (isNaN(target)) return;

            const duration = 1600;
            const start = performance.now();

            function animate(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(animate);
            }

            requestAnimationFrame(animate);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => counterObserver.observe(el));

    // ── Active Nav Link Highlight on Scroll ──────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.btn)');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    link.style.color = href === `#${id}` ? 'var(--primary)' : '';
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(section => sectionObserver.observe(section));

    // ── Chart Bars Animation ─────────────────────────────────────────────────
    const bars = document.querySelectorAll('.chart-bars .bar');
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            bars.forEach((bar, i) => {
                const targetHeight = bar.style.height;
                bar.style.height = '0%';
                setTimeout(() => {
                    bar.style.transition = `height 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`;
                    bar.style.height = targetHeight;
                }, 100);
            });
            chartObserver.disconnect();
        });
    }, { threshold: 0.5 });

    const chartContainer = document.querySelector('.chart-bars');
    if (chartContainer) chartObserver.observe(chartContainer);

    // ── Smooth scroll for anchor links ───────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offset = 90;
            const y = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

});
