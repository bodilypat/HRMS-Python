<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artwork extends Model
{
    use HasFactory;

    /* The table associated with the model. */
    protected $table = 'artworks';

    /* The primary key associated with the table. */
    protected $primaryKey = 'id';

    /* Indicates if the model should be timestamped. */
    public $timestamp = true;

    /* Specify the atrributes that are mass assignable */
    protected $fillable = [
        'title',
        'description',
        'artist_id',
        'price',
        'creation_date',
        'image_path',
    ];

    /* Optionally, Specify the attributes that should be cast to a specific data type */
    protected $casts = [
        'creation_date' = > 'date', // Casting the creation_date to date type
        'price' => 'decimail:2', // Casting the price to a decimal type with 2 decimal points
        
    ];

    /* Define the relationship with the Arthis model */
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}
