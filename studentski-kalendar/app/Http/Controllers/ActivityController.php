<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Activity;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $activities = Activity::all();
        return response()->json($activities);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $activity = Activity::create($request->all());
        return response()->json($activity, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $activity = Activity::find($id);
        if ($activity) {
            return response()->json($activity);
        } else {
            return response()->json(['error' => 'Activity not found'], 404);
        }
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $activity = Activity::find($id);
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
    public function destroy(string $id)
    {
        $activity = Activity::find($id);
        if ($activity) {
            $activity->delete();
            return response()->json(['message' => 'Activity deleted']);
        } else {
            return response()->json(['error' => 'Activity not found'], 404);
        }
    }
}
