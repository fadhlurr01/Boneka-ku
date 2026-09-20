<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BeanBagPrice;
use Illuminate\Http\JsonResponse;

class BeanBagPriceController extends Controller
{
    public function index(): JsonResponse
    {
        $prices = BeanBagPrice::orderBy('id')->get();
        return response()->json([
            'success' => true,
            'data' => $prices
        ]);
    }
}
