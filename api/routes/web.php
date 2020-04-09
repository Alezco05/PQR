<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::group(['middleware' => ['cors']], function () {
    //Rutas a las que se permitirá acceso
    Route::resource('api','UsuariosController');
    Route::resource('reportes', 'ReportesController');
    Route::resource('barrios', 'BarriosController');
    Route::resource('municipios', 'MunicipiosController');
    Route::post("send/email", "ReportesController@mail");
});
