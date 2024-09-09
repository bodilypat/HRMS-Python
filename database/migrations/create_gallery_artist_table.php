<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGalleryArtistTable extends Migration
{
    public function up()
    {
        Schema::create('gallery_artist', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_id')->constrained()->onDelete('cascade');
            $table->foreignId('artist_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['gallery_id', 'artist_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('gallery_artist');
    }
}
