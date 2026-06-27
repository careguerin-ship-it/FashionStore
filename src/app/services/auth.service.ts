import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async login() {
    await this.storage.set('sesion', true);
  }

  async logout() {
    await this.storage.set('sesion', false);
  }

  async isLogged(): Promise<boolean> {

    const estado = await this.storage.get('sesion');

    return estado === true;

  }

}