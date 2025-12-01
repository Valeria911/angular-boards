import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoComponent } from './carrito';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('CarritoComponent', () => {

  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoComponent],
      imports: [FormsModule, CommonModule]
    });

    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  //deberia crear el componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // prueba para actualizar cantidad
  it('debería actualizar la cantidad y recalcular el total correctamente', () => {
    localStorage.setItem('sesion', JSON.stringify({
      logueado: true,
      email: 'test@correo.com'
    }));

    component.claveCarrito = 'carrito_test@correo.com';

    //carrito de prueba
    const carritoMock = [
      { nombre: 'Juego 1', precio: 10000, cantidad: 1 }
    ];
    //guardar
    localStorage.setItem(component.claveCarrito, JSON.stringify(carritoMock));

    component.cargarCarrito();

    component.actualizarCantidad(0, 2);
    //verificar
    expect(component.carrito[0].cantidad).toBe(2);
    expect(component.total).toBe(20000);
  });
});
