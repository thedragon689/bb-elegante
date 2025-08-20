// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Booking Modal Functionality
const modal = document.getElementById('bookingModal');
const bookButtons = document.querySelectorAll('.book-btn');
const closeBtn = document.querySelector('.close');

// Open modal when booking buttons are clicked
bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when clicking the X
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Direct Booking Form
const directBookingForm = document.getElementById('directBookingForm');
directBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;
    
    if (!checkIn || !checkOut) {
        alert('Per favore seleziona le date di check-in e check-out');
        return;
    }
    
    if (new Date(checkIn) >= new Date(checkOut)) {
        alert('La data di check-out deve essere successiva alla data di check-in');
        return;
    }
    
    // Show loading state
    const submitBtn = directBookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Prenotazione in corso...';
    submitBtn.disabled = true;
    
    // Send to PHP backend
    fetch('api/booking.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            checkIn: checkIn,
            checkOut: checkOut,
            guests: guests
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showBookingConfirmation('Prenotazione diretta', checkIn, checkOut, guests, data.details);
        } else {
            alert('Errore: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Errore di connessione. Riprova più tardi.');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('Per favore compila tutti i campi obbligatori');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Invio in corso...';
    submitBtn.disabled = true;
    
    // Send to PHP backend
    fetch('api/contact.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessageConfirmation(name, email);
            contactForm.reset();
        } else {
            alert('Errore: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Errore di connessione. Riprova più tardi.');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Booking Confirmation Function
function showBookingConfirmation(type, checkIn, checkOut, guests, details = null) {
    const priceInfo = details ? `
        <p><strong>Prezzo stimato:</strong> €${details.estimatedPrice}</p>
        <p><strong>Notti:</strong> ${details.nights}</p>
    ` : '';
    
    const confirmationMessage = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: #28a745; margin-bottom: 1rem;"></i>
            <h3 style="color: #333; margin-bottom: 1rem;">Richiesta Prenotazione Inviata!</h3>
            <p style="color: #666; margin-bottom: 1rem;">Grazie per aver scelto il nostro B&B</p>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>Tipo:</strong> ${type}</p>
                <p><strong>Check-in:</strong> ${formatDate(checkIn)}</p>
                <p><strong>Check-out:</strong> ${formatDate(checkOut)}</p>
                <p><strong>Ospiti:</strong> ${guests}</p>
                ${priceInfo}
            </div>
            <p style="color: #666; font-size: 0.9rem;">Ti contatteremo al più presto per confermare disponibilità e prezzo finale</p>
        </div>
    `;
    
    showModal(confirmationMessage);
}

// Message Confirmation Function
function showMessageConfirmation(name, email) {
    const confirmationMessage = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-envelope" style="font-size: 4rem; color: #007bff; margin-bottom: 1rem;"></i>
            <h3 style="color: #333; margin-bottom: 1rem;">Messaggio Inviato!</h3>
            <p style="color: #666; margin-bottom: 1rem;">Grazie ${name} per averci contattato</p>
            <p style="color: #666; font-size: 0.9rem;">Ti risponderemo al più presto all'indirizzo ${email}</p>
        </div>
    `;
    
    showModal(confirmationMessage);
}

// Generic Modal Function
function showModal(content) {
    const modalContent = document.querySelector('.modal-content');
    const originalContent = modalContent.innerHTML;
    
    modalContent.innerHTML = `
        <span class="close" onclick="closeCustomModal()">&times;</span>
        ${content}
        <div style="text-align: center; margin-top: 2rem;">
            <button onclick="closeCustomModal()" class="btn btn-primary">Chiudi</button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Custom Modal
function closeCustomModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Restore original modal content
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <span class="close">&times;</span>
        <h2>Prenota la tua Camera</h2>
        <div class="booking-options">
            <div class="booking-option">
                <h3>Prenotazione Diretta</h3>
                <p>Prenota direttamente con noi per i migliori prezzi</p>
                <form id="directBookingForm">
                    <div class="form-group">
                        <label for="checkIn">Check-in:</label>
                        <input type="date" id="checkIn" required>
                    </div>
                    <div class="form-group">
                        <label for="checkOut">Check-out:</label>
                        <input type="date" id="checkOut" required>
                    </div>
                    <div class="form-group">
                        <label for="guests">Ospiti:</label>
                        <select id="guests" required>
                            <option value="1">1 persona</option>
                            <option value="2">2 persone</option>
                            <option value="3">3 persone</option>
                            <option value="4">4 persone</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Prenota Direttamente</button>
                </form>
            </div>

            <div class="booking-option">
                <h3>Prenota tramite Partner</h3>
                <p>Prenota tramite i nostri partner ufficiali</p>
                <div class="partner-buttons">
                    <a href="#" class="btn btn-booking">
                        <i class="fab fa-booking"></i>
                        Booking.com
                    </a>
                    <a href="#" class="btn btn-airbnb">
                        <i class="fab fa-airbnb"></i>
                        Airbnb
                    </a>
                    <a href="#" class="btn btn-tripadvisor">
                        <i class="fab fa-tripadvisor"></i>
                        TripAdvisor
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Reattach event listeners
    attachEventListeners();
}

// Format Date Function
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Attach Event Listeners Function
function attachEventListeners() {
    // Reattach booking form listener
    const newDirectBookingForm = document.getElementById('directBookingForm');
    if (newDirectBookingForm) {
        newDirectBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const checkIn = document.getElementById('checkIn').value;
            const checkOut = document.getElementById('checkOut').value;
            const guests = document.getElementById('guests').value;
            
            if (!checkIn || !checkOut) {
                alert('Per favore seleziona le date di check-in e check-out');
                return;
            }
            
            if (new Date(checkIn) >= new Date(checkOut)) {
                alert('La data di check-out deve essere successiva alla data di check-in');
                return;
            }
            
            showBookingConfirmation('Prenotazione diretta', checkIn, checkOut, guests);
        });
    }
    
    // Reattach close button listener
    const newCloseBtn = document.querySelector('.close');
    if (newCloseBtn) {
        newCloseBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Set minimum date for date inputs
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput) {
        checkInInput.min = today;
    }
    if (checkOutInput) {
        checkOutInput.min = today;
    }
    
    // Update check-out minimum date when check-in is selected
    if (checkInInput) {
        checkInInput.addEventListener('change', () => {
            if (checkOutInput) {
                checkOutInput.min = checkInInput.value;
            }
        });
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.room-card, .service-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Partner booking links (simulated)
document.addEventListener('DOMContentLoaded', () => {
    const partnerButtons = document.querySelectorAll('.btn-booking, .btn-airbnb, .btn-tripadvisor');
    partnerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = button.textContent.trim();
            alert(`Reindirizzamento a ${platform}...\n\nIn un'implementazione reale, questo link porterebbe alla pagina di prenotazione specifica del B&B su ${platform}.`);
        });
    });
});

// Form validation enhancement
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return re.test(phone);
}

// Enhanced contact form validation
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !validateEmail(emailInput.value)) {
                emailInput.style.borderColor = '#dc3545';
                emailInput.setCustomValidity('Inserisci un indirizzo email valido');
            } else {
                emailInput.style.borderColor = '#e1e5e9';
                emailInput.setCustomValidity('');
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', () => {
            if (phoneInput.value && !validatePhone(phoneInput.value)) {
                phoneInput.style.borderColor = '#dc3545';
                phoneInput.setCustomValidity('Inserisci un numero di telefono valido');
            } else {
                phoneInput.style.borderColor = '#e1e5e9';
                phoneInput.setCustomValidity('');
            }
        });
    }
});

// Loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            console.log('✅ Image loaded successfully:', img.src);
        });
        img.addEventListener('error', () => {
            console.error('❌ Image failed to load:', img.src);
            
            // Try fallback images for hero
            if (img.src.includes('bnb.webp')) {
                console.log('🔄 Trying hero SVG fallback...');
                img.src = 'images/hero-bg-simple.svg';
            } else if (img.src.includes('hero-bg')) {
                if (img.src.includes('simple')) {
                    console.log('🔄 Trying original hero image...');
                    img.src = 'images/hero-bg.svg';
                } else {
                    console.log('🔄 Showing hero fallback...');
                    const fallback = img.nextElementSibling;
                    if (fallback && fallback.classList.contains('hero-fallback')) {
                        fallback.style.display = 'flex';
                        img.style.display = 'none';
                    }
                }
            }
            
            // Show fallback for room images
            const fallback = img.nextElementSibling;
            if (fallback && fallback.classList.contains('room-fallback')) {
                fallback.style.display = 'flex';
                img.style.display = 'none';
            }
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
            if (document.body.classList.contains('keyboard-navigation')) {
                el.style.outline = '2px solid #ff385c';
                el.style.outlineOffset = '2px';
            }
        });
        
        el.addEventListener('blur', () => {
            el.style.outline = '';
            el.style.outlineOffset = '';
        });
    });
}); 