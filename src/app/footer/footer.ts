import { Component, OnInit } from '@angular/core';
import { MonedaService } from '../services/moneda';

/**
 * @description
 * Componente de footer de la aplicación, reutilizable en varias vistas
 */
@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent implements OnInit {
  dolarValor: number | null = null;
  fecha: string | null = null;

  constructor(private monedaService: MonedaService) {}

  ngOnInit(): void {
    this.cargarDolar();
  }

  cargarDolar(): void {
    this.monedaService.getDolarData().subscribe({
      next: (data) => {
        if (data?.serie && data.serie.length > 0) {
          this.dolarValor = data.serie[0].valor;
          this.fecha = data.serie[0].fecha.substring(0, 10); // YYYY-MM-DD
        }
      },
      error: (err) => {
        console.error('Error cargando dólar:', err);
      }
    });
  }

}
