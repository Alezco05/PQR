<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Barrios extends Model
{
    protected $fillable = ['CodBarrio ','NomBarrio','CMun','NMun'];
    protected $primaryKey = 'CodBarrio';
}
