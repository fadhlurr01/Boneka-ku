<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function index(): JsonResponse
    {
        $directory = public_path('uploads/media');
        if (!File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        $files = File::files($directory);
        $mediaList = [];

        foreach ($files as $file) {
            $filename = $file->getFilename();
            $mediaList[] = [
                'name' => $filename,
                'url' => url("uploads/media/{$filename}"),
                'size' => $file->getSize(),
                'updated_at' => $file->getMTime(),
            ];
        }

        // Sort latest first
        usort($mediaList, fn($a, $b) => $b['updated_at'] <=> $a['updated_at']);

        return response()->json([
            'success' => true,
            'data' => $mediaList
        ]);
    }

    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,gif,svg|max:10240'
        ]);

        $file = $request->file('image');
        $directory = public_path('uploads/media');

        if (!File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        $ext = $file->getClientOriginalExtension();
        $safeName = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
        $filename = $safeName . '-' . time() . '.' . $ext;

        $file->move($directory, $filename);

        $url = url("uploads/media/{$filename}");

        return response()->json([
            'success' => true,
            'message' => 'Gambar berhasil diunggah.',
            'data' => [
                'name' => $filename,
                'url' => $url,
            ]
        ], 201);
    }

    public function destroy(string $filename): JsonResponse
    {
        $filepath = public_path("uploads/media/{$filename}");

        if (File::exists($filepath)) {
            File::delete($filepath);
            return response()->json([
                'success' => true,
                'message' => 'Gambar berhasil dihapus.'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Berkas tidak ditemukan.'
        ], 404);
    }
}
