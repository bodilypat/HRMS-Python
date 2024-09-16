@extends('layouts.app')

@section('content')
    <h1>Buyer List</h1>
    <a href="{{ route('buyers.create') }}" class="btn btn-primary mb-3">Create New Buyer</a>
    <table class="buyer-table">
          <thead>
                <tr>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Phone</th>
                     <th>Address</th>
                     <th>Actions</th>
                </tr>
          </thead>
          <tbody>
                @foreach ($buyers as $buyer)
                <tr>
                     <td>{{ $buyer->name }}</td>
                     <td>{{ $buyer-email }}</td>
                     <td>{{ $buyer->phone }}</td>
                     <td>{{ $buyer->address}}</td>
                     <td>
                          <a href="{{ route('buyer.show', $buyer->id) }}" class="btn btn-info btn-sm">view</a>
                          <a href="{{ route('buyers.edit', $buyer->id) }}" class="btn btn-warning btn-sm">Edit</a>
                          <form action="{{ route('buyers.destroy', $buyer->id) }}" method="POST"  style="display:inline;">
                                @csrf 
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                          </form>
                     </td>
                </tr>
                @endforeach
          </tbody>
    </table>
@endsection
