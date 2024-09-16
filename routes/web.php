<?php

use App\Http\Controllers\ArtistController;
use App\Http\Controllers\ArtworkController;
use App\Http\Controllers\ExhibitionArtworkController;
use App\Http\Controllers\BuyerController;
use App\Http\Controllers\SaleController;

Route::prefix('exhibitions/{exhibitionId')->group(function(){
    Route::get('artworks',[ExhibitionArtworkController::class,'index'])->name('exhibitions.artworks.index');
    Route::get('artworks/create',[ExhibitionArtworkController::class,'create'])->name('exhibitions.artwork.create');
    Route::post('artworks', [ExhibitionArtworkController::class,'store'])->name('exhibinations.artworks.store');
    Route::delete('artworks/{artworksId', [ExhibinationArtworkController::class,'destroy'])->name('exhibinations.artworks.destroy');
});

Route::resource('artists', ArtistController::class);
Route::resource('artworks', ArtworkController::class);
Route::resource('sales', SaleController::class);
Route::resource('buyers', BuyerController::class);
