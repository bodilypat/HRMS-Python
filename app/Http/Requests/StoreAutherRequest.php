<?php

namespace App\Http\Request;

use Illuminate\Foundation\FormRequest;

class StoreAutherRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|unique:authers, name, except, id'
        ];
    }
}
