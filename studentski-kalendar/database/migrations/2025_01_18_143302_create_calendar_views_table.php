<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('calendar_views', function (Blueprint $table) {
            $table->id();
            $table->string('view_name');
            $table->date('date_from');
            $table->date('date_to');
            $table->unsignedBigInteger('calendar_id'); // Foreign key za Calendar

            $table->foreign('calendar_id')->references('id')->on('calendars')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calendar_views');
    }
};
