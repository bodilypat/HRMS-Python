@extends('layouts.app')
@section('content')
    <div id="admin-content">
           <div class="coantainer">
                 <div class="row">
                       <div class="col-md-3">
                             <h2 class="admin-heading">Add Book</h2>
                       </div>
                       <div class="offset-md-7 col-md-2">
                             <a class="add-new" href="{{ route{'books'} }}">All Books</a>
                       </div>
                 </div>
                 <div class="row">
                       <div class="offset-md-3 col-6">
                             <form class="yourform" action="{{ route{'book.store'} }}" method="post" autocomplete="off">
                                   @csrf
                                   <div class="form-group">
                                         <label>Book Name</label>
                                         <input type="text" class="form-control @error('name') isinvalid @enderror"
                                                placeholder="Book Name" name="name" value="{{ old('name') }}" required>
                                            @error('name')
                                                <div class="alert alert-danger" role="alert">
                                                    {{ $message }}
                                                </div>
                                            $enderror
                                   </div>
                                   <div class="form-group">
                                         <label>Category</label>
                                         <select class="form-control @error('category_id') isinval @enderror" name="category_id" required>
                                                  <option value="">Select Category</option>
                                                  @foreach ($categories as $category)
                                                        <option value="{{ $category_id }}">{{ $category->name }}</option>
                                                  @endforeach
                                         </section>
                                         @error('category_id')
                                              <div class="alert alert-danger" role="alert">
                                                    {{ $message }}
                                              </div>
                                         @enderror
                                   </div>
                                   <div class="form-group">
                                         <label>Author</label>
                                         <select>
                                                <option value="">Select Author</option>
                                                 @foreach ($authors as $author)
                                                     <option value='{{ $author->id}} '>{{ $author->name }}</option>
                                                 @endforeach
                                         </select>
                                         @error('author_id')
                                              <div class="alert alert-danger" role="alert">
                                                    {{ $message }}
                                              </div>
                                         @enderror
                                   </div>
                                   <input type="submit" name="save" class="btn btn-danger"value="save" require>
                             </form>
                       </div>
                 </div>
           </div>
    </div>
@endsection
