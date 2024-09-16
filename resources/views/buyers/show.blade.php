@extends('layouts.app')

@section('content')
    <h1>Buyer Details</h1>  
    <p><strong>Name:</strong>{{ $buyer->name }}</p>
    <p><strong>Email:</strong>{{ $buyer->email }}</p>
    <p><strong>Phone: </strong>{{ $buyer->phone }}</p>
    <p><strong>Address:</strong>{{ $buyer->address }}</p>

    <a href="{{ route('buyers.index')}}" class="btn btn-primary">Back to List</a>
    <a href="{{ route('buyers.edit', $buyer->id) }}" class="btn btn-warning">Edit</a>
    <form action="{{ route('buyers.destroy', $buyer->id) }}" method="POST" style="display:linline;">
         @csrf 
        @method('DELETE')
        <button type="email" class="btn btn-danger">Delete</button>
    </form>
@endsection