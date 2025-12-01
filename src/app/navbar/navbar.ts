import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [RouterModule, CommonModule]
})
export class NavbarComponent implements OnInit {
  sesion: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  this.auth.sesion$.subscribe(sesion => {
    this.sesion = sesion;
  });
}

  cerrarSesion() {
    console.log("Cierre de sesión");
    this.auth.cerrarSesion();
    this.router.navigate(['/']);
  }
}
