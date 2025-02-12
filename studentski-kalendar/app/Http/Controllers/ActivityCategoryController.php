<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ActivityCategory;

class ActivityCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = ActivityCategory::all();
        return response()->json($categories);
    }

 

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $category = ActivityCategory::create($request->all());
        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = ActivityCategory::find($id);
        if ($category) {
            return response()->json($category);
        } else {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }

   
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = ActivityCategory::find($id);
        if ($category) {
            $category->update($request->all());
            return response()->json($category);
        } else {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = ActivityCategory::find($id);
        if ($category) {
            $category->delete();
            return response()->json(['message' => 'Category deleted']);
        } else {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }
}
