@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Create Artwork</h1>
        <form action="{{ route('artworks.store') }}" method="POST" entype="multiple/form-data">
            
            @csrf
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" class="form-control" value="{{ old('artworktitle') }}" required>
                @error('title')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="desctiption">Description</label>
                <textarea name="description" id="description" class="form-control" value="{{ old('description') }}" required>
                @error('description')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="artist">Artist</label>
                <input type="text" name="artist" id="artist" class="form-control" value="{{ old('artist->name') }}" required>
                @error('artist')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" name="price" id="price" class="form-control" value="{{ old('price') }}" step="0.01" min="0">
                @error('price')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="creation_date">Creation Date</label>
                <input type="date" name="creation_date" id="creation_date" class="form-control" value="{{ old('creation_date') }}" >
                @error('price')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="image_path">Image</label>
                <input type="file" name="image_path" id="image_path" class="form-control" >
                @error('image_path')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary">Save Artwork</button>
        </form>
    </div>
@endsection
