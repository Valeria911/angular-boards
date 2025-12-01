import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @description Componente de perfil de usuario que permite ver y editar la información del perfil cuando el usuario es de tipo cliente
 * incluye validaciones para los campos del formulario y funcionalidad para mostrar u ocultar la contraseña.
 */
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css'],
  imports: [ReactiveFormsModule, CommonModule],
})

export class PerfilComponent implements OnInit {

  formPerfil!: FormGroup;
  usuarios: any[] = [];
  mensaje = '';
  mostrarPassword = false;

  constructor(private fb: FormBuilder) {}

  /**
   * @description Inicializa el componente, carga los datos del usuario desde el almacenamiento local y configura el formulario con validaciones.
   */
  ngOnInit(): void {

    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    const usuariosStr = localStorage.getItem('usuarios');
    this.usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

    const usuarioCompleto = this.usuarios.find(
      u => u.usuario === sesion?.usuario
    );

    // Formulario
    this.formPerfil = this.fb.group({
      nombre: [usuarioCompleto?.nombre, Validators.required],

      usuario: [usuarioCompleto?.usuario, Validators.required],

      email: [{ value: usuarioCompleto?.email, disabled: true }],

      password: [
        usuarioCompleto?.password,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ],

      tipo: [{ value: usuarioCompleto?.tipo, disabled: true }]
    });
  }

  // Ver/ocultar password
  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  /**
   * @description Guarda los cambios realizados en el perfil del usuario, actualiza el almacenamiento local y muestra un mensaje de confirmación.
   */
  guardarCambios() {
    if (this.formPerfil.invalid) {
      this.formPerfil.markAllAsTouched();
      return;
    }

    const datos = this.formPerfil.getRawValue();

    const index = this.usuarios.findIndex(u => u.usuario === datos.usuario);

    if (index !== -1) {
      this.usuarios[index] = { ...this.usuarios[index], ...datos };

      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
      localStorage.setItem('sesion', JSON.stringify(this.usuarios[index]));

      this.mensaje = 'Cambios guardados correctamente';
    }
  }
}
