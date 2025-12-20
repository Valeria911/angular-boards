import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PerfilComponent } from './perfil';

// Pruebas unitarias para el componente PerfilComponent
describe('Componente Perfil', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    // No llamamos a fixture.detectChanges() aquí para controlar ngOnInit en cada prueba
  });

  afterEach(() => {
    // Limpiar almacenamiento local después de cada prueba
    localStorage.removeItem('sesion');
    localStorage.removeItem('usuarios');
  });

  it('debería crear el componente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería alternar mostrarPassword al llamar togglePassword', () => {
    fixture.detectChanges();
    expect(component.mostrarPassword).toBeFalse();

    component.togglePassword();
    expect(component.mostrarPassword).toBeTrue();

    component.togglePassword();
    expect(component.mostrarPassword).toBeFalse();
  });

  it('debería guardar los cambios y actualizar localStorage al llamar guardarCambios con formulario válido', () => {
    // Preparar sesión y usuarios en localStorage
    const usuario = { nombre: 'Nombre', usuario: 'usuario1', email: 'usuario1@test.com', password: 'Abc123', tipo: 'cliente' };
    localStorage.setItem('usuarios', JSON.stringify([usuario]));
    localStorage.setItem('sesion', JSON.stringify({ usuario: 'usuario1' }));

    // Inicializar componente (ngOnInit carga datos desde localStorage)
    component.ngOnInit();

    // Modificar formulario con datos válidos
    component.formPerfil.controls['nombre'].setValue('Nombre Modificado');
    component.formPerfil.controls['password'].setValue('NuevaPass1');

    component.guardarCambios();

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const sesionGuardada = JSON.parse(localStorage.getItem('sesion') || '{}');

    expect(usuariosGuardados[0].nombre).toBe('Nombre Modificado');
    expect(sesionGuardada.usuario).toBe('usuario1');
    expect(component.mensaje).toBe('Cambios guardados correctamente');
  });
});
