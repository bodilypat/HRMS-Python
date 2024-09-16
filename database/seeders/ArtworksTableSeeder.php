<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArtWorksTableSeeder extends Seeder 
{
    public function run() 
    {
        DB::table('artworks')->insert([
            [
                'title' => 'Starry Night',
                'description' => 'A famous painting by vincent ',
                'artist_id' => 1, // Assuming artist with ID 1 exists
                'price', 10000.00,
                'creation_date' => '1889-06-01',
                'image_path' => 'image/starry_night.jpg',
            ],
            [
                'title' => 'Guernica',
                'description' => 'A large oil paiting ',
                'artist_id' => // assuming artis with ID 2 exists,
                'price' => 22000.00,
                'creation_date' => '1937-04-01',
                'image_path' => 'images/guernica.jpg',
            ]
        ]);
    }
}