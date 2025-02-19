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
        $activities = Activity::where('user_id', Auth::id())->get();
        return response()->json($activities);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) //Ova metoda kreira novu aktivnost.
    {
        $request->merge(['user_id' => Auth::id()]);
        $activity = Activity::create($request->all());
        return response()->json($activity, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id) //Ova metoda prikazuje pojedinačnu aktivnost.
    {
        //$activity = Activity::find($id);
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
        $activity = Activity::where('id', $id)->where('user_id', Auth::id())->first();
        if ($activity) {
            $activity->delete();
            return response()->json(['message' => 'Activity deleted']);
        } else {
            return response()->json(['error' => 'Activity not found'], 404);
        }
    }
}
