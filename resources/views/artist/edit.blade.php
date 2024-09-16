@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Edit Artist</h1>
        <form action="{{ route('artists.update', $artist->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" class="form-control" value="{{ old('name', $artist->name) }}" required>
                @error('name')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="biography">Biography</label>
                <textarea name="biography" id="biography" class="form-control">{{ old('biography', $artist->biography) }}</textarea>
                @error('biography')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="nationality">Nationality</label>
                <textarea name="nationality" id="nationality" class="form-control">{{ old('nationality', $artist->nationality) }}</textarea>
                @error('nationality')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="birth_date">Birth_date</label>
                <textarea name="birth_date" id="birth_date" class="form-control">{{ old('birth_date', $artist->birth_date) }}</textarea>
                @error('birth_date')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control" value="{{ old('email', $artist->email) }}">
                @error('email')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary">Update Artist</button>
        </form>
    </div>
@endsection
