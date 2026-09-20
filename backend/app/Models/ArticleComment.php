<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticleComment extends Model
{
    protected $fillable = [
        'article_slug',
        'name',
        'email_or_url',
        'comment',
        'is_admin'
    ];

    protected $casts = [
        'is_admin' => 'boolean'
    ];
}
