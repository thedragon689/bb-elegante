// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('.header');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    // Add mobile menu functionality here if needed
});

// Language Selector
const languageSelectors = document.querySelectorAll('.lang');
languageSelectors.forEach(lang => {
    lang.addEventListener('click', () => {
        languageSelectors.forEach(l => l.classList.remove('active'));
        lang.classList.add('active');
    });
});

// Booking Button
const bookingBtn = document.querySelector('.booking-btn');
bookingBtn.addEventListener('click', () => {
    // Add booking functionality here
    alert('Funzionalità di prenotazione in arrivo!');
});

// Scroll Indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
scrollIndicator.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// Pagination Dots
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        // Add carousel functionality here
    });
});

// Smooth scrolling for any anchor links
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

// Header background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.1)';
    }
});

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize animations on load
window.addEventListener('load', () => {
    // Add any initialization code here
    console.log('Fattoria Pagnana website loaded successfully!');
});

// Notification System (if needed for future features)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}