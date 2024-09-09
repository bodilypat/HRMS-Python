@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Sale Details</h1>
        
        <!-- Display sale details -->
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">{{ $sale->item_name }}</h2>
                <p class="card-text"><strong>Quantity:</strong> {{ $sale->quantity }}</p>
                <p class="card-text"><strong>Price:</strong> ${{ number_format($sale->price, 2) }}</p>
                <p class="card-text"><strong>Sale Date:</strong> {{ $sale->sale_date->format('Y-m-d') }}</p>

                <!-- Action buttons -->
                <a href="{{ route('sales.edit', $sale->id) }}" class="btn btn-warning">Edit</a>
                
                <form action="{{ route('sales.destroy', $sale->id) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this sale?')">Delete</button>
                </form>

                <a href="{{ route('sales.index') }}" class="btn btn-secondary">Back to List</a>
            </div>
        </div>
    </div>
@endsection
