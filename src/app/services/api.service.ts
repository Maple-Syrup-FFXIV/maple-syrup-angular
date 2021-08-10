import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private authToken: string = localStorage.getItem('DiscordToken') ?? '';
  private baseUrl: string = environment.backend.baseURL;

  constructor(private http: HttpClient) {}

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(this.baseUrl + path, body, this.getHttpOptions());
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this.baseUrl + path, {
      params,
      headers: this.getHttpOptions().headers,
    });
  }

  getHttpOptions(): any {
    if (this.authToken) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authToken,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Headers' : '*',
          'Access-Control-Request-Method': 'GET, POST, PUT, DELETE, OPTIONS'
        }),
      };
    } else {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Headers' : '*',
          'Access-Control-Request-Method': 'GET, POST, PUT, DELETE, OPTIONS'
        }),
      };
    }
  }
}
