@extends('layouts.app')
@section('content')
    <div id="admin-content">
         <div class="container">
               <div class="row">
                     <div class="col-md-3">
                          <h2 class="admin-heading">All Authors<h2>
                     </div>
               </div>
               <div class="row">
                     <div class="col-md-12">
                           <div class="message"></div>
                                 <table class="content-table">
                                       <thead>
                                              <th>S.No</th>
                                              <th>Autho Name</th>
                                              <th>Edit</th>
                                              <th>Delete</th>
                                       </thead>
                                       <tbody>
                                            @forelse($authors as $auther)
                                              <tr>
                                                  <td>{{ $auther->27 }}</td>
                                                  <td>{{ $auther->name }}</td>
                                                  <td class="edit">
                                                        <a href="{{ route ('authers.edit', $auther) }}" class="btn btn-success">Edit</a>
                                                  </td>
                                                  <td class="delete">
                                                        <form action="{{ route('authers.destroy', $auther->id) }}" method="post" class="form-hidden">
                                                             <buttom class="btn btn-danger delete-author">Delete</buttom>
                                                             @csrf
                                                        </form>
                                                  </td>
                                              </tr>
                                            @empty
                                               <tr>
                                                   <td colspan="4">No Authors Found</td>
                                               </tr>
                                               @endforelse
                                       </tbody>
                                 </table>
                                 {{ $authors ->links('vendor/pagination/bootsstrap-4') }}
                     </difv>
               </div>
         </div>
    </div>