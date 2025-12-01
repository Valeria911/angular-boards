import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
  imports: [CommonModule, FormsModule]
})
export class CarritoComponent implements OnInit {
  
  carrito: any[] = [];
  total = 0;
  claveCarro= '';

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (sesion?.logueado) {
      this.claveCarro= 'carro_' + sesion.email;
      this.cargarCarrito();
    }
  }

  cargarCarrito() {
    this.carrito = JSON.parse(localStorage.getItem(this.claveCarro) || '[]');
    this.total = this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  }

  eliminar(index: number) {
    this.carrito.splice(index, 1);
    localStorage.setItem(this.claveCarro, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

  vaciarCarrito() {
    localStorage.removeItem(this.claveCarro);
    this.cargarCarrito();
  }

  comprar() {
    if (this.carrito.length === 0) {
      alert('Carro de compras vacío. No se puede realizar la compra');
      return;
    }

    alert('¡Compra realizada correctamente!');
    this.vaciarCarrito();
  }

  actualizarCantidad(index: number, nuevaCantidad: number) {
    if (nuevaCantidad < 1) return;

    this.carrito[index].cantidad = nuevaCantidad;
    localStorage.setItem(this.claveCarro, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

}
