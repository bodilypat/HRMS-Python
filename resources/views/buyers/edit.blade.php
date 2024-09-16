@extends('layouts.app')

@section('content')
    <h1>Edit</h1>
    <form action="{{ route('buyers.update', $buyer->id) }}" method="POST">
        @csrf
            @method('PUT')
            <div class="form-group">
                <label for="name"></label>
                <input type="text " name="name" id="name" class="form-control" value="{{ $buyer->name }}" required>
                @error('name')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="name" class="form-control" value="{{ $buyer->phone }}">
                @error('email')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="text" name="pone" id="phone" class="form-control" value="{{ $buyers->phone}}">
                @error('phone')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label  for="address">Address</label>
                <textarea name="address" id="address" class="form-control" >{{ $buyer->address}}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Update Buyer</button>
    </form>
@endsection