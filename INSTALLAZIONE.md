# 🚀 Guida all'Installazione - B&B Elegante

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere installato:

- **Git** (versione 2.0 o superiore)
- **Node.js** (versione 14 o superiore)
- **PHP** (versione 7.4 o superiore)
- **Web Server** (Apache/Nginx o XAMPP)

## 🔧 Installazione

### 1. **Clona il Repository**

```bash
# Clona il repository dal tuo account GitHub
git clone https://github.com/thedragon689/bb-elegante.git

# Entra nella directory del progetto
cd bb-elegante
```

### 2. **Installa le Dipendenze**

```bash
# Installa tutte le dipendenze Node.js
npm install
```

### 3. **Configurazione Backend**

Modifica il file `api/config.php` per configurare:

```php
// Configurazione email
$email_config = [
    'contact' => [
        'to_email' => 'webdevl73@gmail.com',
        'from_email' => 'noreply@bnelegante.it'
    ],
    'booking' => [
        'to_email' => 'webdevl73@gmail.com'
    ]
];
```

### 4. **Avvia il Server di Sviluppo**

```bash
# Avvia il server di sviluppo
npm run dev
```

Il sito sarà disponibile su: `http://localhost:3000`

## 🌐 Configurazione Produzione

### **Build di Produzione**

```bash
# Crea la versione ottimizzata per la produzione
npm run build
```

### **Deploy su Server**

1. Carica i file dalla cartella `dist/` sul tuo server web
2. Assicurati che PHP sia abilitato
3. Configura le variabili d'ambiente per la produzione

## 📱 Script Disponibili

```bash
# Sviluppo
npm run dev          # Avvia server di sviluppo
npm run watch        # Watch per modifiche CSS/JS
npm run build        # Build di produzione

# Qualità del Codice
npm run lint         # Controlla JavaScript
npm run lint:css     # Controlla CSS
npm run format       # Formatta il codice

# Ottimizzazione
npm run optimize:images  # Ottimizza le immagini
npm run serve        # Serve la build di produzione
```

## 🔒 Configurazione Sicurezza

### **Rate Limiting**
```php
// In api/config.php
'rate_limit_minutes' => 5,    // Minuti tra tentativi
'rate_limit_attempts' => 3    // Numero tentativi massimi
```

### **Validazione Input**
- Nome: 2-100 caratteri
- Email: Validazione RFC
- Telefono: 8-20 caratteri numerici
- Messaggio: 10-2000 caratteri

## 🐛 Risoluzione Problemi

### **Problemi Comuni**

1. **Email non inviate**
   - Verifica configurazione SMTP
   - Controlla log in `api/logs/`

2. **Immagini non caricate**
   - Verifica percorsi file
   - Controlla permessi cartelle

3. **Errori JavaScript**
   - Apri console browser
   - Verifica errori di sintassi

### **Log e Debug**

```bash
# Controlla log in tempo reale
tail -f api/logs/contact_activity.log
tail -f api/logs/booking_activity.log
```

## 📞 Supporto

Per supporto tecnico o domande:

- **Email**: webdevl73@gmail.com
- **Repository**: https://github.com/thedragon689/bb-elegante.git
- **Issues**: Crea una issue su GitHub per bug o feature request

## 🔄 Aggiornamenti

### **Aggiorna il Progetto**

```bash
# Scarica le ultime modifiche
git pull origin main

# Reinstalla dipendenze se necessario
npm install

# Ricostruisci se ci sono cambiamenti
npm run build
```

### **Controlla lo Stato**

```bash
# Verifica stato repository
git status

# Controlla ultimi commit
git log --oneline -10
```

## 📊 Monitoraggio

### **Performance**
- Usa Chrome DevTools per analizzare performance
- Controlla Lighthouse score
- Monitora Core Web Vitals

### **Sicurezza**
- Esegui `npm audit` regolarmente
- Mantieni dipendenze aggiornate
- Controlla log per attività sospette

## 🎯 Prossimi Passi

Dopo l'installazione:

1. **Personalizza il contenuto** in `index.html`
2. **Modifica i colori** in `styles.css`
3. **Configura le email** in `api/config.php`
4. **Testa tutte le funzionalità**
5. **Deploy su server di produzione**

---

**B&B Elegante è ora installato e pronto per l'uso!** 🏠✨

Per ulteriori informazioni, consulta il [README.md](README.md) o contatta webdevl73@gmail.com
