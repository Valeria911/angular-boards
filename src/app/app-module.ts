import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './home/home';
import { AdminComponent } from './admin/admin';
import { LoginComponent } from './login/login';
import { PerfilComponent } from './perfil/perfil';
import { RegistroComponent } from './registro/registro';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password';
import { CarritoComponent } from './carrito/carrito';
import { CategoriaComponent } from './categoria/categoria';
import { NavbarComponent } from './navbar/navbar';
import { FooterComponent } from './footer/footer';

@NgModule({
  declarations: [
    App,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    PerfilComponent,
    RegistroComponent,
    RecuperarPasswordComponent,
    CarritoComponent,
    CategoriaComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
