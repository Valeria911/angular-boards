import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

/**
 * @description Componente para el registro de nuevos usuarios.
 * Permite a los usuarios registrarse proporcionando su información personal
 * y credenciales de acceso.
 */
@Component({
  selector: 'registro',
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule]
})

export class RegistroComponent {
  formRegistro!: FormGroup;

  error = '';
  exito = '';

  edadActual = 0;

  mostrarPassword = false;
  mostrarPassword2 = false;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {

    //reglas
    this.formRegistro = this.fb.group(
      {
        nombre: ['', Validators.required],

        usuario: ['', Validators.required],

        email: ['', [Validators.required, Validators.email]],

        fechaNacimiento: ['', Validators.required],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
          ]
        ],

        password2: ['', Validators.required]
      },
      {
        validators: [this.passwordsIgualesValidator]
      }
    );
  }

  passwordsIgualesValidator(group: AbstractControl) {
    const pass1 = group.get('password')?.value;
    const pass2 = group.get('password2')?.value;

    return pass1 !== pass2 ? { noCoinciden: true } : null;
  }

  calcularEdadEnVivo(event: any) {
    const fecha = event.target.value;
    if (!fecha) {
      this.edadActual = 0;
      return;
    }

    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    this.edadActual = edad;
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  togglePassword2() {
    this.mostrarPassword2 = !this.mostrarPassword2;
  }

  registrar() {
    this.error = '';
    this.exito = '';

    if (this.formRegistro.invalid) {
      this.error = 'Completa todos los campos';
      this.formRegistro.markAllAsTouched();
      return;
    }

    const datos = this.formRegistro.value;

    const edad = this.calcularEdad(datos.fechaNacimiento);
    if (edad < 13) {
      this.error = 'Debes tener al menos 13 años para registrarte.';
      return;
    }

    const nuevoUsuario = {
      nombre: datos.nombre,
      usuario: datos.usuario,
      email: datos.email,
      password: datos.password,
      direccion: datos.direccion || '',
      tipo: 'cliente'
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.exito = 'Cliente registrado exitosamente. Ahora puedes iniciar sesión';

    setTimeout(() => this.router.navigate(['/login']), 1500);
  }

  private calcularEdad(fecha: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  limpiar() {
    this.formRegistro.reset();
    this.error = '';
    this.exito = '';
    this.edadActual = 0;
  }
}
