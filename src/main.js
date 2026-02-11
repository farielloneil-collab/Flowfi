import './style.css'
import './text-scramble.js'
import { setupI18n } from './i18n.js'

document.addEventListener('DOMContentLoaded', () => {
    // Initialize i18n
    setupI18n();

    // Initialize Text Scramble
    if (window.initTextScramble) {
        window.initTextScramble();
    }

    // Taiko-style Intersection Observer
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');

    const observerOptions = {
        root: null,
        threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navDots.forEach(dot => {
                    if (dot.getAttribute('data-section') === id) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Scroll Animation Observer for Reveal Effects
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    scrollElements.forEach(el => scrollObserver.observe(el));

    // Click to scroll
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.getAttribute('data-section');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    // 3D Tilt Effect Utility
    function addTiltEffect(sectionId, assetId) {
        const section = document.getElementById(sectionId);
        const asset = document.getElementById(assetId);

        if (section && asset) {
            section.addEventListener('mousemove', (e) => {
                const rect = section.getBoundingClientRect();
                const x = e.clientX - rect.left - (rect.width / 2);
                const y = e.clientY - rect.top - (rect.height / 2);

                const rotateX = (y / (rect.height / 2)) * -20;
                const rotateY = (x / (rect.width / 2)) * -20;

                asset.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            section.addEventListener('mouseleave', () => {
                asset.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        }
    }

    // Apply Tilt Effect to Sections
    addTiltEffect('hero', 'hero-asset');
    // addTiltEffect('vaults', 'vault-asset'); // Disabled for Vaults section in favor of continuous animation

    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const body = document.body;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('translate-x-full');

            if (isOpen) {
                // Close Menu
                mobileMenu.classList.add('translate-x-full');
                mobileMenuBtn.classList.remove('menu-open');
                body.style.overflow = '';
            } else {
                // Open Menu
                mobileMenu.classList.remove('translate-x-full');
                mobileMenuBtn.classList.add('menu-open');
                body.style.overflow = 'hidden';
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                mobileMenuBtn.classList.remove('menu-open');
                body.style.overflow = '';
            });
        });
    }
});
