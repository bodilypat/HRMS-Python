<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtworksTable extends Migration
{
    public function up()
    {
        Schema::create('artworks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('medium');
            $table->decimal('price', 10, 2)->nullable(); // Price of the artwork
            $table->string('image')->nullable(); // Path to the image file
            $table->foreignId('artist_id')->constrained()->onDelete('cascade'); // Foreign key to artists table
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('artworks');
    }
}
