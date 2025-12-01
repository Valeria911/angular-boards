import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente que muestra los juegos segun
 * categorías.
 *
 * Pasos.
 * - obtener categoría desde URL
 * - cargar juegos
 * - agregar juegos al carro de compras
 * - verificar login de cliente
 *
 * @usageNotes
 * Este componente toma el nombre de la categoría desde la URL
 */
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.html',
  styleUrls: ['./categoria.css']
})
export class CategoriaComponent implements OnInit {

  /**
   * Categoría actual en url
   */
  categoria = '';

  /**
   * Arreglo de juegos por categoría seleccionada
   */
  juegos: any[] = [];

  private datos: any = {
    medieval: [
      { titulo: 'Catan', imagen: 'assets/img/catan.jpg', precio: 34990 },
      { titulo: 'Valle Secreto', imagen: 'assets/img/valleSecreto.jpg', precio: 29990 }
    ],
    cartas: [
      { titulo: 'Uno', imagen: 'assets/img/cartas2.jpg', precio: 15990 },
      { titulo: 'Naipe Inglés', imagen: 'assets/img/cartasIngles.jpeg', precio: 13990 }
    ],
    ingenio: [
      { titulo: 'Super Cortex', imagen: 'assets/img/cortex.png', precio: 31990 },
      { titulo: 'Scrabble', imagen: 'assets/img/scrabble.jpg', precio: 59990 }
    ]
  };

  /**
   * sesión de usuario actual
   */
  sesion: any = null;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    this.route.params.subscribe(params => {
      this.categoria = params['nombre'];
      this.juegos = this.datos[this.categoria] || [];
    });
  }

  agregarAlCarrito(juego: any) {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (!sesion || sesion.tipo !== 'cliente') {
      alert('Debes iniciar sesión como cliente para agregar juegos al carro');
      return;
    }

    const claveCarrito = 'carrito_' + sesion.email;
    const carritoStr = localStorage.getItem(claveCarrito);
    const carrito = carritoStr ? JSON.parse(carritoStr) : [];

    const index = carrito.findIndex((item: any) => item.nombre === juego.titulo);

    if (index >= 0) {
      carrito[index].cantidad++;
    } else {
      carrito.push({
        nombre: juego.titulo,
        categoria: this.categoria,
        precio: juego.precio,
        cantidad: juego.cantidad || 1
      });
    }

    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    alert('Juego agregado correctamente al carro de compras');
  }

}
