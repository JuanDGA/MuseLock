import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import { UsuarioAuth } from './usuarioAuth';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = environment.apiUrl + '/login';
  autenticar(usuario:string, password:string):Observable<Usuario>{
    const parametros = new HttpParams()
      .set('usuario', usuario)
      .set('password', password);

    return this.http.post<Usuario>(this.apiUrl, parametros);
  }
}
