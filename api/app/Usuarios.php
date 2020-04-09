<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    protected $fillable = ['Identificacion','Nombre','Apellidos','Email','Telefono','Fecha_HD','IP_Equipo'];
    protected $primaryKey = 'Identificacion';
    public $timestamps = false;
}
