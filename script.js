/* ========================================
   SPIRIT SCIENCE - MAIN JAVASCRIPT
   ======================================== */

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
function typeWriter(element, text, speed = 30) {
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

// Hero Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.quote-slide');
const indicators = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let slideInterval;
let isTransitioning = false;

function showSlide(index) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    // Reset transition lock after animation
    setTimeout(() => {
        isTransitioning = false;
    }, 800);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 9000);
}

// Auto-advance slides every 9 seconds
slideInterval = setInterval(nextSlide, 9000);

// Touch/Swipe support
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;
let isDragging = false;

/* ========================================
   QUOTE SLIDER SYSTEM
   ======================================== */
const quoteSlider = document.querySelector('.quote-slider');

if (quoteSlider) {
    // Mouse events
    quoteSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    quoteSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 9000);
    });

    // Touch events
    quoteSlider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        quoteSlider.classList.add('dragging');
        clearInterval(slideInterval);
    });

    quoteSlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    quoteSlider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Only trigger swipe if horizontal movement is greater than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        
        isDragging = false;
        quoteSlider.classList.remove('dragging');
        slideInterval = setInterval(nextSlide, 9000);
    });

    // Mouse drag support
    quoteSlider.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
        isDragging = true;
        quoteSlider.classList.add('dragging');
        clearInterval(slideInterval);
        e.preventDefault();
    });

    quoteSlider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    quoteSlider.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        endX = e.clientX;
        endY = e.clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        
        isDragging = false;
        quoteSlider.classList.remove('dragging');
        slideInterval = setInterval(nextSlide, 9000);
    });

    // Prevent default drag behavior
    quoteSlider.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
}

// Manual slide control via indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 9000);
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 9000);
    }
});

/* ========================================
   TYPING ANIMATION SYSTEM
   ======================================== */
// Initialize typing animation after hero fade-in
setTimeout(() => {
    const typingElement = document.getElementById('typing-text');
    const typingText = "If you feel lost in life and long for a breath of the fresh air, if depression, fears, or addictions are holding you back, there is hope and a path to overcome them. Sometimes this feeling of being lost comes from deep knowledge that there must be a way toward a higher, more fulfilling level of life. You are fully capable of reaching it — but lack the keys and a hint, that could reveal what this path looks like and where to find it.";
    
    if (typingElement) {
        typeWriter(typingElement, typingText, 25);
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


// Scroll-controlled video for developers section
let isScrolling = false;
let scrollTimeout;

function updateDevelopersVideo() {
    const developersSection = document.getElementById('developers');
    const developersVideo = document.getElementById('developers-video');
    
    if (!developersSection || !developersVideo) return;
    
    const sectionTop = developersSection.offsetTop;
    const sectionHeight = developersSection.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    // Calculate when the section is in view
    const sectionStart = sectionTop - windowHeight * 0.3; // Start when section is 30% visible
    const sectionEnd = sectionTop + sectionHeight;
    
    // Check if we're scrolling through the developers section
    if (scrollTop >= sectionStart && scrollTop <= sectionEnd) {
        // Calculate progress through the section (0 to 1)
        const scrollProgress = (scrollTop - sectionStart) / (sectionHeight + windowHeight * 0.3);
        const progress = Math.max(0, Math.min(1, scrollProgress));
        
        // Get video duration
        const videoDuration = developersVideo.duration;
        if (videoDuration && !isNaN(videoDuration) && videoDuration > 0) {
            // Set video time based on scroll progress
            const targetTime = progress * videoDuration;
            
            // Only update if the difference is significant to avoid jitter
            if (Math.abs(developersVideo.currentTime - targetTime) > 0.05) {
                try {
                    developersVideo.currentTime = targetTime;
                } catch (e) {
                    console.log('Error setting video time:', e);
                }
            }
        }
        
        // Pause video when not actively scrolling
        if (isScrolling) {
            if (developersVideo.paused && developersVideo.readyState >= 2) {
                developersVideo.play().catch(e => console.log('Video autoplay prevented:', e));
            }
        } else {
            if (!developersVideo.paused) {
                developersVideo.pause();
            }
        }
    } else if (scrollTop < sectionStart) {
        // Reset video to beginning when before section
        if (developersVideo.readyState >= 2) {
            developersVideo.currentTime = 0;
            developersVideo.pause();
        }
    } else if (scrollTop > sectionEnd) {
        // Set video to end when past section
        if (developersVideo.duration && developersVideo.readyState >= 2) {
            developersVideo.currentTime = developersVideo.duration;
            developersVideo.pause();
        }
    }
}

// Scroll detection and video control
let videoScrollTimeout;
window.addEventListener('scroll', () => {
    // Set scrolling state to true
    isScrolling = true;
    
    // Clear existing timeout
    if (videoScrollTimeout) {
        clearTimeout(videoScrollTimeout);
    }
    
    // Clear existing scroll timeout
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    // Update video immediately for responsive feel
    updateDevelopersVideo();
    
    // Set timeout to detect when scrolling stops
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
        updateDevelopersVideo(); // This will pause the video
    }, 150); // 150ms delay after scroll stops
    
    // Also set a timeout for cleanup
    videoScrollTimeout = setTimeout(() => {
        updateDevelopersVideo();
    }, 16); // ~60fps
});

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
    
    // Initialize developers video
    const developersVideo = document.getElementById('developers-video');
    if (developersVideo) {
        // Set initial video properties
        developersVideo.currentTime = 0;
        developersVideo.muted = true;
        developersVideo.playsInline = true;
        
        // Wait for video to be ready
        developersVideo.addEventListener('loadedmetadata', () => {
            developersVideo.currentTime = 0;
            console.log('Developers video loaded, duration:', developersVideo.duration);
        });
        
        // Handle video ready state
        developersVideo.addEventListener('canplay', () => {
            console.log('Developers video can play');
        });
        
        // Ensure video is ready for scroll control
        developersVideo.addEventListener('loadeddata', () => {
            developersVideo.currentTime = 0;
        });
    }
});
