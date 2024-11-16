import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Publicacion } from '../clases/publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private apiUrl: string = environment.baseUrl + '/media/publicaciones/';

  constructor(private http: HttpClient) { }

  getPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl);
  }

}
