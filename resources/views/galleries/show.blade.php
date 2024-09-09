@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Gallery Details</h1>

        <!-- Display gallery details -->
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">{{ $gallery->name }}</h2>
                <p class="card-text"><strong>Description:</strong> {{ $gallery->description }}</p>
                <p class="card-text"><strong>Location:</strong> {{ $gallery->location }}</p>
                <p class="card-text"><strong>Opening Hours:</strong> {{ $gallery->opening_hours }}</p>

                <!-- Action buttons -->
                <a href="{{ route('galleries.edit', $gallery->id) }}" class="btn btn-warning">Edit</a>

                <form action="{{ route('galleries.destroy', $gallery->id) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this gallery?')">Delete</button>
                </form>

                <a href="{{ route('galleries.index') }}" class="btn btn-secondary">Back to List</a>
            </div>
        </div>
    </div>
@endsection
