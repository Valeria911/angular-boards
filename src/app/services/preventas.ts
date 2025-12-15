import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventasService {

  private url = 'https://valeria911.github.io/api-preventas/preventas.json';

  constructor(private http: HttpClient) {}

  getPreventas(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}