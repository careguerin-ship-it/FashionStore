import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  usuario = '';
  password = '';

 constructor(
  private router: Router,
  private authService: AuthService
) {}

async ingresar() {

  // Usuario obligatorio

  if (this.usuario.trim() === '') {

    alert('Debe ingresar un correo electrónico.');

    return;

  }

  // Validar formato de correo

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(this.usuario)) {

    alert('Ingrese un correo electrónico válido.');

    return;

  }

  // Contraseña obligatoria

  if (this.password.trim() === '') {

    alert('Debe ingresar una contraseña.');

    return;

  }

  // Largo mínimo

  if (this.password.length < 6) {

    alert('La contraseña debe tener al menos 6 caracteres.');

    return;

  }

  // Login

  await this.authService.login();

  this.router.navigate(['/home']);

}

}