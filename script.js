// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const modal = document.getElementById('portfolio-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.querySelector('.close');
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const contactForm = document.getElementById('contact-form');
// Portfolio data with embedded SVG
const portfolioData = {
    1: {
        title: "Luxury Retail Brand",
        description: "Complete e-commerce solution with custom branding, responsive design, and integrated payment systems. Increased online sales by 250% within the first quarter.",
        img: `<img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Luxury Retail Brand" width="400" height="300">`
    },
    2: {
        title: "Tech Startup",
        description: "Modern web application with clean UI/UX design, optimized for performance and conversion. Features include user dashboards, analytics, and mobile responsiveness.",
        img: `<img src="https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Tech Startup" width="400" height="300">`
    },
    3: {
        title: "Professional Services",
        description: "Complete brand overhaul including logo design, website development, and marketing materials. Established strong digital presence in competitive market.",
        img: `<img src="https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Professional Services" width="400" height="300">`
    }
};
// State management
let currentTestimonial = 0;
let isScrolling = false;
// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializePortfolio();
    initializeTestimonials();
    initializeContactForm();
    initializeAnimations();
});
// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.clientHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
// Scroll effects
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        
        isScrolling = true;
        requestAnimationFrame(() => {
            handleNavbarScroll();
            handleScrollAnimations();
            isScrolling = false;
        });
    });
}
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}
// Portfolio functionality
function initializePortfolio() {
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const portfolioId = item.getAttribute('data-portfolio');
            openPortfolioModal(portfolioId);
        });
    });
    // Close modal events
    closeModal.addEventListener('click', closePortfolioModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePortfolioModal();
        }
    });
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closePortfolioModal();
        }
    });
}
function openPortfolioModal(portfolioId) {
    const data = portfolioData[portfolioId];
    if (!data) return;
    modalImage.innerHTML = data.svg;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function closePortfolioModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
// Testimonials functionality
function initializeTestimonials() {
    // Auto-play testimonials
    setInterval(() => {
        nextTestimonial();
    }, 5000);
    // Navigation buttons
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
}
function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentTestimonial = index;
}
function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}
function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}
// Contact form functionality
function initializeContactForm() {
    contactForm.addEventListener('submit', handleFormSubmit);
    // Floating label animation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value) {
                input.setAttribute('data-filled', 'true');
            } else {
                input.removeAttribute('data-filled');
            }
        });
    });
}
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
        
        // Show success notification
        showNotification('Thank you! Your message has been sent successfully.', 'success');
    }, 2000);
}
// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? 'hsl(120, 60%, 50%)' : 'hsl(210, 100%, 50%)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '300px'
    });
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '1.2rem';
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}
// Animation system
function initializeAnimations() {
    // Add animation classes to elements
    const animatedElements = [
        '.service-card',
        '.portfolio-item',
        '.about-text',
        '.about-image',
        '.contact-info',
        '.contact-form'
    ];
    
    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('animate-on-scroll');
        });
    });
    
    // Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}
// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
// Performance optimization
const optimizedScrollHandler = throttle(() => {
    handleNavbarScroll();
    handleScrollAnimations();
}, 16);
window.addEventListener('scroll', optimizedScrollHandler);
// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});
// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here
    });
}
// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});
// Add CSS for keyboard navigation and animations
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid hsl(var(--primary-black)) !important;
        outline-offset: 2px !important;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

const portfolioData = {
    1: {
        title: "Luxury Retail Brand",
        description: "Complete e-commerce solution with custom branding, responsive design, and integrated payment systems. Increased online sales by 250% within the first quarter.",
        img: `<img src="https://i.ibb.co/x8rJ0gvT/Screenshot-2025-05-26-at-9-20-03-a-m.png" alt="Luxury Retail Brand" width="400" height="300">`
    },
    2: {
        title: "Tech Startup",
        description: "Modern web application with clean UI/UX design, optimized for performance and conversion. Features include user dashboards, analytics, and mobile responsiveness.",
        img: `<img src="https://i.ibb.co/3yqTLzYP/Screenshot-2025-05-26-at-9-17-09-a-m.png" alt="Tech Startup" width="400" height="300">`
    },
    3: {
        title: "Professional Services",
        description: "Complete brand overhaul including logo design, website development, and marketing materials. Established strong digital presence in competitive market.",
        img: `<img src="https://i.ibb.co/csRfxFL/Screenshot-2025-05-26-at-9-17-35-a-m.png" alt="Professional Services" width="400" height="300">`
    }
};
