<?php

namespace Database\Factories;

use App\Models\Artwork;
use App\Models\Artist;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArtworkFactory extends Factory
{
    protected $model = Artwork::class;

    public function definition()
    { 
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'artist_id' => Artist::inRandomOrder()->first()->id(); // Randomly assign an existing artist
            'price' => $this->faker->date,
            'creation_date' => $this->faker->date,
            'image_path' => $this->faker->imageURL(640, 480,'art');
        ];
    }
}