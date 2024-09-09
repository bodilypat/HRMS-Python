@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Artworks</h1>
        <a href="{{ route('artworks.create') }}" class="btn btn-primary mb-3">Add New Artwork</a>

        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <table class="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Year</th>
                    <th>Medium</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($artworks as $artwork)
                    <tr>
                        <td>{{ $artwork->title }}</td>
                        <td>{{ $artwork->artist }}</td>
                        <td>{{ $artwork->year }}</td>
                        <td>{{ $artwork->medium }}</td>
                        <td>${{ number_format($artwork->price, 2) }}</td>
                        <td>
                            <a href="{{ route('artworks.show', $artwork->id) }}" class="btn btn-info btn-sm">View</a>
                            <a href="{{ route('artworks.edit', $artwork->id) }}" class="btn btn-warning btn-sm">Edit</a>
                            <form action="{{ route('artworks.destroy', $artwork->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this artwork?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="text-center">No artworks found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
