<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'=> 'required|string|max:55',
            'email'=> 'required|email|unique:companies,email',
            'website'=>'max:100',
            'logo' => [
                'image',
                'mimes:jpeg,png,jpg,gif',
                function ($attribute, $value, $fail) {
                    if ($value) {
                        list($width, $height) = getimagesize($value);
                        if ($width < 100 || $height < 100) {
                            $fail("The $attribute must be at least 100x100 pixels.");
                        }
                    }
                },
            ],
        ];
    }
}