<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExhibitionsTable extends Migration
{

    /* Run the migrations. */
    public function up()
    {
        Schema::create('exhibitions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->date('start_date');
            $table->date('end_date');        
            $table->string('location');
            $table->timestamps(); // Created a and updated at timestamps
        });
    }

    /* Reverse the migrations */
    public function down()
    {
        Schema::dropIfExists('exhibitions');
    }
}
