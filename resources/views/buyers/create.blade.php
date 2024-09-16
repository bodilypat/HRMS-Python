@extends('layouts.app')

@section('content')
    <h1>Create Buyer</h1>
    <form action="{{ route('buyers.store') }}" method="POST">
         @csrf
        <div class="form-group">
             <label for="name">Name</label>
             <input type="text" name="name" id="name" class="form-control" value="{{ old('name')}}" required>
             @error('name')
                <div class="alert alert-danger">{{ $message }}</div>
             @enderror
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" class="form-control" value="{{ old('email')}}" required>
            @error('email')
                <div class="alert alert-danger">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="phone">Phone</label>
            <input type="text" name="phone" id="phone" class="form-control" value="{{ old('phone') }}">
            @error('phone')
                <div class="alert alert-danger">{{ $message }}</div>
            @enderror
        </div> 
        <div class="form-group">
            <label for="address">Address</label>
            <textarea name="address" id="address" class="form-control">{{ old('address') }}</textarea>
            @error('address')
                <div class="alert alert-danger">{{ $message }}</div>
            @enderror
        </div>
        <button type="submit" class="btn btn-primary">Create buyer</button>
    </form>
@endsection