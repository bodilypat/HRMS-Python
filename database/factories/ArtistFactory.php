<?php

namespace Database\Factory;

use App\Models\Artist;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArtistFactory extends Factory
{
    protected $model = Artist::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'biography' => $this->faker->paragraph,
            'nationality' => $this->faker->country,
            'birth_date' => $this->faker->date,
        ];
    }
}