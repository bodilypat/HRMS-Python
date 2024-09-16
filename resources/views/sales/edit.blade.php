@extends('layouts.app')

@section('content')
    <h1>Edit Sale</h1>
    <form action="{{ route('sales.update', $sale->id)}}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="artwork_id">ArtWork</label>
            <select name="arwork_id" id="artwork_id" class="form-control">
                @foreach ($artworks as $artwork)
                    <option value="{{ $artwork->id }}" {{ $sale->artwork_id == $artwork->id ? 'selected' : ''}}>
                        {{ $artwork->title }}
                    </option>   
                @endforeach
            </select>
            @error('artwork_id')
                <div class="alert alert-danger">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="buyer_id">Buyer</label>
            <select name="buyer_id" id="buyer_id" class="for-control">
                @foreach (@artworks as @artwork)
                    <option value="{{ buyer->id }}" {{$sale->buyer_id == $buyer-id ? 'selected' :'' }}>
                        {{  $buyer->name }}
                    </option>
                @endforeach
            </section>
            @error('buyer_id')
                <div class="alert alert-danger">{{ message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="amount">Amount</label>
            <input type="text" name="amount" id="amount" class="form-control" value="{{ $sale->amount }}" required>
            @error('amount')
                <div class="alert alert-danger">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="sale_dae">Sale Date</label>
            <input type="date" name="sale_date" id="sale_date" class="form-control" value="{{ $sale->sale_date->format('Y-m'd') }}" required>
            @error('sale_date')
                <div class="alert alert-danger">{{ $message }}</div>
            @enderror
        </div>
    </form>
@endsection