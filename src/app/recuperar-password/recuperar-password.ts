import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'recuperar-password',
  templateUrl: './recuperar-password.html',
  styleUrls: ['./recuperar-password.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RecuperarPasswordComponent{

  formRecover!: FormGroup;
  mensaje = '';
  error = '';

  constructor(private fb: FormBuilder) {
    this.formRecover = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recuperar() {
    this.mensaje = '';
    this.error = '';

    // valida formulario
    if (this.formRecover.invalid) {
      this.formRecover.markAllAsTouched();
      return;
    }

    const email = this.formRecover.value.email;
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) => u.email === email);

    if (!usuario) {
      this.error = 'No se encuentra cliente con ese correo';
    } else {
      this.mensaje = `Hola ${usuario.nombre}, tu contraseña es: ${usuario.password}`;
    }
  }

  limpiar() {
    this.formRecover.reset();
    this.error = '';
    this.mensaje = '';
  }
}
