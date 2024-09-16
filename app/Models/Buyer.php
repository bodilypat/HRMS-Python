<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class buyer extends Model 
{
    use HasFactory;

    protected $table = 'buyers';

    /* Specify the attributes that are assignable */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
    ];

    /* Optionally, specify the attributes that should be cast to a specific date type */
    protected $casts = [
        'created_at' => 'datetime'
        'updated_at' => 'datetime'
    ]
}