import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import { environment } from '../environments/environment.development';
import {AuthService} from "@auth0/auth0-angular";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(public auth: AuthService, private http: HttpClient) {
  }

  uploadFile(formData: FormData): Observable<any>{
    return this.auth.getAccessTokenSilently().pipe(
      switchMap((token: string) =>
        this.http.post(environment.apiUrl + "/media/upload/", formData, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
      )
    );
  }
}
