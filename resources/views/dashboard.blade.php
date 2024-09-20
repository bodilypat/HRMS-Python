@extends('layouts.app')

@section('content')
    <div id="admin-content">
        <div class="container">
              <div class="row">
                    <div class="col-md-3">
                          <h2 class="admin-heading">Dashboard</h2>
                    </div>
              </div>
              <div class="row">
                   <div class="col-md-3 mb-4">
                        <div class="card" style="width: 14rem; margin: 0 auto;">
                            <div class="card-body text-center">
                                <p class="card-text">{{ $artists }}</p>
                                <h5 class="card-title mb-0">Artists</h5>
                            </div>
                        </div>
                   </div>
                   <div class="col-md-3 ">
                        <div class="card" style="width: 14rem; margin: 0 auto;">
                             <div class="card-body text-center">
                                   <p class="card-text">{{ $artworks }}</p>
                                   <h2 class="card-title mb-0">Artists</h2>
                             </div>
                        </div>
                   </div>
                   <div class="col-md-3 ">
                        <div class="card" style="width: 14rem; margin: 0 auto;">
                            <div class="card-body text-center">
                                 <p class="card-text">{{ $exhibitions }}</p>
                                 <h2 class="card-title mb-0">Exhibitions</h2>
                            </div>
                        </div>
                   </div>
                   <div class="col-md-3">
                        <div class="card" style="width: 14rem; margin: 0 auto;">
                             <div class="card-body text-center">
                                  <p class="card-text">{{ $exhibition-artworks }}</p>
                                  <h2 class="card-title mb-0">Exhibition-artworks</h2>
                             </div>
                        </div>
                   </div>
                   <div class="col-md-3">
                        <div class="card" style="width:14rem; margin: 0 auto;">
                             <div class="card-text text-center">
                                  <p class="card-text">{{ $gallery_visitors }}</p>
                                  <h2 class="card-title mb-0">Gallery Visitors</h2>
                             </div>
                        </div>
                   </div>
                   <div class="col-md-3">
                        <div class="card" style="width: 14rem; margin: 0 auto">
                            <div class="card-text text-center">
                                 <p class="card-text">{{ $sales }}</p>
                                 <h2 class="card title mb-0">Sales</h2>
                            </div>
                        </div>
                   </div>
                   <div class="col-md-3">
                        <div class="card" style="width: 14rem; margin: 0 auto;">
                            <div class="card-text text-center">
                                 <p class="card-text">{{ $buyers }}</p>
                                 <h2 class="card-title mb-0">Buyers</h2>
                            </div>
                        </div>
                   </div>
              </div>
        </div>
    </div>
@endsection