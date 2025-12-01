import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { AdminComponent } from './admin/admin';
import { CarritoComponent } from './carrito/carrito';
import { CategoriaComponent } from './categoria/categoria';
import { LoginComponent } from './login/login';
import { PerfilComponent } from './perfil/perfil';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password';
import { RegistroComponent } from './registro/registro';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'categoria/:nombre', component: CategoriaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'registro', component: RegistroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
