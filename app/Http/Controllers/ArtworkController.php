<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use Illuminate\Http\Request;

class ArtworkController extends Controller
{
    // Display a listing of the artworks
    public function index()
    {
        $artworks = Artwork::all();
        return view('artworks.index', compact('artworks'));
    }

    // Show the form for creating a new artwork
    public function create()
    {
        return view('artworks.create');
    }

    // Store a newly created artwork in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'year' => 'required|integer|min:1000|max:9999',
            'medium' => 'required|string|max:255',
            'dimensions' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'image_url' => 'nullable|url',
        ]);

        Artwork::create($validatedData);

        return redirect()->route('artworks.index')->with('success', 'Artwork created successfully!');
    }

    // Display the specified artwork
    public function show(Artwork $artwork)
    {
        return view('artworks.show', compact('artwork'));
    }

    // Show the form for editing the specified artwork
    public function edit(Artwork $artwork)
    {
        return view('artworks.edit', compact('artwork'));
    }

    // Update the specified artwork in storage
    public function update(Request $request, Artwork $artwork)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'year' => 'required|integer|min:1000|max:9999',
            'medium' => 'required|string|max:255',
            'dimensions' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'image_url' => 'nullable|url',
        ]);

        $artwork->update($validatedData);

        return redirect()->route('artworks.index')->with('success', 'Artwork updated successfully!');
    }

    // Remove the specified artwork from storage
    public function destroy(Artwork $artwork)
    {
        $artwork->delete();

        return redirect()->route('artworks.index')->with('success', 'Artwork deleted successfully!');
    }
}
