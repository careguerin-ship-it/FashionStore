import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: false
})
export class ProductosPage {


  productos = [
  {
    nombre: 'Polera Deportiva',
    precio: 19990,
    imagen: 'assets/images/polera.jpg'
  },
  {
    nombre: 'Jeans Mujer',
    precio: 29990,
    imagen: 'assets/images/jeans.jpg'
  },
  {
    nombre: 'Zapatillas Urbanas',
    precio: 49990,
    imagen: 'assets/images/zapatillas.jpg'
  },
  {
    nombre: 'Zapatos Formales',
    precio: 59990,
    imagen: 'assets/images/zapatos.jpg'
  }
];

}