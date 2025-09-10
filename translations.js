// Translation system for Villa Toscana website
const translations = {
    it: {
        // Header
        logo: "VILLA TOSCANA",
        
        // Hero Section
        "hero.subtitle": "Benvenuto a",
        "hero.title": "Villa Toscana",
        "hero.description1": "Appartamenti e camere per vacanze",
        "hero.description2": "Winery e location per Matrimoni",
        "scroll.text1": "SCROLL",
        "scroll.text2": "DOWN",
        "booking.button": "PRENOTA",
        
        // Navigation
        "nav.home": "Home",
        "nav.gallery": "Galleria",
        "nav.location": "Dove Siamo",
        "nav.services": "Servizi",
        "nav.testimonials": "Testimonianze",
        "nav.faq": "FAQ",
        "nav.contact": "Contatti",
        
        // Gallery Section
        "gallery.title": "Le Nostre Camere",
        "gallery.subtitle": "Scopri le nostre eleganti camere e appartamenti",
        "room.deluxe": "Camera Deluxe",
        "room.deluxe.desc": "Camera spaziosa con vista panoramica, bagno privato e balcone",
        "room.suite": "Suite Romantica",
        "room.suite.desc": "Suite elegante con jacuzzi, vista città e colazione inclusa",
        "room.family": "Appartamento Famiglia",
        "room.family.desc": "Spazioso appartamento con 2 camere, cucina e soggiorno",
        "room.extra": "Camera Extra",
        "room.extra.desc": "Camera confortevole con vista giardino e tutti i comfort moderni",
        "room.features.bed": "letto king-size",
        "room.features.bath": "Bagno privato",
        "room.features.wifi": "WiFi gratuito",
        "room.features.jacuzzi": "Jacuzzi",
        "room.features.breakfast": "Colazione inclusa",
        "room.features.kitchen": "Cucina attrezzata",
        "room.features.living": "Soggiorno",
        "room.features.garden": "Vista giardino",
        "room.book": "Prenota Ora",
        
        // Location Section
        "location.title": "Dove Siamo",
        "location.name": "Villa Toscana",
        "location.address": "Via del Chianti 123, 53013 Gaiole in Chianti (SI)",
        "location.phone": "+39 0577 123 456",
        "location.email": "info@villatoscana.it",
        "location.transport.title": "Come raggiungerci:",
        "location.transport.florence": "Da Firenze: 45 min in auto",
        "location.transport.siena": "Da Siena: 30 min in auto",
        "location.transport.airport": "Aeroporto Firenze: 1 ora",
        "location.transport.train": "Stazione Siena: 40 min",
        
        // Services Section
        "services.title": "Servizi nei Dintorni",
        "services.restaurants": "Ristoranti",
        "services.restaurants.desc": "I migliori ristoranti tradizionali toscani a pochi passi",
        "services.winery": "Winery",
        "services.winery.desc": "Visite guidate e degustazioni nei migliori vigneti",
        "services.attractions": "Attrazioni",
        "services.attractions.desc": "Monumenti e borghi storici nelle vicinanze",
        "services.weddings": "Matrimoni",
        "services.weddings.desc": "Location perfetta per il tuo giorno speciale",
        
        // Testimonials Section
        "testimonials.title": "Le Esperienze dei Nostri Ospiti",
        "testimonials.subtitle": "Scopri cosa dicono di noi i viaggiatori di tutto il mondo",
        "testimonial.1": "Esperienza indimenticabile! La villa è incantevole e la vista sui vigneti è mozzafiato. Torneremo sicuramente!",
        "testimonial.2": "Perfetto per un matrimonio romantico! Il personale è stato eccezionale e tutto è stato organizzato alla perfezione.",
        "testimonial.3": "La degustazione di vini è stata fantastica! Un'esperienza autentica nel cuore del Chianti.",
        
        // Contact Section
        "contact.title": "Contattaci",
        "contact.info.title": "Informazioni di Contatto",
        "contact.address": "Indirizzo",
        "contact.phone": "Telefono",
        "contact.email": "Email",
        "contact.checkin": "Orari Check-in",
        "contact.checkin.time": "14:00 - 22:00",
        "contact.social": "Seguici sui Social",
        "contact.form.title": "Invia un Messaggio",
        "contact.form.name": "Nome e Cognome",
        "contact.form.email": "Email",
        "contact.form.phone": "Telefono",
        "contact.form.message": "Il tuo messaggio",
        "contact.form.submit": "Invia Messaggio",
        
        // FAQ Section
        "faq.title": "Domande Frequenti",
        "faq.subtitle": "Tutto quello che devi sapere sul tuo soggiorno",
        "faq.1.question": "Quali sono gli orari di check-in e check-out?",
        "faq.1.answer": "Il check-in è disponibile dalle 14:00 alle 22:00, mentre il check-out è entro le 11:00 del mattino.",
        "faq.2.question": "È possibile prenotare per più di 4 persone?",
        "faq.2.answer": "Sì, contattaci direttamente per prenotazioni di gruppo o famiglie numerose. Offriamo soluzioni personalizzate.",
        "faq.3.question": "La colazione è inclusa nel prezzo?",
        "faq.3.answer": "Assolutamente sì! La nostra colazione continentale è inclusa nel prezzo e servita ogni mattina dalle 7:30 alle 10:00.",
        "faq.4.question": "Accettate animali domestici?",
        "faq.4.answer": "Sì, accettiamo animali domestici di piccola taglia su richiesta. È richiesto un supplemento di €15 per notte.",
        
        // Booking Modal
        "booking.title": "Prenota la tua Camera",
        "booking.direct.title": "Prenotazione Diretta",
        "booking.direct.desc": "Prenota direttamente con noi per i migliori prezzi",
        "booking.partner.title": "Prenota tramite Partner",
        "booking.partner.desc": "Prenota tramite i nostri partner ufficiali",
        "booking.checkin": "Check-in:",
        "booking.checkout": "Check-out:",
        "booking.guests": "Ospiti:",
        "booking.guest.1": "1 persona",
        "booking.guest.2": "2 persone",
        "booking.guest.3": "3 persone",
        "booking.guest.4": "4 persone",
        "booking.submit": "Prenota Direttamente",
        
        // Footer
        "footer.description": "Il tuo soggiorno perfetto nel cuore del Chianti",
        "footer.links": "Link Utili",
        "footer.contact": "Contatti",
        "footer.follow": "Seguici",
        "footer.copyright": "© 2024 Villa Toscana. Tutti i diritti riservati.",
        
        // Notifications
        "notification.booking.success": "Prenotazione inviata con successo! Ti contatteremo presto.",
        "notification.booking.error": "La data di check-out deve essere successiva al check-in",
        "notification.contact.success": "Messaggio inviato con successo! Ti risponderemo presto."
    },
    
    en: {
        // Header
        logo: "VILLA TOSCANA",
        
        // Hero Section
        "hero.subtitle": "Welcome to",
        "hero.title": "Villa Toscana",
        "hero.description1": "Apartments and rooms for holidays",
        "hero.description2": "Winery and location for Weddings",
        "scroll.text1": "SCROLL",
        "scroll.text2": "DOWN",
        "booking.button": "BOOK",
        
        // Navigation
        "nav.home": "Home",
        "nav.gallery": "Gallery",
        "nav.location": "Location",
        "nav.services": "Services",
        "nav.testimonials": "Testimonials",
        "nav.faq": "FAQ",
        "nav.contact": "Contact",
        
        // Gallery Section
        "gallery.title": "Our Rooms",
        "gallery.subtitle": "Discover our elegant rooms and apartments",
        "room.deluxe": "Deluxe Room",
        "room.deluxe.desc": "Spacious room with panoramic view, private bathroom and balcony",
        "room.suite": "Romantic Suite",
        "room.suite.desc": "Elegant suite with jacuzzi, city view and breakfast included",
        "room.family": "Family Apartment",
        "room.family.desc": "Spacious apartment with 2 bedrooms, kitchen and living room",
        "room.extra": "Extra Room",
        "room.extra.desc": "Comfortable room with garden view and all modern amenities",
        "room.features.bed": "king-size bed",
        "room.features.bath": "Private bathroom",
        "room.features.wifi": "Free WiFi",
        "room.features.jacuzzi": "Jacuzzi",
        "room.features.breakfast": "Breakfast included",
        "room.features.kitchen": "Fully equipped kitchen",
        "room.features.living": "Living room",
        "room.features.garden": "Garden view",
        "room.book": "Book Now",
        
        // Location Section
        "location.title": "Where We Are",
        "location.name": "Villa Toscana",
        "location.address": "Via del Chianti 123, 53013 Gaiole in Chianti (SI)",
        "location.phone": "+39 0577 123 456",
        "location.email": "info@villatoscana.it",
        "location.transport.title": "How to reach us:",
        "location.transport.florence": "From Florence: 45 min by car",
        "location.transport.siena": "From Siena: 30 min by car",
        "location.transport.airport": "Florence Airport: 1 hour",
        "location.transport.train": "Siena Station: 40 min",
        
        // Services Section
        "services.title": "Nearby Services",
        "services.restaurants": "Restaurants",
        "services.restaurants.desc": "The best traditional Tuscan restaurants just a few steps away",
        "services.winery": "Winery",
        "services.winery.desc": "Guided tours and tastings in the best vineyards",
        "services.attractions": "Attractions",
        "services.attractions.desc": "Monuments and historic villages in the vicinity",
        "services.weddings": "Weddings",
        "services.weddings.desc": "Perfect location for your special day",
        
        // Testimonials Section
        "testimonials.title": "Our Guests' Experiences",
        "testimonials.subtitle": "Discover what travelers from around the world say about us",
        "testimonial.1": "Unforgettable experience! The villa is enchanting and the view of the vineyards is breathtaking. We will definitely return!",
        "testimonial.2": "Perfect for a romantic wedding! The staff was exceptional and everything was organized to perfection.",
        "testimonial.3": "The wine tasting was fantastic! An authentic experience in the heart of Chianti.",
        
        // Contact Section
        "contact.title": "Contact Us",
        "contact.info.title": "Contact Information",
        "contact.address": "Address",
        "contact.phone": "Phone",
        "contact.email": "Email",
        "contact.checkin": "Check-in Hours",
        "contact.checkin.time": "14:00 - 22:00",
        "contact.social": "Follow Us on Social",
        "contact.form.title": "Send a Message",
        "contact.form.name": "Name and Surname",
        "contact.form.email": "Email",
        "contact.form.phone": "Phone",
        "contact.form.message": "Your message",
        "contact.form.submit": "Send Message",
        
        // FAQ Section
        "faq.title": "Frequently Asked Questions",
        "faq.subtitle": "Everything you need to know about your stay",
        "faq.1.question": "What are the check-in and check-out times?",
        "faq.1.answer": "Check-in is available from 14:00 to 22:00, while check-out is by 11:00 in the morning.",
        "faq.2.question": "Is it possible to book for more than 4 people?",
        "faq.2.answer": "Yes, contact us directly for group bookings or large families. We offer personalized solutions.",
        "faq.3.question": "Is breakfast included in the price?",
        "faq.3.answer": "Absolutely yes! Our continental breakfast is included in the price and served every morning from 7:30 to 10:00.",
        "faq.4.question": "Do you accept pets?",
        "faq.4.answer": "Yes, we accept small pets on request. A supplement of €15 per night is required.",
        
        // Booking Modal
        "booking.title": "Book Your Room",
        "booking.direct.title": "Direct Booking",
        "booking.direct.desc": "Book directly with us for the best prices",
        "booking.partner.title": "Book via Partners",
        "booking.partner.desc": "Book through our official partners",
        "booking.checkin": "Check-in:",
        "booking.checkout": "Check-out:",
        "booking.guests": "Guests:",
        "booking.guest.1": "1 person",
        "booking.guest.2": "2 people",
        "booking.guest.3": "3 people",
        "booking.guest.4": "4 people",
        "booking.submit": "Book Directly",
        
        // Footer
        "footer.description": "Your perfect stay in the heart of Chianti",
        "footer.links": "Useful Links",
        "footer.contact": "Contact",
        "footer.follow": "Follow Us",
        "footer.copyright": "© 2024 Villa Toscana. All rights reserved.",
        
        // Notifications
        "notification.booking.success": "Booking sent successfully! We will contact you soon.",
        "notification.booking.error": "Check-out date must be after check-in date",
        "notification.contact.success": "Message sent successfully! We will reply soon."
    }
};

// Translation function
function translatePage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    
    // Update form placeholders
    const inputs = document.querySelectorAll('input[data-translate-placeholder], textarea[data-translate-placeholder]');
    inputs.forEach(input => {
        const key = input.getAttribute('data-translate-placeholder');
        if (translations[language] && translations[language][key]) {
            input.setAttribute('placeholder', translations[language][key]);
        }
    });
    
    // Update form labels
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        const key = label.textContent.trim();
        if (translations[language] && translations[language][key]) {
            label.textContent = translations[language][key];
        }
    });
    
    // Update select options
    const options = document.querySelectorAll('option');
    options.forEach(option => {
        const key = option.textContent.trim();
        if (translations[language] && translations[language][key]) {
            option.textContent = translations[language][key];
        }
    });
}

// Initialize translation system
document.addEventListener('DOMContentLoaded', function() {
    // Set default language
    let currentLanguage = localStorage.getItem('language') || 'it';
    
    // Update language selector
    document.querySelectorAll('.lang').forEach(lang => {
        lang.classList.remove('active');
        if (lang.getAttribute('data-lang') === currentLanguage) {
            lang.classList.add('active');
        }
    });
    
    // Translate page
    translatePage(currentLanguage);
    
    // Add language selector event listeners
    document.querySelectorAll('.lang').forEach(lang => {
        lang.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            
            // Update active state
            document.querySelectorAll('.lang').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Save language preference
            localStorage.setItem('language', selectedLang);
            
            // Translate page
            translatePage(selectedLang);
        });
    });
});
