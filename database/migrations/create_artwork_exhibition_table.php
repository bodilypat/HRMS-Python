<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtworkExhibitionTable extends Migration
{

    /* Run the migrations. */
    public function up()
    {
        Schema::create('artwork_exhibition', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('exhibition_id');
            $table->unsignedBigInteger('artwork_id');
            $table->date('display_date')->nullable();
            $table->string('placement')->nullable();

            $table->foreignId('artwork_id')->constrained()->onDelete('cascade');
            $table->foreignId('exhibition_id')->constrained()->onDelete('cascade');
            
            $table->timestamps();

        });
    }

    /* Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('artwork_exhibition');
    }
}
