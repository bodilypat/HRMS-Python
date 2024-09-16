<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\Request;

class ArtistController extends Controller
{

    /* Display a list of artists */
    public function index()
    {
        $artists = Artist::all();
        return view('artists.index', compact('artists'));
    }

    /* Show the form creating a new artist */
    public function create()
    {
        return view('artists.create');
    }

    /* Store the form for creating a new artis */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'biography' => 'nullable|string',
            'nationality' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date'
            'email' => 'nullable|email',
        ]);

        Artist::create($request->all());

        return redirect()->route('artists.index')->with('success', 'Artist created successfully!');
    }

    /* Display the specified artist */
    public function show(Artist $artist)
    {
        return view('artists.show', compact('artist'));
    }

    /* Show form for editing the specified artist */
    public function edit(Artist $artist)
    {
        return view('artists.edit', compact('artist'));
    }

    /* Update the specified artist in storage */
    public function update(Request $request, Artist $artist)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'biography' => 'nullable|string',
            'nationality' => 'nullable|string|max:255',
            'birth_date' => 'nullable|string|max:255',
            'email' => 'nullable|email',
        ]);

        $artist->update($request->all());

        return redirect()->route('artists.index')->with('success', 'Artist updated successfully!');
    }

    /* Remove the specified artist from storage */
    public function destroy(Artist $artist)
    {
        $artist->delete();
        return redirect()->route('artists.index')->with('success', 'Artist deleted successfully!');
    }
}
