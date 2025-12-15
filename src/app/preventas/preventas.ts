import { Component, OnInit } from '@angular/core';
import { PreventasService } from '../services/preventas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preventas',
  templateUrl: './preventas.html',
  styleUrls: ['./preventas.css'],
  imports: [CommonModule]
})
export class PreventasComponent implements OnInit {

  preventas: any[] = [];

  constructor(private preventasService: PreventasService) {}

  ngOnInit(): void {
    this.preventasService.getPreventas().subscribe(data => {
      this.preventas = data;
    });
  }
}