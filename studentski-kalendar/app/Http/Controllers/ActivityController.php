<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Activity;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() //Ova metoda vraća sve aktivnosti koje pripadaju autentifikovanom korisniku.
    {
        // $activities = Activity::all();
        if (Auth::user()->role !== 'student' && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $activities = Activity::where('user_id', Auth::id())->get();
        return response()->json($activities);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) //Ova metoda kreira novu aktivnost.
    {
        if (Auth::user()->role !== 'student' && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'category_id' => 'required|exists:activity_categories,id',
            'calendar_id' => 'required|exists:calendars,id',
        ]);
        //$request->merge(['user_id' => Auth::id()]);
        //$activity = Activity::create($request->all());
        $validatedData['user_id'] = Auth::id();

        $activity = Activity::create($validatedData);
        return response()->json($activity, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id) //Ova metoda prikazuje pojedinačnu aktivnost.
    {
        //$activity = Activity::find($id);
        if (Auth::user()->role !== 'student' && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $activity = Activity::where('id', $id)->where('user_id', Auth::id())->first();
        if ($activity) {
            return response()->json($activity);
        } else {
            return response()->json(['error' => 'Activity not found'], 404);
        }
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) //Ova metoda ažurira postojeću aktivnost.
    {
        // $activity = Activity::find($id);
        if (Auth::user()->role !== 'student' && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $activity = Activity::where('id', $id)->where('user_id', Auth::id())->first();
        if ($activity) {
            $activity->update($request->all());
            return response()->json($activity);
        } else {
            return response()->json(['error' => 'Activity not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) //Ova metoda briše postojeću aktivnost.
    {
        // $activity = Activity::find($id);
        if (Auth::user()->role !== 'student' && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $activity = Activity::where('id', $id)->where('user_id', Auth::id())->first();
        if ($activity) {
            $activity->delete();
            return response()->json(['message' => 'Activity deleted']);
        } else {
            return response()->json(['error' => 'Activity not found'], 404);
        }
    }
}
