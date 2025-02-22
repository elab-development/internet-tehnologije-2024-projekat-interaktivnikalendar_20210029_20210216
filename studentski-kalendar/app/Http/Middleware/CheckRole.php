<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!Auth::check()) {
            Log::info('User not authenticated');
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if (Auth::user()->role !== $role) {
            Log::info('User role mismatch', ['expected' => $role, 'actual' => Auth::user()->role]);
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}