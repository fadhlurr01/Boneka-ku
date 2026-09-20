<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'original_url',
        'cover_image',
        'date_formatted',
        'excerpt',
        'content',
        'author',
        'status'
    ];
}
