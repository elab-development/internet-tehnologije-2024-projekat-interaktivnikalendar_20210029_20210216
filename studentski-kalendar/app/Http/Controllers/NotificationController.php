<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = Notification::with('user')->orderBy('created_at', 'desc')->get();
        return response()->json($notifications);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'content' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'send_time' => 'nullable|date',
            //'status' => 'nullable|string|max:50',
            //'activity_id' => 'nullable|exists:activities,id',
        ]);

        $validatedData['send_time'] = $validatedData['send_time'] ?? now();
        // $validatedData['status'] = $validatedData['status'] ?? 'sent';
        //$validatedData['activity_id'] = $validatedData['activity_id'] ?? null;

        $notification = Notification::create($validatedData);
        $notification->load('user'); // učitaj povezani user objekat
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
    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->read = true;
        $notification->save();

        return response()->json(['message' => 'Notification marked as read.']);
    }
}
