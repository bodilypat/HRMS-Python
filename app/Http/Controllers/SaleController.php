<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    // Display a listing of the sales
    public function index()
    {
        $sales = Sale::all();
        return view('sales.index', compact('sales'));
    }

    // Show the form for creating a new sale
    public function create()
    {
        return view('sales.create');
    }

    // Store a newly created sale in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'item_name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'sale_date' => 'required|date',
        ]);

        Sale::create($validatedData);

        return redirect()->route('sales.index')->with('success', 'Sale created successfully!');
    }

    // Display the specified sale
    public function show(Sale $sale)
    {
        return view('sales.show', compact('sale'));
    }

    // Show the form for editing the specified sale
    public function edit(Sale $sale)
    {
        return view('sales.edit', compact('sale'));
    }

    // Update the specified sale in storage
    public function update(Request $request, Sale $sale)
    {
        $validatedData = $request->validate([
            'item_name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'sale_date' => 'required|date',
        ]);

        $sale->update($validatedData);

        return redirect()->route('sales.index')->with('success', 'Sale updated successfully!');
    }

    // Remove the specified sale from storage
    public function destroy(Sale $sale)
    {
        $sale->delete();

        return redirect()->route('sales.index')->with('success', 'Sale deleted successfully!');
    }
}
