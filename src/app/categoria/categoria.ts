import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth';
import { Router} from '@angular/router';

/**
 * @description
 * Este componente que muestra los juegos segun las diferentes categorías.
 *
 * Permite realizar las siguientes funciones:
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
  styleUrls: ['./categoria.css'],
  imports: [CommonModule]
})

export class CategoriaComponent implements OnInit {

  /**
   * @description
   * Categoría actual en url
   */
  categoria = '';

  /**
   * @description
   * Arreglo de juegos por categoría seleccionada
   */
  juegos: any[] = [];

  private datos: any = {
    medieval: [
      { 
        titulo: 'Catan', 
        imagen: '../assets/img/catan.jpg', 
        descripcion: 'En familia o con amigos, Catan es el juego de mesa imprescindible para todos los hogares', 
        precio: 34990
      },
      { 
        titulo: 'Valle Secreto', 
        imagen: '../assets/img/valleSecreto.jpg', 
        descripcion: 'Los jugadores se sumergen en una emocionante aventura en un valle mágico oculto entre las montañas', 
        precio: 29990 
      }
    ],
    cartas: [
      { 
        titulo: 'Uno', 
        imagen: '../assets/img/cartas1.jpg', 
        descripcion: 'Sé el primero en quedarte sin tus 7 cartas iniciales',
        precio: 15990 
      },
      { 
        titulo: 'Naipe Inglés', 
        imagen: '../assets/img/cartasIngles.jpeg', 
        descripcion: 'Excelente para realizar juegos de magia, azar y más',
        precio: 13990 
      }
    ],
    ingenio: [
      { 
        titulo: 'Super Cortex', 
        imagen: '../assets/img/cortex.png', 
        descripcion: '¡Desafía a tu cerebro con un divertido juego que pondrá a prueba tu razonamiento, memoria y rapidez!',
        precio: 31990 
      },
      { 
        titulo: 'Scrabble', 
        imagen: '../assets/img/scrabble.jpg', 
        descripcion: 'Edición en español del clásico juego de palabras donde debes formar palabras para ganar puntos.',
        precio: 59990 
      }
    ]
  };

  /**
   * @description
   * Determinar la sesión de usuario actual es relevante ya que solo los clientes pueden agregar juegos al carro de compras
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
        cantidad: 1
      });
    }

    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    alert('Juego agregado correctamente al carro de compras');
  }

}
