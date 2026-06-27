import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DbtaskService } from '../services/dbtask.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: false
})
export class ProductosPage implements OnInit {

  productos: any[] = [];

 constructor(
  private apiService: ApiService,
  private db: DbtaskService,
  private router: Router
) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {

  this.apiService.getProductos().subscribe({

    next: async (data) => {

      console.log("Productos obtenidos desde API");

      this.productos = data;

      // Guardar en Storage
      await this.db.guardarProductos(data);

    },

    error: async (error) => {

      console.log("No hay Internet. Cargando productos guardados.");

      this.productos =
        await this.db.obtenerProductosGuardados();

    }

  });

}

  async agregarCarrito(producto: any) {

  await this.db.agregarCarrito(producto);

  alert('Producto agregado al carrito');

}
irCarrito() {
  this.router.navigate(['/carrito']);
}
}
