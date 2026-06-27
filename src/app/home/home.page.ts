import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbtaskService } from '../services/dbtask.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(
    private db: DbtaskService,
    private router: Router,
    private authService: AuthService
  ) {}

  // Navegar a Productos
  irProductos() {
    this.router.navigate(['/productos']);
  }

  // Navegar a Carrito
  irCarrito() {
    this.router.navigate(['/carrito']);
  }

  // Navegar a Perfil
  irPerfil() {
    this.router.navigate(['/perfil']);
  }

  // Cerrar sesión
async cerrarSesion() {

  console.log('BOTON FUNCIONA');

  await this.authService.logout();

  this.router.navigateByUrl('/login');

}
}