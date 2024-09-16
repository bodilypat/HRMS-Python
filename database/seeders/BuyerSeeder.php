<?php

namespace Database\Seeder;

use Illuminate\Database\Seeder;
use App\Model\Buyer;

class BuyersTableSeeder extends Seeder
{
    public function run()
    {
        /* Seed the buyer with 10 records */
        Buyer::factory()->count(10)->create();
    }
}
