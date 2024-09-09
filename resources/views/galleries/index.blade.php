@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Galleries</h1>
        <a href="{{ route('galleries.create') }}" class="btn btn-primary mb-3">Add New Gallery</a>

        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Opening Hours</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($galleries as $gallery)
                    <tr>
                        <td>{{ $gallery->name }}</td>
                        <td>{{ $gallery->description }}</td>
                        <td>{{ $gallery->location }}</td>
                        <td>{{ $gallery->opening_hours }}</td>
                        <td>
                            <a href="{{ route('galleries.show', $gallery->id) }}" class="btn btn-info btn-sm">View</a>
                            <a href="{{ route('galleries.edit', $gallery->id) }}" class="btn btn-warning btn-sm">Edit</a>
                            <form action="{{ route('galleries.destroy', $gallery->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this gallery?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="text-center">No galleries found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
