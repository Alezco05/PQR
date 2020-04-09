import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reporte } from '../interfaces/reportes';
@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }
  createReporte(data: Reporte){
    return this.http.post(`http://127.0.0.1:8000/reportes`, data);
  }
}
