@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Edit Artwork</h1>
        <form action="{{ route('artworks.update', $artwork->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" class="form-control" value="{{ old('title', $artwork->title) }}" required>
                @error('title')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea type="text" name="description" id="description" class="form-control" value="{{ old('description', $artwork->description) }}"></textarea>
                @error('description')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="artist_id">Artist</label>
                <select name="artist_id" id="artist_id" class="form-control" required>
                    <option value="">Select an artist</option>
                    @foreach ($artists as $artsist)
                        <option value="{{ $artist->id }}" {{ $artwork->artist_id == $artist->id ? 'selected' : ''}}>
                            {{ $artist->name }}
                        </option>
                    @endforeach
                </select>
                @error('artist_id')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" name="price" id="price" class="form-control" value="{{ old('price', $artwork->price) }}" step="0.01" min="0">
                @error('price')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group">
                <label for="creation_date">Creation Date</label>
                <input type="date" name="creation_date" id="creation_date" class="form-control" value="{{ old('creation_date', $artwork->creation_date->format('Y-m-d') }}" >
                @error('year')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="image_path">Image</label>
                <input type="file" name="image_path" id="image_path" class="form-control">
                @if($artwork->image_path)
                    <img src="{{ storage::url($artwork->image_path) }}" alt="{{ $artwork->title }}" width="100" class="mt-2">
                @endif
                @error('image_path')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>

            <button type="submit" class="btn btn-primary">Update Artwork</button>
        </form>
    </div>
@endsection
