@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Exhibition Details</h1>
        
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">{{ $exhibition->name }}</h2>
                <p class="card-text"><strong>Description:</strong> {{ $exhibition->description ?? 'No description available.' }}</p>
                <p class="card-text"><strong>Start Date:</strong> {{ $exhibition->start_date->format('Y-m-d') }}</p>
                <p class="card-text"><strong>End Date:</strong> {{ $exhibition->end_date->format('Y-m-d') }}</p>
                
                <a href="{{ route('exhibitions.edit', $exhibition->id) }}" class="btn btn-warning">Edit</a>
                <a href="{{ route('exhibitions.index') }}" class="btn btn-secondary">Back to List</a>
            </div>
        </div>
    </div>
@endsection
