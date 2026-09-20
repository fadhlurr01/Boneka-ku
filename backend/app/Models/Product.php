<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'category_slug',
        'tag',
        'name',
        'slug',
        'image_url',
        'size',
        'price',
        'description',
        'is_featured',
        'is_new',
        'sort_order'
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_new' => 'boolean',
        'price' => 'decimal:2'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
