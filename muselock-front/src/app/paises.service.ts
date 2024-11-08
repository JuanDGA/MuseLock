import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private apiUrl = 'https://www.universal-tutorial.com/api/';

  constructor(private http: HttpClient) {}

  getAccessToken():Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'api-token': 'ltlgzwqcI9ozY8XoF6BfG8j5N8wF4O_fe5Dk7aAykfmi5zsZzEwDOzE7VwgHDIVE2PE',
      'user-email': 'muselock6@gmail.com'
    });

    return this.http.get(this.apiUrl + "getaccesstoken", { headers });
  }

  getPaises(token:string):Observable<any>{
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Accept": "application/json"
    });
    console.log(headers.keys());
    return this.http.get(this.apiUrl + "countries/")
  }
}
