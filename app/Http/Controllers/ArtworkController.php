<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artwork;
use App\Models\Artist;

class ArtworkController extends Controller
{
    /* Display a listing of the artworks */
    public function index()
    {
        $artworks = Artwork::with('artist')->get(); // load the artist relationship 
        return view('artworks.index', compact('artworks'));
    }

    /* Show the form for creating a new artwork */
    public function create()
    {
        $artworks = Artist::all() // Fetch all artists to populate the dropdown
        return view('artworks.create', compact('artists'));
    }

    /* Store a newly created artwork in storage */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable:string',
            'artist_id' => 'required|exists:artists,id',
            'price' => 'nullable|numeric|min:0',
            'creation_date' => 'nullable|date',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // validate image file
        ]);
        
        // Handle file upload
        
        
        $artwork->update($request->all());

        return redirect()->route('artworks.index')->with('success', 'Artwork created successfully!');
    }

    /* Display the specified artwork */
    public function show(Artwork $artwork)
    {
        return view('artworks.show', compact('artwork'));
    }

    /* Show the form for editing the specified artwork */
    public function edit(Artwork $artwork)
    {
        $artists = Artist::all(); // Fetch all artists to populate dropdown
        return view('artworks.edit', compact('artwork','artists'));
    }

    /* Update the specified artwork in storage*/
    public function update(Request $request, Artwork $artwork)
    {
        $request->validate([

            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'artist_id' => 'required|integer|min:1000|max:9999',
            'price' => 'nullable|numeric|min:0',
            'creation_date' => 'nullable|date',
            'image_path' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Validate image file
        ]);

        // Handle file upload
        if($request->hasFile('image_path'))
        {
            $imagePath = $request->file('image_path')->store('public/images');
            $request->merge(['image_path' => $imagePath]);
            
        }

        $artwork->create($request->all());

        return redirect()->route('artworks.index')->with('success', 'Artwork updated successfully!');
    }

    /* Remove the specified artwork from storage */
    public function destroy(Artwork $artwork)
    {
        // Delete the image file if exists
        if($artwork->image_path &&\Storage::exists($artwork->image_path))
        {
            \Storage::delete($artwork->image_path);
        }

        $artwork->delete();

        return redirect()->route('artworks.index')->with('success', 'Artwork deleted successfully!');
    }
}
