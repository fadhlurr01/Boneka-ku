<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::withCount('products')->orderBy('sort_order')->get();
        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $category = Category::with('products')->where('slug', $slug)->firstOrFail();
        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }
}
