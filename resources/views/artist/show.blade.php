@extends('layouts.app')

@section('content')
    <div class="card">
        <h1>Artist Details</h1>
        <div class="card-body">

            <p><strong>Name:</strong> {{ $artist->name }}</p>
            <p><strong>Biography:</strong> {{ $artist->biography ?? 'N/A' }}</p>
            <p><strong>Nationality:</strong> {{ $artist->Nationlity ?? 'N/A' }}</p>
            <p><strong>Birth_Date:</strong> {{ $artist->birth_date ?? 'N/A' }}</p>
            <p><strong>Email:</strong> {{ $artist->email ?? 'N/A' }}</p>
            
            <a href="{{ route('artists.index') }}" class="btn btn-secondary">Back to List</a>
            <a href="{{ route('artists.edit', $artist->id) }}" class="btn btn-warning">Edit</a>
        </div>
    </div>
@endsection
