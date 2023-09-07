@extends('layouts.app')
$section('content)
<div>
     <div class="container">
           <div class="row">
                 <div class="col-md-3">
                       <h2 class="admin-heading">Add Author</h2>
                 </div>
                 <div class="offsent-md-7 col-md-2">
                      <a class="add-new" href="{{route('route')}}">All Authors</a>
                 </div>
           </div>
           <div clas="row">
                 <div class="offset-md-3 col-md-6">
                      <form class="yourform" action="{{ route('auther.store')}}" method="post" authocomplete="off">
                             @csrf
                            <div class="form-group">
                                   <label>Author Name</label>
                                   <input type="text" class="form-control @error('name') isinvalid" placeholder="Author Name" name="name" value="{{ old('name')}}" required>
                                   @error('name')
                                        <div class="alert alert-danger" role="alert">
                                            {{ $message }}
                                        </div>
                                    @enderror
                            </div>
                            <input type="submit" name="save" class="btn btn-danger" value="save" required>
                      </form>
                 </div>
           </div>
     </div>
</div>
@endsection
