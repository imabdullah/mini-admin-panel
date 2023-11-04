<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
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
            'first_name'=> 'required|string|max:55',
            'last_name'=> 'required|string|max:55',
            'company_id'=> 'required',
            'email'=> 'email|unique:employees,email',
            'phone'=> 'required|unique:employees,phone,'.$this->id,
        ];
    }
}