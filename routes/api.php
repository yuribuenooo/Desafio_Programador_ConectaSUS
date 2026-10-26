<?php

use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\HealthUnitController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('patients',PatientController::class);
Route::get('/health-units', [HealthUnitController::class, 'index']);
