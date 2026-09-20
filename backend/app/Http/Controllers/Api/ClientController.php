<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\JsonResponse;

class ClientController extends Controller
{
    public function index(): JsonResponse
    {
        $clients = Client::orderBy('sort_order')->get();
        return response()->json([
            'success' => true,
            'data' => $clients
        ]);
    }
}
