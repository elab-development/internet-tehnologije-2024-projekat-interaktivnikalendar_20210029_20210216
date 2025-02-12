<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CalendarView;

class CalendarViewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $views = CalendarView::all();
        return response()->json($views);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $view = CalendarView::create($request->all());
        return response()->json($view, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
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
        $view = CalendarView::find($id);
        if ($view) {
            $view->delete();
            return response()->json(['message' => 'View deleted']);
        } else {
            return response()->json(['error' => 'View not found'], 404);
        }
    }
}