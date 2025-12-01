import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @description
 * Componente que gestiona el login de usuarios.
 *
 * Permite realizar las siguientes funciones:
 * - Validar formulario de login
 * - Autenticar usuario
 * - Redirigir según tipo de usuario
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [RouterModule, ReactiveFormsModule, CommonModule]
})

export class LoginComponent {

  formLogin!: FormGroup;

  error: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.error = false;
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const { email, password } = this.formLogin.value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) =>
      u.email === email && u.password === password
    );

    if (usuario) {
      localStorage.setItem('sesion', JSON.stringify({
        logueado: true,
        usuario: usuario.usuario,
        tipo: usuario.tipo || 'cliente'
      }));

      // Redirigir según tipo de usuario
      window.location.assign(usuario.tipo === 'admin' ? '/admin' : '/home');

    } else {
      this.error = true;
    }
  }

  limpiar() {
    this.formLogin.reset();
    this.error = false;
  }
}

