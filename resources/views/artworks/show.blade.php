@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Artist Details</h1>
        <p><strong>Name:</strong> {{ $artist->name }}</p>
        <p><strong>Email:</strong> {{ $artist->email ?? 'N/A' }}</p>
        <p><strong>Bio:</strong> {{ $artist->bio ?? 'N/A' }}</p>
        <a href="{{ route('artists.index') }}" class="btn btn-secondary">Back to List</a>
        <a href="{{ route('artists.edit', $artist->id) }}" class="btn btn-warning">Edit</a>
    </div>
@endsection
