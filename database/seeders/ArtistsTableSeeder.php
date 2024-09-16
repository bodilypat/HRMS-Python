<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArtistsTableSeeder extends Seeder
{
    public function run() 
    {
        DB::table('artist')->insert([
            [
                'name' => 'Vincent'
                'biography' => 'A Dutch post-impressionest painter for his vivid works.';
                'nationality' => 'Dutch',
                'birth_date'=> '1853-03-30',
            ],
            [
                'name' => 'Pablo Picasso',
                'biography' => 'A Spanish painter, sculptor, printmaker, and one of the most influentail artist of the 20th century',
                'natinality' => 'Spanish'
                'birth_date' => '1881-10-25',
            ],
        ]);
    }
}