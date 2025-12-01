import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @description Servicio para la gestión de autenticación de usuarios.
 * Proporciona métodos para iniciar y cerrar sesión, verificar el estado de autenticación
 * y gestionar usuarios en el almacenamiento local.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sesionSubject = new BehaviorSubject<any>(this.getSesion());
  sesion$ = this.sesionSubject.asObservable();

  constructor() {
  const usuariosStr = localStorage.getItem('usuarios');
  if (!usuariosStr) {
    const admin = {
      nombre: 'Admin',
      email: 'admin@boards.cl',
      password: 'Boards123',
      tipo: 'admin'
    };
    localStorage.setItem('usuarios', JSON.stringify([admin]));
  }
}

  getSesion() {
    const sesion = localStorage.getItem('sesion');
    return sesion ? JSON.parse(sesion) : null;
  }

  estaLogueado(): boolean {
    const sesion = this.getSesion();
    return sesion?.logueado || false;
  }

  esAdmin(): boolean {
    const sesion = this.getSesion();
    return sesion?.tipo === 'admin';
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.sesionSubject.next(null);
  }

  iniciarSesion(sesionData: any): void {
    localStorage.setItem('sesion', JSON.stringify(sesionData));
    this.sesionSubject.next(sesionData);
  }

  addUser(user: any): boolean {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const existe = usuarios.some((u: any) => u.email === user.email);
  if (existe) return false;
  usuarios.push(user);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  return true;
}

}

