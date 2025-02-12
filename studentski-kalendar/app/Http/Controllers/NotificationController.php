<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = Notification::all();
        return response()->json($notifications);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $notification = Notification::create($request->all());
        return response()->json($notification, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            return response()->json($notification);
        } else {
            return response()->json(['error' => 'Notification not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            $notification->update($request->all());
            return response()->json($notification);
        } else {
            return response()->json(['error' => 'Notification not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            $notification->delete();
            return response()->json(['message' => 'Notification deleted']);
        } else {
            return response()->json(['error' => 'Notification not found'], 404);
        }
    }
}