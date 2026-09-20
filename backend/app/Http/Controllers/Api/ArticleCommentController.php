<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ArticleComment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleCommentController extends Controller
{
    public function index(string $slug): JsonResponse
    {
        $comments = ArticleComment::where('article_slug', $slug)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $comments
        ]);
    }

    public function store(Request $request, string $slug): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email_or_url' => 'nullable|string|max:255',
            'comment' => 'required|string|max:1500',
            'is_admin' => 'nullable|boolean'
        ]);

        $comment = ArticleComment::create([
            'article_slug' => $slug,
            'name' => trim($validated['name']),
            'email_or_url' => isset($validated['email_or_url']) ? trim($validated['email_or_url']) : null,
            'comment' => trim($validated['comment']),
            'is_admin' => !empty($validated['is_admin'])
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Komentar berhasil dikirim.',
            'data' => $comment
        ], 201);
    }
}
