<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\BeanBagPriceController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\ArticleCommentController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\MediaController;

// Categories
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// Bean Bag Prices
Route::get('/bean-bag-prices', [BeanBagPriceController::class, 'index']);

// Testimonials
Route::get('/testimonials', [TestimonialController::class, 'index']);

// Articles (Public & Admin CRUD)
Route::get('/articles', [ArticleController::class, 'index']);
Route::post('/articles', [ArticleController::class, 'store']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);
Route::put('/articles/{id}', [ArticleController::class, 'update']);
Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);

// Article Comments
Route::get('/articles/{slug}/comments', [ArticleCommentController::class, 'index']);
Route::post('/articles/{slug}/comments', [ArticleCommentController::class, 'store']);

// Services
Route::get('/services', [ServiceController::class, 'index']);

// Clients
Route::get('/clients', [ClientController::class, 'index']);

// Settings
Route::get('/settings', [SettingController::class, 'index']);
Route::post('/settings', [SettingController::class, 'update']);

// Contacts
Route::get('/contacts', [ContactController::class, 'index']);
Route::post('/contacts', [ContactController::class, 'store']);

// Media Library
Route::get('/media', [MediaController::class, 'index']);
Route::post('/media/upload', [MediaController::class, 'upload']);
Route::delete('/media/{filename}', [MediaController::class, 'destroy']);
