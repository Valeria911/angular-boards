import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login';

// Pruebas unitarias para el componente LoginComponent
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Limpiar localStorage después de cada prueba
    localStorage.removeItem('usuarios');
    localStorage.removeItem('sesion');
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería establecer error = true cuando las credenciales son inválidas', () => {
    // Preparar datos: un usuario distinto al que usaremos en la prueba
    localStorage.setItem('usuarios', JSON.stringify([{ email: 'usuario@ejemplo.com', password: 'secret' }]));

    component.formLogin.controls['email'].setValue('incorrecto@ejemplo.com');
    component.formLogin.controls['password'].setValue('incorrecta');

    component.login();

    expect(component.error).toBeTrue();
  });

  it('debería guardar la sesión y redirigir en un login exitoso', () => {
    // Usuario válido en localStorage
    const usuario = { usuario: 'usuario1', email: 'usuario1@ejemplo.com', password: 'pass123', tipo: 'cliente' };
    localStorage.setItem('usuarios', JSON.stringify([usuario]));

    component.formLogin.controls['email'].setValue('usuario1@ejemplo.com');
    component.formLogin.controls['password'].setValue('pass123');

    // Espiar la redirección para no cambiar la ubicación durante la prueba
    const assignSpy = spyOn(window.location, 'assign' as any).and.callFake(() => {});

    component.login();

    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    expect(sesion.logueado).toBeTrue();
    expect(sesion.usuario).toBe('usuario1');
    expect(assignSpy).toHaveBeenCalled();
  });
});
