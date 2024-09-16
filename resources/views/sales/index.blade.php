@extends('layouts.app')

@section('centen')
    <div class="container">
          <div class="row">
                <div class="col-md-4">
                    <h2 class="admin-heading">Sales Artworks</h2>
                </div>
                <div class="offset-md-6 col-md-2">
                    <a class="add-new" href="{{ route(sales.create) }}">Add Student</a>
                </div>
          </div>
          <div class="row">
                <div class="col-md-12">
                    <table class="content-table">
                        <thead>
                               <th>Artwork</th>
                               <th>Buyer</th>
                               <th>Amount</th>
                               <th>Sale Date</th>
                               <th>Actions</th>
                        </thead>
                        <tbody>
                            @forelse( $sales as $sale)
                            <tr>
                                 <td>{{ $sale->artwork->title }}</td>
                                 <td>{{ $sale->buyer->name }}</td>
                                 <td>${{ member_format($sale->amount,2) }}</td>
                                 <td>{{ $sale->sale_date->format->('Y-m-d') }}</td>
                                 <td class="edit">
                                      <a href="{{ route('$sales.edit', $sale->id )}}" class="btn btn-warning btn-sm">Edit</a>
                                      <form action="{{ route('sales.destroy', sale->id) }}" method="POST" style="display:inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-danger">Delete</button>
                                      </form>
                                 </td>
                            </tr>
                            @empty
                                <tr>
                                    <td colspan="5" class="text-center">No sale recorded.</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
          </div>    
    </div>
@endsection