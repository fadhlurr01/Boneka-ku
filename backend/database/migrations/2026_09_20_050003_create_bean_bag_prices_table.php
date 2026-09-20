<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bean_bag_prices', function (Blueprint $table) {
            $table->id();
            $table->string('size_label');
            $table->string('dimensions')->nullable();
            $table->string('material')->nullable();
            $table->string('price');
            $table->boolean('is_popular')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bean_bag_prices');
    }
};
