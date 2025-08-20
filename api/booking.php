<?php
/**
 * B&B Elegante - Direct Booking Handler
 * Gestisce le prenotazioni dirette dal form di booking
 */

// Configurazione
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Verifica metodo HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
    exit;
}

// Configurazione booking
$config = [
    'to_email' => 'prenotazioni@bnelegante.it',
    'to_name' => 'B&B Elegante - Prenotazioni',
    'from_email' => 'noreply@bnelegante.it',
    'from_name' => 'B&B Elegante Website',
    'subject' => 'Nuova prenotazione diretta',
    'rate_limit_minutes' => 10,
    'rate_limit_attempts' => 2
];

/**
 * Valida e sanitizza i dati di prenotazione
 */
function validateBookingInput($data) {
    $errors = [];
    
    // Check-in
    if (empty($data['checkIn'])) {
        $errors['checkIn'] = 'Data di check-in richiesta';
    } else {
        $checkIn = strtotime($data['checkIn']);
        $today = strtotime('today');
        
        if ($checkIn < $today) {
            $errors['checkIn'] = 'La data di check-in non può essere nel passato';
        }
    }
    
    // Check-out
    if (empty($data['checkOut'])) {
        $errors['checkOut'] = 'Data di check-out richiesta';
    } else {
        $checkOut = strtotime($data['checkOut']);
        $checkIn = strtotime($data['checkIn']);
        
        if ($checkOut <= $checkIn) {
            $errors['checkOut'] = 'La data di check-out deve essere successiva al check-in';
        }
        
        // Verifica soggiorno massimo (30 giorni)
        $diff = ($checkOut - $checkIn) / (60 * 60 * 24);
        if ($diff > 30) {
            $errors['checkOut'] = 'Il soggiorno massimo è di 30 giorni';
        }
    }
    
    // Ospiti
    if (empty($data['guests']) || !is_numeric($data['guests'])) {
        $errors['guests'] = 'Numero di ospiti richiesto';
    } else {
        $guests = intval($data['guests']);
        if ($guests < 1 || $guests > 6) {
            $errors['guests'] = 'Il numero di ospiti deve essere tra 1 e 6';
        }
    }
    
    // Nome (opzionale per prenotazione)
    if (!empty($data['name'])) {
        if (strlen($data['name']) < 2 || strlen($data['name']) > 100) {
            $errors['name'] = 'Il nome deve essere tra 2 e 100 caratteri';
        }
    }
    
    // Email (opzionale per prenotazione)
    if (!empty($data['email'])) {
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Email non valida';
        }
    }
    
    // Telefono (opzionale)
    if (!empty($data['phone'])) {
        $phone = preg_replace('/[^0-9+\-\s\(\)]/', '', $data['phone']);
        if (strlen($phone) < 8 || strlen($phone) > 20) {
            $errors['phone'] = 'Numero di telefono non valido';
        }
    }
    
    return $errors;
}

/**
 * Sanitizza i dati di prenotazione
 */
function sanitizeBookingInput($data) {
    return [
        'checkIn' => $data['checkIn'] ?? '',
        'checkOut' => $data['checkOut'] ?? '',
        'guests' => intval($data['guests'] ?? 1),
        'name' => !empty($data['name']) ? htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8') : '',
        'email' => !empty($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '',
        'phone' => !empty($data['phone']) ? htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8') : '',
        'specialRequests' => !empty($data['specialRequests']) ? htmlspecialchars(trim($data['specialRequests']), ENT_QUOTES, 'UTF-8') : '',
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        'timestamp' => date('Y-m-d H:i:s')
    ];
}

/**
 * Calcola il numero di notti
 */
function calculateNights($checkIn, $checkOut) {
    $checkInDate = new DateTime($checkIn);
    $checkOutDate = new DateTime($checkOut);
    $interval = $checkInDate->diff($checkOutDate);
    return $interval->days;
}

/**
 * Calcola il prezzo stimato
 */
function calculatePrice($nights, $guests) {
    // Prezzo base per notte per persona
    $basePricePerPerson = 60;
    $totalPrice = $nights * $guests * $basePricePerPerson;
    
    // Sconto per soggiorni lunghi
    if ($nights >= 7) {
        $totalPrice *= 0.9; // 10% di sconto
    }
    
    return round($totalPrice);
}

/**
 * Controlla rate limiting per prenotazioni
 */
function checkBookingRateLimit($ip) {
    $logFile = __DIR__ . '/../logs/booking_attempts.log';
    $logDir = dirname($logFile);
    
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    
    $currentTime = time();
    $limitTime = $currentTime - ($GLOBALS['config']['rate_limit_minutes'] * 60);
    
    // Leggi tentativi precedenti
    $attempts = [];
    if (file_exists($logFile)) {
        $lines = file($logFile, FILE_IGNORE_NEW_LINES);
        foreach ($lines as $line) {
            $data = json_decode($line, true);
            if ($data && $data['timestamp'] > $limitTime) {
                $attempts[] = $data;
            }
        }
    }
    
    // Conta tentativi per IP
    $ipAttempts = 0;
    foreach ($attempts as $attempt) {
        if ($attempt['ip'] === $ip) $ipAttempts++;
    }
    
    // Verifica limiti
    if ($ipAttempts >= $GLOBALS['config']['rate_limit_attempts']) {
        return ['allowed' => false, 'message' => 'Troppi tentativi di prenotazione. Riprova tra ' . $GLOBALS['config']['rate_limit_minutes'] . ' minuti.'];
    }
    
    // Registra tentativo
    $attemptData = [
        'ip' => $ip,
        'timestamp' => $currentTime
    ];
    
    file_put_contents($logFile, json_encode($attemptData) . "\n", FILE_APPEND | LOCK_EX);
    
    return ['allowed' => true];
}

/**
 * Invia email di prenotazione
 */
function sendBookingEmail($data) {
    $config = $GLOBALS['config'];
    
    $nights = calculateNights($data['checkIn'], $data['checkOut']);
    $estimatedPrice = calculatePrice($nights, $data['guests']);
    
    // Formatta date per visualizzazione
    $checkInFormatted = date('d/m/Y', strtotime($data['checkIn']));
    $checkOutFormatted = date('d/m/Y', strtotime($data['checkOut']));
    
    $subject = $config['subject'];
    
    $body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #ff385c; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .field { margin: 15px 0; }
            .label { font-weight: bold; color: #666; }
            .value { margin-left: 10px; }
            .price { background: #f0f8ff; padding: 15px; border-left: 4px solid #ff385c; margin: 15px 0; }
            .footer { background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            .urgent { background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; margin: 15px 0; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>Nuova Prenotazione Diretta</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>Check-in:</span>
                <span class='value'>{$checkInFormatted}</span>
            </div>
            <div class='field'>
                <span class='label'>Check-out:</span>
                <span class='value'>{$checkOutFormatted}</span>
            </div>
            <div class='field'>
                <span class='label'>Numero notti:</span>
                <span class='value'>{$nights}</span>
            </div>
            <div class='field'>
                <span class='label'>Ospiti:</span>
                <span class='value'>{$data['guests']}</span>
            </div>
            " . (!empty($data['name']) ? "
            <div class='field'>
                <span class='label'>Nome:</span>
                <span class='value'>{$data['name']}</span>
            </div>" : "") . "
            " . (!empty($data['email']) ? "
            <div class='field'>
                <span class='label'>Email:</span>
                <span class='value'>{$data['email']}</span>
            </div>" : "") . "
            " . (!empty($data['phone']) ? "
            <div class='field'>
                <span class='label'>Telefono:</span>
                <span class='value'>{$data['phone']}</span>
            </div>" : "") . "
            " . (!empty($data['specialRequests']) ? "
            <div class='field'>
                <span class='label'>Richieste speciali:</span>
                <div class='value' style='margin-top: 10px; padding: 15px; background: #f9f9f9; border-left: 4px solid #ff385c;'>
                    " . nl2br($data['specialRequests']) . "
                </div>
            </div>" : "") . "
            <div class='price'>
                <strong>Prezzo stimato:</strong> €{$estimatedPrice} per {$nights} notti
                " . ($nights >= 7 ? "<br><em>Sconto 10% applicato per soggiorno lungo</em>" : "") . "
            </div>
            <div class='urgent'>
                <strong>⚠️ Azione richiesta:</strong> Contatta immediatamente il cliente per confermare disponibilità e prezzo finale.
            </div>
            <div class='field'>
                <span class='label'>IP:</span>
                <span class='value'>{$data['ip']}</span>
            </div>
            <div class='field'>
                <span class='label'>Data richiesta:</span>
                <span class='value'>{$data['timestamp']}</span>
            </div>
        </div>
        <div class='footer'>
            <p>Prenotazione richiesta dal sito web di B&B Elegante</p>
        </div>
    </body>
    </html>
    ";
    
    // Headers per email HTML
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
        'Reply-To: ' . (!empty($data['email']) ? $data['email'] : $config['from_email']),
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 1',
        'X-MSMail-Priority: High'
    ];
    
    // Invia email
    $mailSent = mail(
        $config['to_email'],
        $subject,
        $body,
        implode("\r\n", $headers)
    );
    
    if (!$mailSent) {
        error_log("Errore invio email prenotazione: " . error_get_last()['message'] ?? 'Unknown error');
        return false;
    }
    
    // Invia email di conferma al cliente se email fornita
    if (!empty($data['email'])) {
        $confirmationSubject = 'Richiesta prenotazione ricevuta - B&B Elegante';
        $confirmationBody = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .header { background: #ff385c; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class='header'>
                <h2>Richiesta Prenotazione Ricevuta</h2>
            </div>
            <div class='content'>
                <p>Gentile " . (!empty($data['name']) ? $data['name'] : 'Cliente') . ",</p>
                <p>Abbiamo ricevuto la tua richiesta di prenotazione e ti contatteremo al più presto per confermare disponibilità e prezzo finale.</p>
                <p><strong>Dettagli della richiesta:</strong></p>
                <ul>
                    <li><strong>Check-in:</strong> {$checkInFormatted}</li>
                    <li><strong>Check-out:</strong> {$checkOutFormatted}</li>
                    <li><strong>Ospiti:</strong> {$data['guests']}</li>
                    <li><strong>Notti:</strong> {$nights}</li>
                    <li><strong>Prezzo stimato:</strong> €{$estimatedPrice}</li>
                </ul>
                <p>Ti risponderemo entro 24 ore per confermare la prenotazione.</p>
                <p>Grazie per aver scelto B&B Elegante!</p>
                <p>Cordiali saluti,<br>Il team di B&B Elegante</p>
            </div>
            <div class='footer'>
                <p>B&B Elegante - Via Roma 123, 00100 Roma<br>Tel: +39 06 1234 5678 | Email: prenotazioni@bnelegante.it</p>
            </div>
        </body>
        </html>
        ";
        
        $confirmationHeaders = [
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
            'X-Mailer: PHP/' . phpversion()
        ];
        
        mail($data['email'], $confirmationSubject, $confirmationBody, implode("\r\n", $confirmationHeaders));
    }
    
    return true;
}

/**
 * Log delle attività di prenotazione
 */
function logBookingActivity($action, $data) {
    $logFile = __DIR__ . '/../logs/booking_activity.log';
    $logDir = dirname($logFile);
    
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    
    $logEntry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'action' => $action,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'data' => $data
    ];
    
    file_put_contents($logFile, json_encode($logEntry) . "\n", FILE_APPEND | LOCK_EX);
}

// Main execution
try {
    // Leggi dati POST
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        $input = $_POST;
    }
    
    // Sanitizza input
    $data = sanitizeBookingInput($input);
    
    // Valida input
    $errors = validateBookingInput($data);
    
    if (!empty($errors)) {
        logBookingActivity('validation_error', $errors);
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Dati di prenotazione non validi',
            'errors' => $errors
        ]);
        exit;
    }
    
    // Controlla rate limiting
    $rateLimit = checkBookingRateLimit($data['ip']);
    
    if (!$rateLimit['allowed']) {
        logBookingActivity('rate_limit_exceeded', $rateLimit);
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => $rateLimit['message']
        ]);
        exit;
    }
    
    // Calcola dettagli prenotazione
    $nights = calculateNights($data['checkIn'], $data['checkOut']);
    $estimatedPrice = calculatePrice($nights, $data['guests']);
    
    // Invia email
    $emailSent = sendBookingEmail($data);
    
    if ($emailSent) {
        logBookingActivity('booking_request_sent', [
            'checkIn' => $data['checkIn'],
            'checkOut' => $data['checkOut'],
            'guests' => $data['guests'],
            'nights' => $nights,
            'estimatedPrice' => $estimatedPrice
        ]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Richiesta di prenotazione inviata con successo! Ti contatteremo al più presto per confermare disponibilità e prezzo finale.',
            'details' => [
                'nights' => $nights,
                'estimatedPrice' => $estimatedPrice
            ]
        ]);
    } else {
        logBookingActivity('booking_email_failed', $data);
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Errore nell\'invio della richiesta di prenotazione. Riprova più tardi.'
        ]);
    }
    
} catch (Exception $e) {
    logBookingActivity('exception', ['error' => $e->getMessage()]);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Errore interno del server. Riprova più tardi.'
    ]);
}
?> 