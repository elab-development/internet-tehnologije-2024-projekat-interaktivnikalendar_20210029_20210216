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
use Illuminate\Support\Facades\Hash;

// Dohvatanje prijavljenog korisnika
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rute za autentikaciju
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Dodata ruta za ažuriranje profila prijavljenog korisnika
    Route::put('/user', function (Request $request) {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'oldPassword' => 'nullable|string',
            'newPassword' => 'nullable|string|min:6|confirmed',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;

        // Ako korisnik menja lozinku
        if ($request->filled('oldPassword') && $request->filled('newPassword')) {
            if (!Hash::check($request->oldPassword, $user->password)) {
                return response()->json(['message' => 'Old password is incorrect.'], 422);
            }
            $user->password = Hash::make($request->newPassword);
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully.']);
    });

    // Ruta za testiranje
    Route::get('/greeting', function () {
        return 'Hello World';
    });

    // Rute za studente
    Route::middleware(['App\Http\Middleware\CheckRole:student'])->group(function () {
        Route::get('activities', [ActivityController::class, 'index']);
        Route::get('activities/{id}', [ActivityController::class, 'show']);
        Route::post('activities', [ActivityController::class, 'store']);
        Route::put('activities/{id}', [ActivityController::class, 'update']);
        Route::delete('activities/{id}', [ActivityController::class, 'destroy']);
        Route::get('calendars/{id}', [CalendarController::class, 'show']);
        Route::get('notifications', [NotificationController::class, 'index']);
        Route::get('notifications/{id}', [NotificationController::class, 'show']);
    });

    // Rute za admina
    Route::middleware(['App\Http\Middleware\CheckRole:admin'])->group(function () {
        Route::get('activities', [ActivityController::class, 'index']);
        Route::get('activities/{id}', [ActivityController::class, 'show']);
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
        Route::get('users', [UserController::class, 'index']);
        Route::post('users', [UserController::class, 'store']);
        Route::put('users/{id}', [UserController::class, 'update']);
        Route::delete('users/{id}', [UserController::class, 'destroy']);
    });

    // Zajedničke rute za studente i administratore
    Route::middleware(['App\Http\Middleware\CheckRole:student,admin'])->group(function () {
        Route::get('activities', [ActivityController::class, 'index']);
        Route::get('activities/{id}', [ActivityController::class, 'show']);
        Route::post('activities', [ActivityController::class, 'store']);
        Route::put('activities/{id}', [ActivityController::class, 'update']);
        Route::delete('activities/{id}', [ActivityController::class, 'destroy']);
        Route::get('calendars/{id}', [CalendarController::class, 'show']);
        Route::get('notifications', [NotificationController::class, 'index']);
        Route::get('notifications/{id}', [NotificationController::class, 'show']);
        Route::patch('notifications/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::delete('notifications/{id}', [NotificationController::class, 'destroy']);
    });
});
