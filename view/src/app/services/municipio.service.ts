import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Municipio } from '../interfaces/municipio';
import { Barrio } from '../interfaces/barrio';
@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  constructor(private http: HttpClient) { }
  getBarrios() {
    return this.http.get<Barrio[]>('http://127.0.0.1:8000/barrios');
  }
  getMunicipios()  
  {  
    return this.http.get<Municipio[]>('http://127.0.0.1:8000/municipios');
  }  
}
