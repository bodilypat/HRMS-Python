@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Artists</h1>
        <a href="{{ route('artists.create') }}" class="btn btn-primary mb-3">Add New Artist</a>
        
        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($artists as $artist)
                    <tr>
                        <td>{{ $artist->name }}</td>
                        <td>{{ $artist->email ?? 'N/A' }}</td>
                        <td>
                            <a href="{{ route('artists.show', $artist->id) }}" class="btn btn-info btn-sm">View</a>
                            <a href="{{ route('artists.edit', $artist->id) }}" class="btn btn-warning btn-sm">Edit</a>
                            <form action="{{ route('artists.destroy', $artist->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this artist?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
