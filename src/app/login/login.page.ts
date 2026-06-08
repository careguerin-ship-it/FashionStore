import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  usuario = '';
  password = '';

  constructor(private router: Router) {}

  ingresar() {

    if (
      this.usuario === '' ||
      this.password === ''
    ) {

      alert('Debe completar todos los campos');
      return;

    }

    this.router.navigate(['/home']);

  }

}