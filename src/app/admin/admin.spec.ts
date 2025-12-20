import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin';
import { VentasService } from '../services/ventas';
import { of } from 'rxjs';

// Pruebas unitarias para el componente AdminComponent
describe('Admin', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  const mockVentasService: any = {
    getVentas: () => of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [{ provide: VentasService, useValue: mockVentasService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.removeItem('usuarios');
  });

  it('deberia crear', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('deberia cargar usuarios desde localStorage', () => {
    const usuarios = [{ name: 'Usuario de prueba', email: 'prueba@ejemplo.com' }];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    component.ngOnInit();

    expect(component.usuarios).toEqual(usuarios);
  });

  it('deberia establecer ventas desde ventasService al inicializar', () => {
    const ventas = [{ id: 1, total: 100 }];
    mockVentasService.getVentas = () => of(ventas);

    component.ngOnInit();

    expect(component.ventas).toEqual(ventas);
  });

  it('deberia eliminar usuario y actualizar localStorage cuando se llama eliminarUsuario', () => {
    component.usuarios = [{ email: 'a@ejemplo.com' }, { email: 'b@ejemplo.com' }];
    localStorage.setItem('usuarios', JSON.stringify(component.usuarios));

    component.eliminarUsuario('a@ejemplo.com');

    expect(component.usuarios).toEqual([{ email: 'b@ejemplo.com' }]);
    expect(JSON.parse(localStorage.getItem('usuarios')!)).toEqual([{ email: 'b@ejemplo.com' }]);
  });
});

