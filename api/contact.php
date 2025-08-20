<?php
/**
 * B&B Elegante - Contact Form Handler
 * Gestisce l'invio delle email dal form di contatto
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

// Configurazione email
$config = [
    'to_email' => 'info@bnelegante.it',
    'to_name' => 'B&B Elegante',
    'from_email' => 'noreply@bnelegante.it',
    'from_name' => 'B&B Elegante Website',
    'subject' => 'Nuovo messaggio dal sito web',
    'max_message_length' => 2000,
    'rate_limit_minutes' => 5,
    'rate_limit_attempts' => 3
];

/**
 * Valida e sanitizza i dati in input
 */
function validateInput($data) {
    $errors = [];
    
    // Nome
    if (empty($data['name']) || strlen($data['name']) < 2 || strlen($data['name']) > 100) {
        $errors['name'] = 'Il nome deve essere tra 2 e 100 caratteri';
    }
    
    // Email
    if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Email non valida';
    }
    
    // Telefono (opzionale)
    if (!empty($data['phone'])) {
        $phone = preg_replace('/[^0-9+\-\s\(\)]/', '', $data['phone']);
        if (strlen($phone) < 8 || strlen($phone) > 20) {
            $errors['phone'] = 'Numero di telefono non valido';
        }
    }
    
    // Messaggio
    if (empty($data['message']) || strlen($data['message']) < 10) {
        $errors['message'] = 'Il messaggio deve essere di almeno 10 caratteri';
    } elseif (strlen($data['message']) > $GLOBALS['config']['max_message_length']) {
        $errors['message'] = 'Il messaggio è troppo lungo (max ' . $GLOBALS['config']['max_message_length'] . ' caratteri)';
    }
    
    return $errors;
}

/**
 * Sanitizza i dati per prevenire XSS
 */
function sanitizeInput($data) {
    return [
        'name' => htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8'),
        'email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL),
        'phone' => !empty($data['phone']) ? htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8') : '',
        'message' => htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8'),
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        'timestamp' => date('Y-m-d H:i:s')
    ];
}

/**
 * Controlla rate limiting per prevenire spam
 */
function checkRateLimit($email, $ip) {
    $logFile = __DIR__ . '/../logs/contact_attempts.log';
    $logDir = dirname($logFile);
    
    // Crea directory se non esiste
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
    
    // Conta tentativi per email e IP
    $emailAttempts = 0;
    $ipAttempts = 0;
    
    foreach ($attempts as $attempt) {
        if ($attempt['email'] === $email) $emailAttempts++;
        if ($attempt['ip'] === $ip) $ipAttempts++;
    }
    
    // Verifica limiti
    if ($emailAttempts >= $GLOBALS['config']['rate_limit_attempts']) {
        return ['allowed' => false, 'message' => 'Troppi tentativi da questa email. Riprova tra ' . $GLOBALS['config']['rate_limit_minutes'] . ' minuti.'];
    }
    
    if ($ipAttempts >= $GLOBALS['config']['rate_limit_attempts'] * 2) {
        return ['allowed' => false, 'message' => 'Troppi tentativi da questo IP. Riprova tra ' . $GLOBALS['config']['rate_limit_minutes'] . ' minuti.'];
    }
    
    // Registra tentativo
    $attemptData = [
        'email' => $email,
        'ip' => $ip,
        'timestamp' => $currentTime
    ];
    
    file_put_contents($logFile, json_encode($attemptData) . "\n", FILE_APPEND | LOCK_EX);
    
    return ['allowed' => true];
}

/**
 * Invia email usando PHPMailer o mail() nativo
 */
function sendEmail($data) {
    $config = $GLOBALS['config'];
    
    // Prepara contenuto email
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
            .footer { background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>Nuovo Messaggio dal Sito Web</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>Nome:</span>
                <span class='value'>{$data['name']}</span>
            </div>
            <div class='field'>
                <span class='label'>Email:</span>
                <span class='value'>{$data['email']}</span>
            </div>
            " . (!empty($data['phone']) ? "
            <div class='field'>
                <span class='label'>Telefono:</span>
                <span class='value'>{$data['phone']}</span>
            </div>" : "") . "
            <div class='field'>
                <span class='label'>Messaggio:</span>
                <div class='value' style='margin-top: 10px; padding: 15px; background: #f9f9f9; border-left: 4px solid #ff385c;'>
                    " . nl2br($data['message']) . "
                </div>
            </div>
            <div class='field'>
                <span class='label'>IP:</span>
                <span class='value'>{$data['ip']}</span>
            </div>
            <div class='field'>
                <span class='label'>Data:</span>
                <span class='value'>{$data['timestamp']}</span>
            </div>
        </div>
        <div class='footer'>
            <p>Messaggio inviato dal form di contatto di B&B Elegante</p>
        </div>
    </body>
    </html>
    ";
    
    // Headers per email HTML
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
        'Reply-To: ' . $data['name'] . ' <' . $data['email'] . '>',
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 3',
        'X-MSMail-Priority: Normal'
    ];
    
    // Prova a inviare email
    $mailSent = mail(
        $config['to_email'],
        $subject,
        $body,
        implode("\r\n", $headers)
    );
    
    if (!$mailSent) {
        // Log errore
        error_log("Errore invio email: " . error_get_last()['message'] ?? 'Unknown error');
        return false;
    }
    
    // Invia anche email di conferma al mittente
    $confirmationSubject = 'Messaggio ricevuto - B&B Elegante';
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
            <h2>Messaggio Ricevuto</h2>
        </div>
        <div class='content'>
            <p>Gentile {$data['name']},</p>
            <p>Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.</p>
            <p><strong>Il tuo messaggio:</strong></p>
            <div style='padding: 15px; background: #f9f9f9; border-left: 4px solid #ff385c; margin: 15px 0;'>
                " . nl2br($data['message']) . "
            </div>
            <p>Grazie per averci contattato!</p>
            <p>Cordiali saluti,<br>Il team di B&B Elegante</p>
        </div>
        <div class='footer'>
            <p>B&B Elegante - Via Roma 123, 00100 Roma<br>Tel: +39 06 1234 5678 | Email: info@bnelegante.it</p>
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
    
    return true;
}

/**
 * Log delle attività per debugging
 */
function logActivity($action, $data) {
    $logFile = __DIR__ . '/../logs/contact_activity.log';
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
    $data = sanitizeInput($input);
    
    // Valida input
    $errors = validateInput($data);
    
    if (!empty($errors)) {
        logActivity('validation_error', $errors);
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Dati non validi',
            'errors' => $errors
        ]);
        exit;
    }
    
    // Controlla rate limiting
    $rateLimit = checkRateLimit($data['email'], $data['ip']);
    
    if (!$rateLimit['allowed']) {
        logActivity('rate_limit_exceeded', $rateLimit);
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => $rateLimit['message']
        ]);
        exit;
    }
    
    // Invia email
    $emailSent = sendEmail($data);
    
    if ($emailSent) {
        logActivity('email_sent', ['email' => $data['email'], 'name' => $data['name']]);
        echo json_encode([
            'success' => true,
            'message' => 'Messaggio inviato con successo! Ti risponderemo al più presto.'
        ]);
    } else {
        logActivity('email_failed', $data);
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Errore nell\'invio del messaggio. Riprova più tardi.'
        ]);
    }
    
} catch (Exception $e) {
    logActivity('exception', ['error' => $e->getMessage()]);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Errore interno del server. Riprova più tardi.'
    ]);
}
?> 