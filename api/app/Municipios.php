<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Municipios extends Model
{
    public $table = "municipio";
    protected $primaryKey = 'CodigoMun';
    protected $fillable = ['CodigoMun','NombreMun'];
}
