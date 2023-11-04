<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
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
            'email'=> 'required|email|unique:employees,email,'.$this->id,
            'phone'=> 'required|unique:employees,phone,'.$this->id,
            'company_id'=> 'required',
        ];
    }
}