import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class DbtaskService {

  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;

  private storage: Storage | null = null;

  constructor(private storageService: Storage) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.init();
  }

  // =========================
  // INIT STORAGE
  // =========================
  async init() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

  // =========================
  // BASE DE DATOS SQLITE
  // =========================
  async setDatabase() {
    await this.init();

    this.db = await this.sqlite.createConnection(
      'skeletonDB',
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    await this.createTables();
  }

  // =========================
  // CREAR TABLAS SQLITE (RÚBRICA)
  // =========================
  async createTables() {
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS sesion_data (
        user_name TEXT PRIMARY KEY NOT NULL,
        password INTEGER NOT NULL,
        active INTEGER NOT NULL
      );
    `);
  }

  // =========================
  // 🔐 AUTH SQLITE
  // =========================

  async registrarUsuario(usuario: any) {

    await this.db.run(
      `INSERT INTO sesion_data (user_name, password, active)
       VALUES (?, ?, ?)`,
      [usuario.email, usuario.password, 1]
    );

    await this.registrarSesion(usuario.email);

    return { ok: true, msg: 'Usuario registrado correctamente' };
  }

  async validarUsuario(email: string, password: string) {

    const res = await this.db.query(
      `SELECT * FROM sesion_data WHERE user_name = ? AND password = ?`,
      [email, password]
    );

    if (!res.values || res.values.length === 0) {
      return { ok: false, msg: 'Credenciales incorrectas' };
    }

    await this.registrarSesion(email);

    return { ok: true, usuario: res.values[0] };
  }

  async registrarSesion(user_name: string) {

    await this.db.run(
      `UPDATE sesion_data SET active = 1 WHERE user_name = ?`,
      [user_name]
    );

    await this.storage?.set('sesion_activa', user_name);
  }

  async sesionActiva() {

    const res = await this.db.query(
      `SELECT * FROM sesion_data WHERE active = 1 LIMIT 1`
    );

    return res.values?.[0] || null;
  }

async cerrarSesion() {

  // 1. Desactivar en SQLite
  await this.db.execute(`
    UPDATE sesion_data SET active = 0
  `);

  // 2. Limpiar Storage
  await this.storage?.remove('sesion_activa');

  return { ok: true, msg: 'Sesión cerrada correctamente' };
}

  

  // =========================
  // 👤 USUARIOS (compatibilidad UI)
  // =========================

  async obtenerUsuarios() {
    return [];
  }

  async actualizarUsuarios(_: any[]) {
    return;
  }
// =========================
// 🛒 CARRITO (Storage)
// =========================

async agregarCarrito(producto: any) {

  const carrito = (await this.storage?.get('carrito')) || [];

  carrito.push(producto);

  await this.storage?.set('carrito', carrito);

  return { ok: true };
}

async obtenerCarrito() {

  return (await this.storage?.get('carrito')) || [];

}

async eliminarProductoCarrito(index: number) {

  const carrito = (await this.storage?.get('carrito')) || [];

  carrito.splice(index, 1);

  await this.storage?.set('carrito', carrito);

  return { ok: true };

}

async vaciarCarrito() {

  await this.storage?.set('carrito', []);

}
// =========================
// 📦 PRODUCTOS (Storage)
// =========================

async guardarProductos(productos: any[]) {

  await this.storage?.set('productos_api', productos);

}

async obtenerProductosGuardados() {

  return (await this.storage?.get('productos_api')) || [];

}

}