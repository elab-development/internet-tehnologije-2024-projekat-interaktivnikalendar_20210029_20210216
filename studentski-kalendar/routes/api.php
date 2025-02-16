<?php

use App\Http\Controllers\ActivityCategoryController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\CalendarViewController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rute za autentikaciju
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Automatski generisane RESTful rute
    Route::apiResource('activities', ActivityController::class);
    Route::apiResource('activity-categories', ActivityCategoryController::class);
    Route::apiResource('calendars', CalendarController::class);
    Route::apiResource('calendar-views', CalendarViewController::class);
    Route::apiResource('notifications', NotificationController::class);
    Route::apiResource('users', UserController::class);

    // Ruta za testiranje
    Route::get('/greeting', function () {
        return 'Hello World';
    });

    // Rute za studente
    Route::group(['middleware' => ['role:student']], function () {
        Route::get('activities', [ActivityController::class, 'index']);
        Route::get('activities/{id}', [ActivityController::class, 'show']);
        Route::post('activities', [ActivityController::class, 'store']);
        Route::put('activities/{id}', [ActivityController::class, 'update']);
        Route::delete('activities/{id}', [ActivityController::class, 'destroy']);
        Route::get('calendars', [CalendarController::class, 'index']);
        Route::get('calendars/{id}', [CalendarController::class, 'show']);
        Route::get('notifications', [NotificationController::class, 'index']);
        Route::get('notifications/{id}', [NotificationController::class, 'show']);
    });

    // Rute za administratore
    Route::group(['middleware' => ['role:admin']], function () {
        Route::post('activities', [ActivityController::class, 'store']);
        Route::put('activities/{id}', [ActivityController::class, 'update']);
        Route::delete('activities/{id}', [ActivityController::class, 'destroy']);
        Route::post('activity-categories', [ActivityCategoryController::class, 'store']);
        Route::put('activity-categories/{id}', [ActivityCategoryController::class, 'update']);
        Route::delete('activity-categories/{id}', [ActivityCategoryController::class, 'destroy']);
        Route::post('calendars', [CalendarController::class, 'store']);
        Route::put('calendars/{id}', [CalendarController::class, 'update']);
        Route::delete('calendars/{id}', [CalendarController::class, 'destroy']);
        Route::post('notifications', [NotificationController::class, 'store']);
        Route::put('notifications/{id}', [NotificationController::class, 'update']);
        Route::delete('notifications/{id}', [NotificationController::class, 'destroy']);
        Route::post('users', [UserController::class, 'store']);
        Route::put('users/{id}', [UserController::class, 'update']);
        Route::delete('users/{id}', [UserController::class, 'destroy']);
    });
});