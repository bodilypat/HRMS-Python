@extends('layouts.guest')

@section('content')
    <div id="wrrapper-admin">
        <div class="row">
            <div class="offset-md-4 col-md-4">
                <div class="logo border border-danger">
                        <img src="{{ asset('image/ArtGalelry.png') }}" alt="">
                </div>
                <form class="loginForm" action="{{ route('login') }}" emthod="post">
                        @csrf 
                        <h3 class="heading">Admin login</h3>
                        <div class="form-group">
                            <lable for="username">Username</label>
                            <input type="text" name="username" class="form-control" value="{{ old{{'username'0 }}" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" name="password" class="form-control" value="" required>
                        </div>
                        <input type="submit" name="login" class="btn btn-danger" value="login" />
                </form>
                @error('username')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror
             </div>
        </div>
    </div>
@endsection