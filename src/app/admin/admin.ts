import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @description
 * Este componente permite administrar los usuarios del sistema. Además del administrador existen los usuarios tipo cliente. 
 * @usageNotes
 * Datos provienen desde localStorage con estructura: nombre, nombre de usuario, email, password.
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
  imports: [CommonModule]
})

export class AdminComponent implements OnInit {
  usuarios: any[] = [];
  /**
   * @description
   * Al iniciar el componente se carga la lista de usuarios desde localStorage
   */
  ngOnInit(): void {
    const data = localStorage.getItem('usuarios');
    if (data) {
      this.usuarios = JSON.parse(data);
    }
  }

  /**
   * @description
   * Este método permite eliminar un usuario por correo electrónico y actualizar la información en localStorage.
   *
   * @param correo Correo registrado del usuario a eliminar.
   *
   */
  eliminarUsuario(correo: string): void {
    this.usuarios = this.usuarios.filter(u => u.email !== correo);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

}
