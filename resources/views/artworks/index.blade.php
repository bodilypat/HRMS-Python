@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Artworks List</h1>
        <a href="{{ route('artworks.create') }}" class="btn btn-primary mb-3">Add New Artwork</a>
        <table class="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Artist</th>
                    <th>Price</th>
                    <th>Creation Date</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($artworks as $artwork)
                    <tr>
                        <td>{{ $artwork->title }}</td>
                        <td>{{ $artwork->description }}</td>
                        <td>{{ $artwork->artist->name }}</td>
                        <td>${{ number_format($artwork->price, 2) }}</td>
                        <td>{{ $artwork->creation_date->format('Y-m-d') }}</td>
                        <td>
                            @if($artwork->image_path)
                                <img src="{{ Storage::url($artwork->image_path) }}" alt="{{ $artwork->title }}" width="100">
                            @endif
                        </td>
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
