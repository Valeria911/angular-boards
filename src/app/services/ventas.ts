import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class VentasService {
  private url = '../assets/data/ventas.json';

  constructor(private http: HttpClient) {}
  
  getVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
  
}
