<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artwork extends Model
{
    use HasFactory;

    protected $fillable = [
        'artist_id',
        'title',
        'description',
        'price',
        'image_path',
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}
