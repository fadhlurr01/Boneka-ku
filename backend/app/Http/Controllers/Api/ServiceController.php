<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::orderBy('sort_order')->get();
        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }
}
