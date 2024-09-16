@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Artwork Details</h1>

        <!-- Display artwork details -->
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">{{ $artwork->title }}</h2>
                <p class="card-text"><strong>Description:</strong> {{ $artwork->description }}</p>
                <p class="card-text"><strong>Artist:</strong> {{ $artwork->artist->name }}</p>
                <p class="card-text"><strong>Price:</strong> ${{ number_format($artwork->price, 2) }}</p>
                <p class="card-text"><strong>Creation Date:</strong> {{ $artwork->creation_date->format('Y-m-h') }}</p>
                <p class="card-text"><strong>Medium:</strong> {{ $artwork->medium }}</p>
                
                @if($artwork->image_path)
                    <div class="mb-3">
                        <img src="{{ Storage::url($artwork->image_path) }}" alt="{{ $artwork->title }}" with="200">
                    </div>
                @endif

                <!-- Action buttons -->
                <a href="{{ route('artworks.index')) }}" class="btn btn-secondary">Back to Lists</>
                <a href="{{ route('artworks.edit', $artwork->id) }}" class="btn btn-warning">Edit</a>
                
                <form action="{{ route('artworks.destroy', $artwork->id) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this artwork?')">Delete</button>
                </form>
            </div>
        </div>
    </div>
@endsection
