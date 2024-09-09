<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ArtworkController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ExhibitionController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

// Home route
Route::get('/', function () {
    return view('welcome');
})->name('home');

// Authentication routes
Auth::routes();

// Gallery routes
Route::resource('galleries', GalleryController::class);

// Artwork routes
Route::resource('artworks', ArtworkController::class);

// Sale routes
Route::resource('sales', SaleController::class);

// Exhibition routes
Route::resource('exhibitions', ExhibitionController::class);

// Artist routes
Route::resource('artists', ArtistController::class);

// Example of a route for user profile (if applicable)
Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'index'])->name('profile');

// Example of a route for admin dashboard (if applicable)
Route::get('/admin', [App\Http\Controllers\AdminController::class, 'index'])->name('admin.index');

// Example of a route for contact page
Route::get('/contact', function () {
    return view('contact');
})->name('contact');

