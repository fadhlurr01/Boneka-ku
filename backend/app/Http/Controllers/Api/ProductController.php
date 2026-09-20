<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::with('category');

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category_slug', $request->category);
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->boolean('new')) {
            $query->where('is_new', true);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('tag', 'like', "%{$s}%")
                  ->orWhere('description', 'like', "%{$s}%");
            });
        }

        $perPage = $request->integer('per_page', 0);
        if ($perPage > 0) {
            $products = $query->orderBy('sort_order')->paginate($perPage);
        } else {
            $products = $query->orderBy('sort_order')->get();
        }

        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $product = Product::with('category')->where('slug', $slug)->firstOrFail();
        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category_slug' => 'required|string|max:255',
            'tag' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:1000',
            'size' => 'nullable|string|max:100',
            'price' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'is_new' => 'nullable|boolean',
            'sort_order' => 'nullable|integer|min:0'
        ]);

        $category = Category::where('slug', $validated['category_slug'])->first();
        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori produk tidak ditemukan.'
            ], 422);
        }

        $slug = !empty($validated['slug']) ? Str::slug($validated['slug']) : Str::slug($validated['name']);
        $baseSlug = $slug;
        $count = 1;
        while (Product::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$count}";
            $count++;
        }

        $product = Product::create([
            'category_id' => $category->id,
            'category_slug' => $category->slug,
            'tag' => $validated['tag'] ?? $category->name,
            'name' => $validated['name'],
            'slug' => $slug,
            'image_url' => $validated['image_url'] ?? 'https://placehold.co/600x600/edf2f5/1b5e5e?text=Bonekaku',
            'size' => $validated['size'] ?? null,
            'price' => $validated['price'] ?? 0,
            'description' => $validated['description'] ?? null,
            'is_featured' => (bool) ($validated['is_featured'] ?? false),
            'is_new' => (bool) ($validated['is_new'] ?? false),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil dibuat.',
            'data' => $product->fresh()
        ], 201);
    }

    public function update(Request $request, int|string $id): JsonResponse
    {
        $product = is_numeric($id) ? Product::findOrFail($id) : Product::where('slug', $id)->firstOrFail();

        $validated = $request->validate([
            'category_slug' => 'sometimes|required|string|max:255',
            'tag' => 'nullable|string|max:255',
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:1000',
            'size' => 'nullable|string|max:100',
            'price' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'is_new' => 'nullable|boolean',
            'sort_order' => 'nullable|integer|min:0'
        ]);

        if (isset($validated['category_slug'])) {
            $category = Category::where('slug', $validated['category_slug'])->first();
            if (!$category) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kategori produk tidak ditemukan.'
                ], 422);
            }
            $validated['category_id'] = $category->id;
            $validated['category_slug'] = $category->slug;
        }

        if (!empty($validated['slug']) && $validated['slug'] !== $product->slug) {
            $slug = Str::slug($validated['slug']);
            $baseSlug = $slug;
            $count = 1;
            while (Product::where('slug', $slug)->where('id', '!=', $product->id)->exists()) {
                $slug = "{$baseSlug}-{$count}";
                $count++;
            }
            $validated['slug'] = $slug;
        }

        if (isset($validated['name']) && empty($validated['slug']) && !isset($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $product->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil diperbarui.',
            'data' => $product->fresh()
        ]);
    }

    public function destroy(int|string $id): JsonResponse
    {
        $product = is_numeric($id) ? Product::findOrFail($id) : Product::where('slug', $id)->firstOrFail();
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil dihapus.'
        ]);
    }
}
