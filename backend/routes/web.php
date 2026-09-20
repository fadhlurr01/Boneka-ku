<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'status' => 'online',
        'service' => 'Bonekaku Backend REST API',
        'database' => 'connected',
        'version' => '1.0.0',
        'endpoints' => [
            'products' => '/api/products',
            'categories' => '/api/categories',
            'articles' => '/api/articles',
            'media' => '/api/media',
            'testimonials' => '/api/testimonials',
            'services' => '/api/services',
            'settings' => '/api/settings',
            'bean_bag_prices' => '/api/bean-bag-prices'
        ]
    ]);
});
