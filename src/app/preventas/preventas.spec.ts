import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { PreventasComponent } from './preventas';
import { PreventasService } from '../services/preventas';

// Pruebas unitarias para el componente PreventasComponent
describe('Componente Preventas', () => {
  let component: PreventasComponent;
  let fixture: ComponentFixture<PreventasComponent>;

  const mockPreventasService: any = {
    getPreventas: () => of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreventasComponent],
      imports: [FormsModule],
      providers: [{ provide: PreventasService, useValue: mockPreventasService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreventasComponent);
    component = fixture.componentInstance;
    // No llamamos a fixture.detectChanges() aquí para controlar ngOnInit en cada prueba
  });

  afterEach(() => {
    // Limpiar almacenamiento local después de cada prueba
    localStorage.removeItem('preventas_data');
  });

  it('debería crear el componente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería cargar preventas desde localStorage en ngOnInit', () => {
    const datos = [{ id: 1, titulo: 'P1', descripcion: 'Desc1', precio: 100, imagen: '', fechaLanzamiento: '2024-01-01' }];
    localStorage.setItem('preventas_data', JSON.stringify(datos));

    component.ngOnInit();

    expect(component.preventas).toEqual(datos);
  });

  it('debería obtener preventas del servicio y guardarlas en localStorage cuando no hay datos', () => {
    const datos = [{ id: 2, titulo: 'Servicio', descripcion: null, precio: 200, imagen: '', fechaLanzamiento: '2024-02-02' }];
    mockPreventasService.getPreventas = () => of(datos);

    // Asegurarse de que no hay datos en localStorage
    localStorage.removeItem('preventas_data');

    component.ngOnInit();

    expect(component.preventas).toEqual(datos.map((p: any) => ({ ...p, descripcion: p.descripcion ?? '' })));
    expect(JSON.parse(localStorage.getItem('preventas_data') || '[]')).toEqual(component.preventas);
  });

  it('debería eliminar una preventa cuando la confirmación es positiva', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.preventas = [
      { id: 1, titulo: 'A', descripcion: '', precio: 100, imagen: '', fechaLanzamiento: '' },
      { id: 2, titulo: 'B', descripcion: '', precio: 200, imagen: '', fechaLanzamiento: '' }
    ];

    localStorage.setItem('preventas_data', JSON.stringify(component.preventas));

    component.eliminar(1);

    expect(component.preventas).toEqual([{ id: 2, titulo: 'B', descripcion: '', precio: 200, imagen: '', fechaLanzamiento: '' }]);
    expect(JSON.parse(localStorage.getItem('preventas_data') || '[]')).toEqual([{ id: 2, titulo: 'B', descripcion: '', precio: 200, imagen: '', fechaLanzamiento: '' }]);
  });
});
