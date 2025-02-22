<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CalendarView;
use Illuminate\Support\Facades\Auth;

class CalendarViewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $views = CalendarView::all();
        return response()->json($views);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $validatedData = $request->validate([
            'view_name' => 'required|string|max:255',
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
            'calendar_id' => 'required|exists:calendars,id',
        ]);

        $view = CalendarView::create($validatedData);
        //$view = CalendarView::create($request->all());
        return response()->json($view, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $view = CalendarView::find($id);
        if ($view) {
            return response()->json($view);
        } else {
            return response()->json(['error' => 'View not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $view = CalendarView::find($id);
        if ($view) {
            $view->update($request->all());
            return response()->json($view);
        } else {
            return response()->json(['error' => 'View not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $view = CalendarView::find($id);
        if ($view) {
            $view->delete();
            return response()->json(['message' => 'View deleted']);
        } else {
            return response()->json(['error' => 'View not found'], 404);
        }
    }
}
