<?php

namespace App\Http\Controllers;

use App\Models\Exhibition;
use Illuminate\Http\Request;

class ExhibitionController extends Controller
{
    // Display a listing of the exhibitions
    public function index()
    {
        $exhibitions = Exhibition::all();
        return view('exhibitions.index', compact('exhibitions'));
    }

    // Show the form for creating a new exhibition
    public function create()
    {
        return view('exhibitions.create');
    }

    // Store a newly created exhibition in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        Exhibition::create($validatedData);

        return redirect()->route('exhibitions.index')->with('success', 'Exhibition created successfully!');
    }

    // Display the specified exhibition
    public function show(Exhibition $exhibition)
    {
        return view('exhibitions.show', compact('exhibition'));
    }

    // Show the form for editing the specified exhibition
    public function edit(Exhibition $exhibition)
    {
        return view('exhibitions.edit', compact('exhibition'));
    }

    // Update the specified exhibition in storage
    public function update(Request $request, Exhibition $exhibition)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $exhibition->update($validatedData);

        return redirect()->route('exhibitions.index')->with('success', 'Exhibition updated successfully!');
    }

    // Remove the specified exhibition from storage
    public function destroy(Exhibition $exhibition)
    {
        $exhibition->delete();

        return redirect()->route('exhibitions.index')->with('success', 'Exhibition deleted successfully!');
    }
}
