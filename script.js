/* ========================================
   SPIRIT SCIENCE - MAIN JAVASCRIPT
   ======================================== */

/* ========================================
   ACCORDION FUNCTIONALITY
   ======================================== */
function toggleAccordion(stageNumber) {
    const content = document.getElementById(`stage-content-${stageNumber}`);
    const accordion = content.closest('.stage-accordion');
    const arrow = accordion.querySelector('.accordion-arrow');
    
    // Close all other accordions
    document.querySelectorAll('.stage-accordion').forEach(acc => {
        if (acc !== accordion) {
            acc.classList.remove('active');
            acc.querySelector('.stage-content').classList.remove('active');
        }
    });
    
    // Toggle current accordion
    accordion.classList.toggle('active');
    content.classList.toggle('active');
}

/* ========================================
   SIMPLE COURSE SCROLL CONTAINER
   ======================================== */
// No JavaScript needed for simple horizontal scroll
// The container uses native CSS overflow-x: auto for scrolling

/* ========================================
   LOADING ANIMATION
   ======================================== */
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000); // Show loading for 3 seconds
});

/* ========================================
   NAVIGATION SYSTEM
   ======================================== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Mobile menu toggle with improved touch interactions and accessibility
hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    const isActive = hamburger.classList.contains('active');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Update accessibility attributes
    hamburger.setAttribute('aria-expanded', !isActive);
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Smooth scroll for navigation links with mobile optimization
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            
            // Calculate offset based on screen size
            const isMobile = window.innerWidth <= 768;
            const offsetTop = targetSection.offsetTop - (isMobile ? 60 : 70);
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active section indicator
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Navbar background on scroll
function updateNavbarBackground() {
    const heroSection = document.getElementById('home');
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;
    
    if (window.scrollY > heroHeight * 0.3) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Typing Animation with Moving Cursor
function typeWriter(element, text, speed = 20) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            // Add some randomness to typing speed for realism
            const randomDelay = speed + Math.random() * 20;
            
            element.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
            i++;
            setTimeout(type, randomDelay);
        } else {
            // Keep cursor blinking after typing is complete
            element.innerHTML = text + '<span class="cursor">|</span>';
        }
    }
    
    type();
}


/* ========================================
   TYPING ANIMATION SYSTEM
   ======================================== */
// Initialize typing animation after hero fade-in
setTimeout(() => {
    const typingElement = document.getElementById('typing-text');
    const typingText = "If you feel lost in life and long for a breath of the fresh air, if depression, fears, or addictions are holding you back, there is hope and a path to overcome them. Sometimes this feeling of being lost comes from deep knowledge that there must be a way toward a higher, more fulfilling level of life. You are fully capable of reaching it — but lack the keys and a hint, that could reveal what this path looks like and where to find it.";
    
    if (typingElement) {
        typeWriter(typingElement, typingText, 15);
    }
}, 2500);

// Scroll event listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateNavbarBackground();
});

/* ========================================
   SCROLL-TRIGGERED ANIMATIONS
   ======================================== */
// General observer removed - only using timeline-specific observer for history section

// Timeline-specific observer for staggered animations
const timelineObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const timelineItem = entry.target;
            
            // Add animate class to timeline item
            timelineItem.classList.add('animate');
            
            // Animate child elements with slight delay
            setTimeout(() => {
                const timelineYear = timelineItem.querySelector('.timeline-year');
                const timelineContent = timelineItem.querySelector('.timeline-content');
                
                if (timelineYear) timelineYear.classList.add('animate');
                if (timelineContent) {
                    timelineContent.classList.add('animate');
                    
                    // Animate content elements
                    setTimeout(() => {
                        const title = timelineContent.querySelector('h3');
                        const subtitle = timelineContent.querySelector('h4');
                        const paragraphs = timelineContent.querySelectorAll('p');
                        const lists = timelineContent.querySelectorAll('ul');
                        
                        if (title) title.classList.add('animate');
                        if (subtitle) subtitle.classList.add('animate');
                        paragraphs.forEach(p => p.classList.add('animate'));
                        lists.forEach(ul => ul.classList.add('animate'));
                    }, 200);
                }
            }, 100);
        }
    });
}, timelineObserverOptions);

// Initialize history section timeline animations only
document.addEventListener('DOMContentLoaded', () => {
    // Observe timeline items for staggered animations in history section only
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});


// Autoplay video for developers section (removed scroll control)
// Video now autoplays and loops as a background decorative element

// Enhanced form handling with mobile optimization
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const email = contactForm.querySelector('input[type="email"]').value.trim();
            const message = contactForm.querySelector('textarea').value.trim();
            
            // Enhanced validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission with better UX
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                // Add success animation
                submitBtn.classList.add('success');
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                
                // Reset form and button after animation
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.classList.remove('success');
                }, 1000);
            }, 2000);
        });
    }
    
    // Enhanced button interactions
    const joinBtn = document.querySelector('.join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Welcome to the School of Alpasca community! Registration coming soon.', 'info');
        });
    }
    
    // Course buttons
    const courseBtns = document.querySelectorAll('.course-btn');
    courseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Course details coming soon! Stay tuned for updates.', 'info');
        });
    });
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial navbar state
    updateNavbarBackground();
    updateActiveNavLink();
    
    // Initialize hero floating video with autoplay
    const heroFloatingVideo = document.querySelector('.hero-floating-video video');
    if (heroFloatingVideo) {
        // Set video properties for autoplay
        heroFloatingVideo.muted = true;
        heroFloatingVideo.playsInline = true;
        heroFloatingVideo.loop = true;

        // Attempt autoplay when video is ready
        heroFloatingVideo.addEventListener('loadedmetadata', () => {
            heroFloatingVideo.play().catch(e => {
                console.log('Hero video autoplay prevented:', e);
                // Try again on user interaction
                document.addEventListener('click', () => {
                    heroFloatingVideo.play().catch(err => console.log('Hero video still cannot play:', err));
                }, { once: true });
            });
        });
    }

    // Initialize developers video with autoplay
    const developersVideo = document.getElementById('developers-video');
    if (developersVideo) {
        // Set video properties for autoplay
        developersVideo.muted = true;
        developersVideo.playsInline = true;
        developersVideo.loop = true;

        // Attempt autoplay when video is ready
        developersVideo.addEventListener('loadedmetadata', () => {
            developersVideo.play().catch(e => {
                console.log('Developers video autoplay prevented:', e);
                // Try again on user interaction
                document.addEventListener('click', () => {
                    developersVideo.play().catch(err => console.log('Developers video still cannot play:', err));
                }, { once: true });
            });
        });
    }
});
