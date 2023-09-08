@extends('layouts.app)
@section('content')
    <div id="admin-content">
          <div class="container">
                <div class="row">
                      <div class="col-md-3">
                            <h2 class="admin-heading">Update Book</h2>
                      </div>
                </div>
                <div class="row">
                      <div class="offset-md-3 col-md-6">
                            <form class="yourform" action="{{ route('book.update', $book->id) }}" method="post" autocomplete="off">
                                  @csrf
                                  <div class="form-group">
                                       <label>Book Name</label>
                                       <input type="text" class="form-control @error('name') isinval @enderror" placeholder="Book Name"
                                             name="name" value=" {{ $book->name }} ">
                                            @error('name')
                                                <div class="alert alert-danger" role="alert">
                                                    {{ $message }}
                                                </div>
                                            @enderror
                                  </div>
                                  <div class="form-group">
                                        <select class="form-control @error('category_id') isinvalid @enderror" name="category_id">
                                                <option value="">Select Category</option>
                                                @foreach ($categories as $category)
                                                    if($category->id == $book->category_id)
                                                        <option value="{{ $category->id }}" selected>{{ $category->name }}</option>
                                                    @else 
                                                        <option value="{{ $category->id }}">{{ $category->name }}</option>
                                                     @endif
                                                @endforeach
                                        </select>
                                        @error('category_id')
                                            <div class="alert alert-danger" role="alert">
                                                 {{ $message }}
                                            </div>
                                        @enderror
                                  </div>
                                  <div class="form-group">
                                        <label>Author</label>                                  
                                        <select class="form-control @error('author_id') isinval @enderror" name="author_id">
                                               <option value="">Select Author</option>
                                               @foreach($authors as $author)
                                                    @if ($author->id == $book->author_id)
                                                        <option value="{{ $author->id }} " selected>{{ $author->name }}</option>
                                                    @else
                                                        <option value="{{ $author->id }}"> {{ $author->name }} </option>
                                                    @endif
                                                @endforeach
                                        </select>
                                        @error('author_id')
                                            <div class="alert alert-danger" role="alert">
                                                  {{ $message }}
                                            </div>
                                        @enderror
                                  </div>
                                  <div class="form-group">
                                        <label>Publisher</label>
                                        <select class="form-control @error('publisher_id') isinvalid @enderror" name="publisher_id">
                                               <option value="">Select Publisher</option>
                                               @foreach ($publishers as $publisher)
                                                    @if ($publisher->id == $book->publisher_id)
                                                         <option value="{{ $publisher->id }}" selected>{{ $publisher->name}}</option>
                                                    @else
                                                         <option value="{{ $publisher->id }} ">{{ $publisher->name }}</option>
                                                    @endif
                                                @endforeach
                                        </select>
                                        @error('publisher_id')
                                            <div class="alert alert-danger" role="alert">
                                                  {{ $message }}
                                            </div>
                                        @enderror
                                  </div>
                                  <input type="submit" name="save" class="btn btn-danger" value="Update">
                            </form>      
                      </div>
                </div>
          </div>
    </div>
@endsection