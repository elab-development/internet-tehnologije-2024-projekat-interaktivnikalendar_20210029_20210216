<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Calendar;
use Illuminate\Support\Facades\Auth;


class CalendarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
        $calendars = Calendar::all();
        return response()->json($calendars);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'owner_id' => 'required|exists:users,id',
            'activity_view' => 'nullable|string',
        ]);

        $calendar = Calendar::create($validatedData);
        // $calendar = Calendar::create($request->all());
        return response()->json($calendar, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        
        $calendar = Calendar::find($id);
        if ($calendar) {
            return response()->json($calendar);
        } else {
            return response()->json(['error' => 'Calendar not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
       
        $calendar = Calendar::find($id);
        if ($calendar) {
            $calendar->update($request->all());
            return response()->json($calendar);
        } else {
            return response()->json(['error' => 'Calendar not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
       
        $calendar = Calendar::find($id);
        if ($calendar) {
            $calendar->delete();
            return response()->json(['message' => 'Calendar deleted']);
        } else {
            return response()->json(['error' => 'Calendar not found'], 404);
        }
    }
}
