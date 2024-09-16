@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Add New Artist</h1>
        <form action="{{ route('artists.store') }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" class="form-control" value="{{ old('name') }}" required>
                @error('name')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="biograpy">Biography</label>
                <textarea name="biography" id="biography" class="form-control">{{ old('biography') }}</textarea>
                @error('biography')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="Nationality">Nationality</label>
                <textarea name="nationality" id="nationality" class="form-control">{{ old('nationality') }}</textarea>
                @error('nationality')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="birth_date">Bio</label>
                <textarea name="birth_date" id="birth_date" class="form-control">{{ old('birth_date') }}</textarea>
                @error('birth_date')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control" value="{{ old('email') }}">
                @error('email')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary">Save Artist</button>
        </form>
    </div>
@endsection
