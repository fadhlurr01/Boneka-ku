<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Article::query();

        // Status filter: default to 'published' for public users, or 'all'/'draft' for admin
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        } elseif (!$request->filled('status')) {
            $query->where('status', 'published');
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('title', 'like', "%{$s}%")
                  ->orWhere('excerpt', 'like', "%{$s}%")
                  ->orWhere('content', 'like', "%{$s}%");
            });
        }

        $perPage = $request->integer('per_page', 50);
        if ($perPage > 0) {
            $articles = $query->orderBy('id', 'desc')->paginate($perPage);
        } else {
            $allItems = $query->orderBy('id', 'desc')->get();
            $articles = [
                'data' => $allItems,
                'current_page' => 1,
                'last_page' => 1,
                'total' => $allItems->count()
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $article = Article::where('slug', $slug)->firstOrFail();
        $related = Article::where('id', '!=', $article->id)
            ->where('status', 'published')
            ->take(3)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'article' => $article,
                'related' => $related
            ]
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'original_url' => 'nullable|string|max:255',
            'cover_image' => 'nullable|string|max:1000',
            'date_formatted' => 'nullable|string|max:100',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'author' => 'nullable|string|max:100',
            'status' => 'nullable|in:published,draft'
        ]);

        $slug = !empty($validated['slug']) 
            ? Str::slug($validated['slug']) 
            : Str::slug($validated['title']);

        // Ensure unique slug
        $baseSlug = $slug;
        $count = 1;
        while (Article::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$count}";
            $count++;
        }

        $article = Article::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'original_url' => $validated['original_url'] ?? null,
            'cover_image' => $validated['cover_image'] ?? null,
            'date_formatted' => $validated['date_formatted'] ?? now()->translatedFormat('d F Y'),
            'excerpt' => $validated['excerpt'] ?? Str::limit(strip_tags($validated['content']), 150),
            'content' => $validated['content'],
            'author' => $validated['author'] ?? 'Bonekaku Admin',
            'status' => $validated['status'] ?? 'published'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Artikel berhasil dibuat.',
            'data' => $article
        ], 201);
    }

    public function update(Request $request, int|string $id): JsonResponse
    {
        $article = is_numeric($id) ? Article::findOrFail($id) : Article::where('slug', $id)->firstOrFail();

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'original_url' => 'nullable|string|max:255',
            'cover_image' => 'nullable|string|max:1000',
            'date_formatted' => 'nullable|string|max:100',
            'excerpt' => 'nullable|string',
            'content' => 'sometimes|required|string',
            'author' => 'nullable|string|max:100',
            'status' => 'nullable|in:published,draft'
        ]);

        if (isset($validated['slug']) && $validated['slug'] !== $article->slug) {
            $slug = Str::slug($validated['slug']);
            $baseSlug = $slug;
            $count = 1;
            while (Article::where('slug', $slug)->where('id', '!=', $article->id)->exists()) {
                $slug = "{$baseSlug}-{$count}";
                $count++;
            }
            $validated['slug'] = $slug;
        }

        $article->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Artikel berhasil diperbarui.',
            'data' => $article
        ]);
    }

    public function destroy(int|string $id): JsonResponse
    {
        $article = is_numeric($id) ? Article::findOrFail($id) : Article::where('slug', $id)->firstOrFail();
        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Artikel berhasil dihapus.'
        ]);
    }
}
