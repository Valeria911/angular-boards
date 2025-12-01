import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * @description Este componente contiene la lógica para gestionar el carrito de compras.
 * Permite cargar, actualizar, eliminar productos y realizar la compra.
 */

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
  imports: [CommonModule, FormsModule]
})

export class CarritoComponent implements OnInit {
  
  carrito: any[] = [];
  total = 0;
  claveCarrito= '';

  /**
   * @description Inicializa el componente y carga el carrito de compras desde el almacenamiento local
   * si el usuario está logueado.
   */
  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (sesion?.logueado) {
      this.claveCarrito= 'carrito_' + sesion.email;
      this.cargarCarrito();
    }
  }

  /**
   * @description Carga el carrito de compras desde el almacenamiento local y calcula el total de los elementos que contiene
   */
  cargarCarrito() {
    this.carrito = JSON.parse(localStorage.getItem(this.claveCarrito) || '[]');
    this.total = this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  }

  /**
   * @description Elimina un producto del carrito de compras según su índice
   * @param index Índice del producto a eliminar
   */
  eliminar(index: number) {
    this.carrito.splice(index, 1);
    localStorage.setItem(this.claveCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

  /**
   * @description Vacía todo el carrito de compras
   */
  vaciarCarrito() {
    localStorage.removeItem(this.claveCarrito);
    this.cargarCarrito();
  }

  /**
   *@description Realiza la compra de los productos en el carrito de compras
   * Si el carrito está vacío, muestra una alerta indicando que no se puede realizar la compra 
   */
  comprar() {
    if (this.carrito.length === 0) {
      alert('Carro de compras vacío. No se puede realizar la compra');
      return;
    }

    alert('¡Compra realizada correctamente!');
    this.vaciarCarrito();
  }

  /**
   * @description Actualiza la cantidad de un producto en el carrito de compras
   * @param index Índice del producto a actualizar
   * @param nuevaCantidad Nueva cantidad del producto
   */
  actualizarCantidad(index: number, nuevaCantidad: number) {
    if (nuevaCantidad < 1) return;

    this.carrito[index].cantidad = nuevaCantidad;
    localStorage.setItem(this.claveCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

}
