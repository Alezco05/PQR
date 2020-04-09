<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportesPost extends FormRequest
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
        'DireccionD'=> 'required|min:5|max:500',
        'CmunicipioD'=> 'required|numeric',
        'MunicipioD'=> 'required|min:5|max:255',
        'BarrioD'=> 'required|min:5|max:255',
        'Tposte'=> 'required|min:5|max:255',
        'Tluminaria'=> 'required|min:5|max:255',
        'Tproblema'=> 'required|min:5|max:255',
        'Dproblema'=> 'required|min:5|max:500',
        'fechaD'=> 'required',
        'HoraReporte'=> 'required',
        'IdentUsu' => 'required|numeric',
        'ape_us'=> 'required',
        'nom_us'=> 'required|max:255',
        'correo'=> 'required|email:rfc,dns',
        'celular' => 'required|numeric',
        'IPEquipo' => 'required'
    ];
    }
}
