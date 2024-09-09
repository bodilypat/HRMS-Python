@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Exhibitions</h1>
        <a href="{{ route('exhibitions.create') }}" class="btn btn-primary mb-3">Add New Exhibition</a>

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
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($exhibitions as $exhibition)
                    <tr>
                        <td>{{ $exhibition->name }}</td>
                        <td>{{ Str::limit($exhibition->description, 50, '...') }}</td>
                        <td>{{ $exhibition->start_date->format('Y-m-d') }}</td>
                        <td>{{ $exhibition->end_date->format('Y-m-d') }}</td>
                        <td>
                            <a href="{{ route('exhibitions.show', $exhibition->id) }}" class="btn btn-info btn-sm">View</a>
                            <a href="{{ route('exhibitions.edit', $exhibition->id) }}" class="btn btn-warning btn-sm">Edit</a>
                            <form action="{{ route('exhibitions.destroy', $exhibition->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this exhibition?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="text-center">No exhibitions found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
