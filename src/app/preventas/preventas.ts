import { Component, OnInit } from '@angular/core';
import { Preventa, PreventasService } from '../services/preventas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preventas',
  templateUrl: './preventas.html',
  styleUrls: ['./preventas.css'],
  imports: [CommonModule, FormsModule],
})

/**
 * @Description Componente para gestionar las preventas de productos. 
 * Permite agregar, editar, eliminar y listar preventas, almacenando los datos en localStorage.
 * @Author Valeria Gutiérrez
 */
export class PreventasComponent implements OnInit {

  preventas: Preventa[] = [];

  formulario: Preventa = {
    id: 0,
    titulo: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    fechaLanzamiento: ''
  };

  editando: boolean = false;

  private readonly STORAGE_KEY = 'preventas_data';

  constructor(private preventasService: PreventasService) { }

  ngOnInit(): void {
    const guardado = localStorage.getItem(this.STORAGE_KEY);

    if (guardado) {
      this.preventas = JSON.parse(guardado) as Preventa[];
    } else {
      this.preventasService.getPreventas().subscribe({
        next: (data) => {
          this.preventas = data.map(p => ({
            ...p,
            descripcion: p.descripcion ?? ''
          }));
          this.guardarEnLocalStorage();
        },
        error: (error) => {
          console.error('Error al cargar las preventas:', error);
        }
      });
    }
  }

  guardar(): void {
    if (!this.formulario.titulo.trim()) {
      alert('El titulo es obligatorio.');
      return;
    }

    if (this.editando) {
      const index = this.preventas.findIndex(p => p.id === this.formulario.id);
      if (index !== -1) {
        this.preventas[index] = { ...this.formulario };
      }
      this.editando = false;
    } else {
      const nuevoId = this.preventas.length > 0 ? Math.max(...this.preventas.map(p => p.id)) + 1 : 1;
      this.preventas.push({ ...this.formulario, id: nuevoId });
    }

    this.guardarEnLocalStorage();

    this.resetFormulario();
  }

  editar(preventa: Preventa): void {
    this.formulario = { ...preventa };
    this.editando = true;
  }

  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta preventa?'))
      return;
    this.preventas = this.preventas.filter(p => p.id !== id);
    this.guardarEnLocalStorage();
  }

  cancelar(): void {
    this.resetFormulario();
    this.editando = false;
  }

  private resetFormulario(): void {
    this.formulario = {
      id: 0,
      titulo: '',
      descripcion: '',
      precio: 0,
      imagen: '',
      fechaLanzamiento: ''
    };
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.preventas));
  }
}