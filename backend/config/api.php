<?php
require_once 'cors.php';

// Your API logic
$data = [
    'message' => 'Hello from the API!',
    'timestamp' => time()
];

header('Content-Type: application/json');
echo json_encode($data);