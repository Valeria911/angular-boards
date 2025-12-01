import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * @description Componente de la barra de navegación que maneja la sesión del usuario.
 * Incluye funcionalidad para cerrar sesión y actualizar el estado de la sesión.
 */

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [RouterModule, CommonModule]
})

export class NavbarComponent implements OnInit {
  sesion: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  /**
   * @description Inicializa el componente y suscribe al estado de la sesión del usuario.
   */
  ngOnInit(): void {
  this.auth.sesion$.subscribe(sesion => {
    this.sesion = sesion;
  });
}

  /**
   * @description Cierra la sesión del usuario y redirige a la página principal.
   */
  cerrarSesion() {
    console.log("Cierre de sesión");
    this.auth.cerrarSesion();
    this.router.navigate(['/']);
  }
}
