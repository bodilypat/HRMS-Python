<?php

namespace App\Http\Controllers;

use App\Models\auther;
use App\Http\Requests\StoreAutherRequest;
use App\Http\Requests\UpdateAutherRequest;

class AutherController extends Controller
{
    public fuction index()
    {
        return view('auther.index', [
            'authers' => auther:: Paginate(5)
        ]);
    }

    public function create()
    {
        return view('auther.create');
    }

    public function store(StoreAutherRequest $request)
    {
        auther::create($request ->validated());
        return redirect()->route('authors');
    }

    public function edit(auther $auther)
    {
        return view('auther.edit', [
            'auther' => $auther
        ]);
    }

    public function update(UpdateAutherRequest $id)
    {
        $auther = auther::find($id);
        $auther->name = $request->name;
        $auther->save();

        return redirect()->route('authors');
    }

    public function destroy($id)
    {
        auther::findorfail($id)->delete();
        return redirect()->route('authors');
    }
}
