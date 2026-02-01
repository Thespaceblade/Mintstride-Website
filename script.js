// Hero dot grid - per-dot diagonal wave animation
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const heroDotGrid = document.querySelector('.hero-dot-grid');
    if (hero && heroDotGrid) {
        const dotSize = 20;
        const rect = hero.getBoundingClientRect();
        const cols = Math.ceil(rect.width / dotSize) + 2;
        const rows = Math.ceil(rect.height / dotSize) + 2;
        heroDotGrid.style.setProperty('--dot-cols', cols);
        heroDotGrid.style.setProperty('--dot-rows', rows);
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const dot = document.createElement('div');
                dot.className = 'hero-dot';
                dot.style.setProperty('--wave-phase', col - row + cols);
                heroDotGrid.appendChild(dot);
            }
        }
    }
});

// Hero logo hover - only grow/shimmer when mouse is directly on the icon
const heroLogo = document.querySelector('.hero-logo');
if (heroLogo) {
    heroLogo.addEventListener('mouseenter', () => heroLogo.classList.add('logo-hovered'));
    heroLogo.addEventListener('mouseleave', () => heroLogo.classList.remove('logo-hovered'));
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for grouped elements
            const delay = index * 100;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up class
document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
});

// Add stagger animation to card grids
const addStaggerToCards = () => {
    const cardContainers = [
        '.mission-grid',
        '.involvement-grid',
        '.impact-comparison'
    ];
    
    cardContainers.forEach(container => {
        const cards = document.querySelectorAll(`${container} > *`);
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.15}s`;
        });
    });
};

document.addEventListener('DOMContentLoaded', addStaggerToCards);

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add stagger effect to cards
const addStaggerEffect = () => {
    const cardGroups = [
        '.mission-card',
        '.involvement-card',
        '.impact-column'
    ];

    cardGroups.forEach(selector => {
        const cards = document.querySelectorAll(selector);
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });
};

// Initialize stagger effect on page load
document.addEventListener('DOMContentLoaded', addStaggerEffect);

// Removed parallax effect to prevent overlap issues

// Add hover effect to stats
const statNumber = document.querySelector('.stat-number');
if (statNumber) {
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start) + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(statNumber, 0, 50, 2000);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statObserver.observe(statNumber);
}

// ===========================
// Hero Mouse-Responsive Gradient
// ===========================

// Detect if device is touch-enabled
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

// Throttle function for performance
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===========================
// Hero Gradient Splotch Effect
// ===========================
// Gradient splotch is now purely CSS-based (no JavaScript needed)
// It fades in on hover at a fixed position

// ===========================
// Scroll Indicator
// ===========================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    // Smooth scroll on click
    scrollIndicator.addEventListener('click', () => {
        const missionSection = document.querySelector('#mission');
        if (missionSection) {
            missionSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===========================
// Yellow Highlighter Animation
// ===========================

const highlightWords = document.querySelectorAll('.highlight-word');
let highlightsTriggered = false;

if (highlightWords.length > 0) {
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !highlightsTriggered) {
                highlightsTriggered = true;
                
                // Trigger each highlight sequentially
                highlightWords.forEach((word, index) => {
                    const delay = parseInt(word.getAttribute('data-delay')) || 0;
                    setTimeout(() => {
                        word.classList.add('highlighted');
                    }, delay * 400); // 400ms between each highlight
                });
                
                // Unobserve after triggering
                highlightObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });
    
    // Observe the parent callout box
    const calloutBox = document.querySelector('.callout-box');
    if (calloutBox) {
        highlightObserver.observe(calloutBox);
    }
}

// Console message
console.log('%cMINTSTRIDE', 'font-size: 40px; font-weight: bold; color: #107c80;');
console.log('%cExpanding access to oral health for communities that need it most.', 'font-size: 14px; color: #333;');
console.log('%cInterested in contributing? Contact us at mintstrideorg@gmail.com', 'font-size: 12px; color: #666;');
