import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MgService {

  constructor(
    public alertController: AlertController,
    public toastController: ToastController
    ) { }

    async presentAlert(tipo:string, texto:string) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: tipo,
        //subHeader: 'Subtitle',
        message: texto,
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async presentToast(texto: string) {
      const toast = await this.toastController.create({
        message: texto,
        duration: 2000
      });
      toast.present();
    }
  
}
