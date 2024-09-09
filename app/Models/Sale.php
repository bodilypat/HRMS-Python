<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'artwork_id',
        'amount',
        'sale_date',
    ];

    public function artwork()
    {
        return $this->belongsTo(Artwork::class);
    }
}
