import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import {Imagen} from '../clases/imagen'

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private apiUrl: string = environment.baseUrl + 'imagenes';
  constructor(private http: HttpClient) { }

  getImagenes(): Observable<Imagen[]>{
    return this.http.get<Imagen[]>(this.apiUrl)
  }

}
