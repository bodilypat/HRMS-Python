@extends('layout.app')

@section('content')
    <div class="content">
        <h1>Create Sale</h1>
        <form action="{{ route('sales.store') }}" method="POST">
            @csrf
                <div class="form-group">
                    <label for="artwork_id">Artwork</label>
                    <select name="artwork_id" id="artwor_id" class="form-control">
                        @foreach ($arworks as $artwork)
                            <option value="{{ $artwork->id}}">{{ $artwork->title }}</option>
                        @endforeach
                    </section>
                    @error('artwork_id')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="buyer_id">Buyer</label>
                    <select name="buyer_id" id="buyer-id" class="form-control">
                        @foreach($buyers as $buyer)
                            <option value="{{ $buyer->id }}">{{ $buyer->name }}</option>
                        @endforeach
                    </section>
                    @error('buyer_id')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="amount">Amount</label>
                    <input type="text" name="amount" id="amount" class="form-control" value="{{ old('sale_date') }}" requried>
                    @error('sale_date')
                        <div class="alert alert-danger">{{ message }}</div>
                    @enderror
                </div>
                <button type="submit" class="btn btn-primary">Record Sale</button>
        </form>
    </div>
@endsection
