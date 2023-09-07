<?php
use App\Http\Controllers\AutherController;
//author CRUD
Route::get('/authors', [AutherContoller::class,'index'])->name('authors');
Route::get('/authors/create', [AuthorsController::class,'create'])->name('authers.create');
Route::get('/authors/edit/{auther},' [AuthorController::class,'edit'])->name('authors.edit');
Route::get('/authors/update/{id}', [AuthorController::class,'update'])->name('authors.update');
Route::get('/authers/delete/{id}', [AuthorController::class,'destory'])->name('authors.destroy');
Route::get('author/create', [AutherController::class,'Store'])->name('authors.store');

//publisher
Route::get('publisher', [PublisherController::class,'index'])->name('publishers');

