import { Component, OnInit } from '@angular/core';

/**
 * Este componente permite la administración de usuarios en el sistema. 
 * @usageNotes
 * Datos desde localStorage con estructura: nombre, usuario, email, password.
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  usuarios: any[] = [];
  /**
   * Al iniciar el componente se carga la lista de usuarios desde localStorage
   */
  ngOnInit(): void {
    const data = localStorage.getItem('usuarios');
    if (data) {
      this.usuarios = JSON.parse(data);
    }
  }

  /**
   * Eliminar un usuario por correo electrónico y actualizar la información en localStorage.
   *
   * @param correo Correo registrado del usuario a eliminar.
   *
   */
  eliminarUsuario(correo: string): void {
    this.usuarios = this.usuarios.filter(u => u.email !== correo);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

}
