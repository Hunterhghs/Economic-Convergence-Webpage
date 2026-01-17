// ============================================
// H Heuristics - Economic Convergence
// Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('mobile-open')) {
                    navLinks.classList.remove('mobile-open');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Navigation background on scroll
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.section-header, .content-main, .content-sidebar, .info-card, ' +
        '.theory-card, .type-card, .finding-card, .stat-card, .insight, ' +
        '.mechanism-item, .trap-card, .barrier, .regional-card, ' +
        '.policy-category, .outlook-card, .scenario'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        fadeInObserver.observe(el);
    });

    // Stat counter animation
    const stats = document.querySelectorAll('.stat-number, .stat-value');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    function animateValue(element) {
        const text = element.textContent;
        const match = text.match(/(\d+)/);
        if (!match) return;

        const endValue = parseInt(match[1]);
        const suffix = text.replace(/\d+/, '');
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(endValue * easeOutQuart);
            
            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = text;
            }
        }

        requestAnimationFrame(update);
    }

    // Active section highlighting in nav
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -80% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));
});

// Add CSS for animations dynamically
const style = document.createElement('style');
style.textContent = `
    /* Fade in animation */
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Staggered animations for grids */
    .theory-grid .fade-in:nth-child(1) { transition-delay: 0ms; }
    .theory-grid .fade-in:nth-child(2) { transition-delay: 100ms; }
    .theory-grid .fade-in:nth-child(3) { transition-delay: 200ms; }
    .theory-grid .fade-in:nth-child(4) { transition-delay: 300ms; }
    .theory-grid .fade-in:nth-child(5) { transition-delay: 400ms; }
    
    .types-grid .fade-in:nth-child(1) { transition-delay: 0ms; }
    .types-grid .fade-in:nth-child(2) { transition-delay: 150ms; }
    .types-grid .fade-in:nth-child(3) { transition-delay: 300ms; }
    
    .traps-grid .fade-in:nth-child(1) { transition-delay: 0ms; }
    .traps-grid .fade-in:nth-child(2) { transition-delay: 100ms; }
    .traps-grid .fade-in:nth-child(3) { transition-delay: 200ms; }
    .traps-grid .fade-in:nth-child(4) { transition-delay: 300ms; }
    .traps-grid .fade-in:nth-child(5) { transition-delay: 400ms; }
    .traps-grid .fade-in:nth-child(6) { transition-delay: 500ms; }
    
    .regional-grid .fade-in:nth-child(1) { transition-delay: 0ms; }
    .regional-grid .fade-in:nth-child(2) { transition-delay: 100ms; }
    .regional-grid .fade-in:nth-child(3) { transition-delay: 200ms; }
    .regional-grid .fade-in:nth-child(4) { transition-delay: 300ms; }
    .regional-grid .fade-in:nth-child(5) { transition-delay: 400ms; }
    .regional-grid .fade-in:nth-child(6) { transition-delay: 500ms; }
    
    /* Nav scroll state */
    .main-nav.scrolled {
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
    }
    
    /* Active nav item */
    .nav-links a.active {
        color: var(--color-accent-dark);
    }
    
    /* Mobile menu */
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background: var(--color-paper);
            flex-direction: column;
            padding: var(--space-xl);
            gap: var(--space-md);
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
        }
        
        .nav-links.mobile-open {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    }
`;
document.head.appendChild(style);
