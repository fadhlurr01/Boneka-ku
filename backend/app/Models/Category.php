<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['slug', 'name', 'description', 'external_link', 'sort_order'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
