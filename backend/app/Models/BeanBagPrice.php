<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BeanBagPrice extends Model
{
    protected $fillable = ['size_label', 'dimensions', 'material', 'price', 'is_popular'];

    protected $casts = [
        'is_popular' => 'boolean'
    ];
}
