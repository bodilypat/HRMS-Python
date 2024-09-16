<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBuyersTable extends Migration
{
    /* Run the migrations. */
    public function up()
    {
        Schema::create('buyers', function(Blueprint $table){
            $table->id();
            $table->string('name');
            $table->string('email')->unique;
            $table->string('phone')->nullable;
            $table->text('address')->nullable();
            $table->timestamps();
        });
    }

    /* Reverse  the migration. */

    public function down()
    {
        Schema::dropIfExists('buyers');
    }
}