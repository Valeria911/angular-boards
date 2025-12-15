import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MonedaService {
  private apiUrl = 'https://mindicador.cl/api/dolar';
  
  constructor(private http: HttpClient) {}

  /**
   * @description Obtiene los datos del dólar desde la API pública.
   * @returns Observable con los datos del dólar.
   */
  getDolarData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
