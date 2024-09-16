<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtworksTable extends Migration
{

    /* Run the migrations. */
    public function up()
    {
        Schema::create('artworks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('artist_id'); //Foreing key for artis
            $table->decimal('price', 10, 2)->nullable(); // Price of the artwork
            $table->integer('created_date')->nullable();
            $table->string('image_path')->nullable(); // Path to the image file
            $table->enum('available','sold','on loan')->default('avaliable');
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('artist_id')->reference('id')->('artist')->onDelete('cascade');
        });
    }

    /* Reverse the migration. */
    public function down()
    {
        Schema::dropIfExists('artworks');
    }
}
