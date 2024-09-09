<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    // Display a listing of the galleries
    public function index()
    {
        $galleries = Gallery::all();
        return view('galleries.index', compact('galleries'));
    }

    // Show the form for creating a new gallery
    public function create()
    {
        return view('galleries.create');
    }

    // Store a newly created gallery in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'opening_hours' => 'nullable|string|max:255',
        ]);

        Gallery::create($validatedData);

        return redirect()->route('galleries.index')->with('success', 'Gallery created successfully!');
    }

    // Display the specified gallery
    public function show(Gallery $gallery)
    {
        return view('galleries.show', compact('gallery'));
    }

    // Show the form for editing the specified gallery
    public function edit(Gallery $gallery)
    {
        return view('galleries.edit', compact('gallery'));
    }

    // Update the specified gallery in storage
    public function update(Request $request, Gallery $gallery)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'opening_hours' => 'nullable|string|max:255',
        ]);

        $gallery->update($validatedData);

        return redirect()->route('galleries.index')->with('success', 'Gallery updated successfully!');
    }

    // Remove the specified gallery from storage
    public function destroy(Gallery $gallery)
    {
        $gallery->delete();

        return redirect()->route('galleries.index')->with('success', 'Gallery deleted successfully!');
    }
}
