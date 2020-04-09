import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/usuarios';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  getUsuarios() {
    return this.http.get<Usuario[]>('http://127.0.0.1:8000/api');
  }
  getUsuario(id : number){
    return this.http.get<Usuario>(`http://127.0.0.1:8000/api/${id}`);
  }
  createUsuario(data: Usuario){
    return this.http.post(`http://127.0.0.1:8000/api`, data);
  }
  updateUsuario(id : number,data: Usuario){
    return this.http.put(`http://127.0.0.1:8000/api/${id}`, data);
  }
}
