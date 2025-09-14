// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') ? 
        '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="ri-menu-line"></i>';
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let currentSlide = 0;

function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialSlides[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentSlide = index;
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto rotate testimonials
setInterval(() => {
    let nextSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(nextSlide);
}, 5000);

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation and localStorage
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        // In a real application, you would send this data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } else {
        alert('All fields are necessary.')
    }
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('newsletterEmail').value;
    
    if (email) {
        // Store email in localStorage
        let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    }
});