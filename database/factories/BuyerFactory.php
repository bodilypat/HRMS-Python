<?php

namespace Database\Factory;

use App\Models\Buyer;
use Illuminate\Database\Eloquent\Factories\Factory;

class BuyerFactory extends Factory
{
    protected $model = Buyer::class;

    public function definition()
    {
        return [
            'name'=>$this->faker->name,
            'email'=>$this->faker->unique()->safeEmail;
            'phone'=>this->faker->phoneNumber;
            'address'=> $this->faker->address;
        ];
    }
}
