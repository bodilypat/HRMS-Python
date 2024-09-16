<?php

namespace App\Models;

use Illuminate\Database\Eloquent\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    /* Define the table associated with the model  */
    protected $table ='artists';

    protected $primaryKey ='id';

    // Indicates if the model should be timestamped.
    public $timestamps = true;

    /* Specified the attribute that are mass assignment */
    protected $fillable = [
        'name',
        'biography',
        'nationality',
        'birth_date',
    ];

    /* Optional, Specify the attribute  that should be cast to a specific data type */
    protected $casts = [
        'birth_date' => 'date', // casting birth_date to a date type
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ]

    // Define relationship if applicable
    public function artworks()
    {
        return $this->hasMany(Artwork::class,'artist_id');
    }
}
