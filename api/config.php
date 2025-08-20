<?php
/**
 * B&B Elegante - Configuration File
 * Configurazioni centralizzate per l'applicazione
 */

// Configurazione email
$email_config = [
    // Email di contatto
    'contact' => [
        'to_email' => 'info@bnelegante.it',
        'to_name' => 'B&B Elegante',
        'from_email' => 'noreply@bnelegante.it',
        'from_name' => 'B&B Elegante Website',
        'subject' => 'Nuovo messaggio dal sito web',
        'max_message_length' => 2000,
        'rate_limit_minutes' => 5,
        'rate_limit_attempts' => 3
    ],
    
    // Email di prenotazione
    'booking' => [
        'to_email' => 'prenotazioni@bnelegante.it',
        'to_name' => 'B&B Elegante - Prenotazioni',
        'from_email' => 'noreply@bnelegante.it',
        'from_name' => 'B&B Elegante Website',
        'subject' => 'Nuova prenotazione diretta',
        'rate_limit_minutes' => 10,
        'rate_limit_attempts' => 2
    ]
];

// Configurazione prezzi
$pricing_config = [
    'base_price_per_person' => 60, // € per notte per persona
    'long_stay_discount' => 0.9,   // 10% di sconto per soggiorni >= 7 notti
    'max_stay_days' => 30,         // Soggiorno massimo
    'max_guests' => 6              // Numero massimo di ospiti
];

// Configurazione validazione
$validation_config = [
    'name' => [
        'min_length' => 2,
        'max_length' => 100
    ],
    'email' => [
        'max_length' => 254
    ],
    'phone' => [
        'min_length' => 8,
        'max_length' => 20
    ],
    'message' => [
        'min_length' => 10,
        'max_length' => 2000
    ]
];

// Configurazione sicurezza
$security_config = [
    'allowed_origins' => ['*'], // In produzione specificare domini
    'rate_limit_enabled' => true,
    'log_activities' => true,
    'sanitize_input' => true
];

// Configurazione logging
$logging_config = [
    'log_dir' => __DIR__ . '/../logs',
    'contact_log' => 'contact_activity.log',
    'booking_log' => 'booking_activity.log',
    'attempts_log' => 'contact_attempts.log',
    'booking_attempts_log' => 'booking_attempts.log'
];

// Configurazione B&B
$bnb_config = [
    'name' => 'B&B Elegante',
    'address' => 'Via Roma 123, 00100 Roma',
    'phone' => '+39 06 1234 5678',
    'email' => 'info@bnelegante.it',
    'website' => 'https://bnelegante.it',
    'check_in_time' => '14:00 - 22:00',
    'check_out_time' => '11:00'
];

/**
 * Ottiene la configurazione per tipo
 */
function getConfig($type) {
    global $email_config, $pricing_config, $validation_config, $security_config, $logging_config, $bnb_config;
    
    switch ($type) {
        case 'email':
            return $email_config;
        case 'pricing':
            return $pricing_config;
        case 'validation':
            return $validation_config;
        case 'security':
            return $security_config;
        case 'logging':
            return $logging_config;
        case 'bnb':
            return $bnb_config;
        default:
            return null;
    }
}

/**
 * Verifica se l'origine è consentita
 */
function isOriginAllowed($origin) {
    $security = getConfig('security');
    return in_array('*', $security['allowed_origins']) || in_array($origin, $security['allowed_origins']);
}

/**
 * Crea directory di log se non esistono
 */
function ensureLogDirectories() {
    $logging = getConfig('logging');
    if (!is_dir($logging['log_dir'])) {
        mkdir($logging['log_dir'], 0755, true);
    }
}

/**
 * Log generico
 */
function logActivity($type, $action, $data) {
    $logging = getConfig('logging');
    ensureLogDirectories();
    
    $logFile = $logging['log_dir'] . '/' . $logging[$type . '_log'];
    
    $logEntry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'action' => $action,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        'data' => $data
    ];
    
    file_put_contents($logFile, json_encode($logEntry) . "\n", FILE_APPEND | LOCK_EX);
}

/**
 * Valida configurazione
 */
function validateConfig() {
    $errors = [];
    
    // Verifica email config
    $email_config = getConfig('email');
    foreach ($email_config as $type => $config) {
        if (empty($config['to_email']) || !filter_var($config['to_email'], FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Email di destinazione non valida per {$type}";
        }
        if (empty($config['from_email']) || !filter_var($config['from_email'], FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Email mittente non valida per {$type}";
        }
    }
    
    // Verifica prezzi
    $pricing = getConfig('pricing');
    if ($pricing['base_price_per_person'] <= 0) {
        $errors[] = "Prezzo base deve essere positivo";
    }
    
    return $errors;
}

// Validazione automatica della configurazione
$config_errors = validateConfig();
if (!empty($config_errors)) {
    error_log("Errori di configurazione: " . implode(', ', $config_errors));
}
?> 