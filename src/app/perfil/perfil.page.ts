import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {

  nombre = 'Caroline';
  correo = 'caroline@gmail.com';

  fotoPerfil = 'assets/images/perfil.png';

  constructor(
    private storage: Storage,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {

    await this.storage.create();

    const foto = await this.storage.get('fotoPerfil');

    if (foto) {
      this.fotoPerfil = foto;
    }

  }

  async tomarFoto() {

    try {

      const image = await Camera.getPhoto({

        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera

      });

      if (image.dataUrl) {

        this.fotoPerfil = image.dataUrl;

        await this.storage.set(
          'fotoPerfil',
          image.dataUrl
        );

      }

    } catch (error) {

      console.log('Cámara cancelada', error);

    }

  }

  async cerrarSesion() {

    await this.authService.logout();

    this.router.navigateByUrl('/login');

  }

}