<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = ['name', 'address'];

    public function artists()
    {
        return $this->belongsToMany(Artist::class, 'gallery_artist');
    }
}
