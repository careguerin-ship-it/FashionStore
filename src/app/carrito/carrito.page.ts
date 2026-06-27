import { Component, OnInit } from '@angular/core';
import { DbtaskService } from '../services/dbtask.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false
})
export class CarritoPage implements OnInit {

  carrito: any[] = [];
  total: number = 0;

  constructor(private db: DbtaskService) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  ionViewWillEnter() {
    this.cargarCarrito();
  }

  async cargarCarrito() {

    this.carrito = await this.db.obtenerCarrito();

    this.calcularTotal();

  }

  calcularTotal() {

    this.total = this.carrito.reduce(
      (suma, producto) => suma + Number(producto.price),
      0
    );

  }

  async eliminarProducto(index: number) {

    await this.db.eliminarProductoCarrito(index);

    this.cargarCarrito();

  }

  async vaciarCarrito() {

    await this.db.vaciarCarrito();

    this.cargarCarrito();

  }

  finalizarCompra() {

    alert('¡Compra realizada con éxito!');

    this.vaciarCarrito();

  }

}