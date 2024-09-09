<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExhibitionArtworkTable extends Migration
{
    public function up()
    {
        Schema::create('exhibition_artwork', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exhibition_id')->constrained()->onDelete('cascade');
            $table->foreignId('artwork_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['exhibition_id', 'artwork_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('exhibition_artwork');
    }
}
