import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) {
  }

  uploadFile(formData: FormData): Observable<any>{
    return this.http.post(environment.apiUrl + "/media/upload/", formData)
  }
}
