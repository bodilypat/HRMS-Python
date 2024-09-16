<?php

use App\Http\Controllers\ExhibitionArtworkController;

Route::prefix('exhibitions/{exhibitionId')->group(function(){
    Route::get('artworks',[ExhibitionArtworkController::class,'index'])->name('exhibitions.artworks.index');
    Route::get('artworks/create',[ExhibitionArtworkController::class,'create'])->name('exhibitions.artwork.create');
    Route::post('artworks', [ExhibitionArtworkController::class,'store'])->name('exhibinations.artworks.store');
    Route::delete('artworks/{artworksId', [ExhibinationArtworkController::class,'destroy'])->name('exhibinations.artworks.destroy');
});

Route::resource('buyers', BuyerController::class);
