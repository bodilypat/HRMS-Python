<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExhibitionArtwork extends Model
{
    use HasFactory;

    /* The table associated with the model. */
    protected $table = 'exhibitions_artworks';

    /* The primary key associated with the mode. */
    protected $primaryKey = 'id';

    /* Indicates if the model should be timestamped. */
    public $timestamps = true,

    /* The attributes that are mass assignable */
    protected $fillable = [
        'exhibition_id',
        'artwork_id',
        'display_date',
        'placement',
    ];

    /* Casting attribute to specific types */
    protected $cats = [
        'display_date' => 'datetime',
    ];

    /* Optionally, you might define relationship if needed */
    public function artworks()
    {
        return $this->belongsToMany(Artwork::class, 'artwork_id');
    }
}               
