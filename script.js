// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const header = document.querySelector('.header');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
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
const bookingModal = document.getElementById('bookingModal');
const closeModal = document.querySelector('.close');

bookingBtn.addEventListener('click', () => {
    bookingModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Room booking buttons
const bookBtns = document.querySelectorAll('.book-btn');
bookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        bookingModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Direct booking form
const directBookingForm = document.getElementById('directBookingForm');
directBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(directBookingForm);
    const checkIn = formData.get('checkIn');
    const checkOut = formData.get('checkOut');
    const guests = formData.get('guests');
    
    if (new Date(checkIn) >= new Date(checkOut)) {
        const currentLang = localStorage.getItem('language') || 'it';
        const errorMsg = currentLang === 'en' ? 'Check-out date must be after check-in date' : 'La data di check-out deve essere successiva al check-in';
        showNotification(errorMsg, 'error');
        return;
    }
    
    const currentLang = localStorage.getItem('language') || 'it';
    const successMsg = currentLang === 'en' ? 'Booking sent successfully! We will contact you soon.' : 'Prenotazione inviata con successo! Ti contatteremo presto.';
    showNotification(successMsg, 'success');
    directBookingForm.reset();
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Contact form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const currentLang = localStorage.getItem('language') || 'it';
    const successMsg = currentLang === 'en' ? 'Message sent successfully! We will reply soon.' : 'Messaggio inviato con successo! Ti risponderemo presto.';
    showNotification(successMsg, 'success');
    contactForm.reset();
});

// FAQ functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
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