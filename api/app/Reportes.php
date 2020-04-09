<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reportes extends Model
{
    protected $fillable = ['CodRep','DireccionD','CmunicipioD','MunicipioD','BarrioD','Tposte','Tluminaria','Tproblema',
    'Dproblema','fechaD','HoraReporte','IdentUsu','ape_us','nom_us','correo','celular','IPEquipo'];
    protected $primaryKey = 'CodRep';
    public $timestamps = false;
}
