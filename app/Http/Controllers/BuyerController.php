<?php

namespace App\Http\Controller;

use Illuminate\Http\Request;
use App\Models\Buyer;

class BuyerController extends Controller 
{
    /* Display listing of buyer */
    public function index()
    {
        $buyers = Buyer::all();
        return view('buyers.index', compact());
    }

    /* Show form for create new buyer */
    public function create()
    {
        return view('buyers.create');
    }

    /* Store a newly created buyer in the database */
    public function store(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|unique:buyers,email',
            'phone'   => 'nullale|string|max:15',
            'address' => 'nullable|string|max:255',
        ]);

        Buyer::create($request->all());
        return redirect()->route('buyers.index')->with('success','buyer created successffully.');
    }

    /* Display the specified buyer */
    public function show(Buyer $buyer)
    {
        return view('buyers.show', compact('buyer'));
    }

    /* show the form for editing the specified buyer */
    public function update(Request $request, Buyer $buyer)
    {
        $request->valdiate([
            'name' => 'required|string|max:255',
            'email' => 'requried|email|unique|buyers,email,' . $buyer->id,
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:255',
        ]);

        $buyer->update($request->all());
        return redirect()->route('buyers.index')->with('success', 'Buyer updated successfully.');
    };

    /* Remove the specified buyer from the database */
    public function destroy(Buyer $buyer)
    {
        $buyer->delete();

        return redirect()->route('buyers.index')->with('success', 'Buyer deleted successfully.')
    }

}