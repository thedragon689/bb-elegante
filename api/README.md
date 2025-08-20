# 🔧 Backend PHP - B&B Elegante

## 📁 Struttura API

```
api/
├── contact.php          # Gestione form contatto
├── booking.php          # Gestione prenotazioni dirette
├── config.php           # Configurazioni centralizzate
└── README.md           # Documentazione
```

## 🚀 Endpoint API

### POST `/api/contact.php`
Gestisce l'invio delle email dal form di contatto.

**Parametri richiesti:**
```json
{
    "name": "Mario Rossi",
    "email": "mario@example.com",
    "phone": "+39 123 456 7890",
    "message": "Messaggio del cliente"
}
```

**Risposta di successo:**
```json
{
    "success": true,
    "message": "Messaggio inviato con successo! Ti risponderemo al più presto."
}
```

**Risposta di errore:**
```json
{
    "success": false,
    "message": "Dati non validi",
    "errors": {
        "email": "Email non valida"
    }
}
```

### POST `/api/booking.php`
Gestisce le richieste di prenotazione diretta.

**Parametri richiesti:**
```json
{
    "checkIn": "2024-08-15",
    "checkOut": "2024-08-18",
    "guests": 2,
    "name": "Mario Rossi",
    "email": "mario@example.com",
    "phone": "+39 123 456 7890",
    "specialRequests": "Camera con vista"
}
```

**Risposta di successo:**
```json
{
    "success": true,
    "message": "Richiesta di prenotazione inviata con successo!",
    "details": {
        "nights": 3,
        "estimatedPrice": 360
    }
}
```

## 🔧 Configurazione

### Email Settings (`config.php`)
```php
$email_config = [
    'contact' => [
        'to_email' => 'info@bnelegante.it',
        'from_email' => 'noreply@bnelegante.it',
        'rate_limit_minutes' => 5,
        'rate_limit_attempts' => 3
    ],
    'booking' => [
        'to_email' => 'prenotazioni@bnelegante.it',
        'rate_limit_minutes' => 10,
        'rate_limit_attempts' => 2
    ]
];
```

### Pricing Settings
```php
$pricing_config = [
    'base_price_per_person' => 60, // € per notte
    'long_stay_discount' => 0.9,   // 10% sconto
    'max_stay_days' => 30,
    'max_guests' => 6
];
```

## 🛡️ Sicurezza

### Rate Limiting
- **Contatto**: 3 tentativi ogni 5 minuti per email/IP
- **Prenotazione**: 2 tentativi ogni 10 minuti per IP

### Validazione Input
- **Nome**: 2-100 caratteri
- **Email**: Validazione formato RFC
- **Telefono**: 8-20 caratteri numerici
- **Messaggio**: 10-2000 caratteri
- **Date**: Validazione logica check-in/check-out

### Sanitizzazione
- **XSS Prevention**: `htmlspecialchars()` su tutti gli input
- **Email Sanitization**: `filter_var()` con FILTER_SANITIZE_EMAIL
- **SQL Injection**: Nessun database, solo file system

## 📧 Sistema Email

### Email di Contatto
- **Destinatario**: `info@bnelegante.it`
- **Formato**: HTML con styling CSS
- **Contenuto**: Dettagli messaggio + info cliente
- **Conferma**: Email automatica al mittente

### Email di Prenotazione
- **Destinatario**: `prenotazioni@bnelegante.it`
- **Formato**: HTML con dettagli prenotazione
- **Contenuto**: Date, ospiti, prezzo stimato
- **Priorità**: Alta (X-Priority: 1)

### Template Email
```html
<div class="header">
    <h2>Nuovo Messaggio dal Sito Web</h2>
</div>
<div class="content">
    <div class="field">
        <span class="label">Nome:</span>
        <span class="value">{nome}</span>
    </div>
    <!-- Altri campi -->
</div>
```

## 📊 Logging

### File di Log
- `logs/contact_activity.log` - Attività form contatto
- `logs/booking_activity.log` - Attività prenotazioni
- `logs/contact_attempts.log` - Tentativi rate limiting
- `logs/booking_attempts.log` - Tentativi prenotazione

### Formato Log
```json
{
    "timestamp": "2024-08-06 10:30:00",
    "action": "email_sent",
    "ip": "192.168.1.1",
    "data": {
        "email": "mario@example.com",
        "name": "Mario Rossi"
    }
}
```

## 🔄 Integrazione Frontend

### JavaScript Fetch
```javascript
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
        // Success handling
    } else {
        // Error handling
    }
});
```

## 🚀 Deploy

### Requisiti Server
- **PHP**: 7.4+ (raccomandato 8.0+)
- **Mail**: Funzione `mail()` abilitata
- **File System**: Permessi di scrittura per logs
- **Memory**: 128MB minimo

### Configurazione Apache
```apache
# .htaccess per sicurezza
<Files "*.log">
    Order allow,deny
    Deny from all
</Files>

<Files "config.php">
    Order allow,deny
    Deny from all
</Files>
```

### Configurazione Email
```php
// In produzione, configurare SMTP
ini_set('sendmail_path', '/usr/sbin/sendmail -t -i');
```

## 🧪 Testing

### Test Locale
```bash
# Test contact form
curl -X POST http://localhost/B%26B/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'

# Test booking form
curl -X POST http://localhost/B%26B/api/booking.php \
  -H "Content-Type: application/json" \
  -d '{"checkIn":"2024-08-15","checkOut":"2024-08-18","guests":2}'
```

### Test Email
```bash
# Verifica log
tail -f logs/contact_activity.log
tail -f logs/booking_activity.log
```

## 🔧 Troubleshooting

### Errori Comuni

1. **Email non inviate**
   - Verifica funzione `mail()` abilitata
   - Controlla log errori PHP
   - Verifica configurazione SMTP

2. **Rate limiting troppo aggressivo**
   - Modifica `rate_limit_attempts` in `config.php`
   - Pulisci file di log tentativi

3. **Errori di validazione**
   - Controlla formato date (YYYY-MM-DD)
   - Verifica email valida
   - Controlla lunghezza messaggi

4. **Permessi file**
   ```bash
   chmod 755 api/
   chmod 644 api/*.php
   chmod 755 logs/
   chmod 644 logs/*.log
   ```

## 📈 Monitoraggio

### Metriche da Monitorare
- **Email inviate/giorno**
- **Rate limiting triggers**
- **Errori di validazione**
- **Tempi di risposta API**

### Alerting
```bash
# Monitora errori
grep "ERROR" logs/*.log

# Monitora rate limiting
grep "rate_limit_exceeded" logs/*.log
```

Il backend PHP è **pronto per la produzione** con tutte le funzionalità di sicurezza e logging! 🚀✨ 