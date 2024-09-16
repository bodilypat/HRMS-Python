<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGalleryArtistTable extends Migration
{
    public function up()
    {
        Schema::create('gallery_visitors', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique()->nullable();
            $table->string('phone_number')->nullable()
            $table->string('address')->nullable();
            $table->timestamp('visit_date');
            $table->timestamp();

            /* Optional, you can add indexs or constructs */
            $table->index('email');
        });
    }

    public function down()
    {
        Schema::dropIfExists('gallery_visitors');
    }
}
