<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryVisitor extends Model
{
    /* The table associated with the table */
    protected $table = 'gallery_visitors';

    /* The primary key associated with the table */
    protected $parimaryKey = 'id';

    /* Indicated if the model should be timestamped. */
    public $timestamps = true;

    /* The attributes that are mass assignable */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'visit_date',
    ];

    /* Casting attributes to specific types */
    public function artists()
    {
        return $this->belongsToMany(Artist::class, 'gallery_artist');
    }
}
