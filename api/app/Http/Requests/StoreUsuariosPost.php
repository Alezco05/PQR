<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUsuariosPost extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'Identificacion' => 'required|min:4|max:200',
            'Nombre' => 'required|min:4|max:200',
            'Apellidos' => 'required|min:4|max:200',
            'Email' => 'required|min:4|max:200',
            'Telefono' => 'required|min:4|max:20',
            'Fecha_HD' => 'min:1|max:500',
            'IP_Equipo' => 'min:1|max:500',
        ];

    }
}
