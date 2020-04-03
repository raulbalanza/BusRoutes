import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapService } from 'src/app/services/map.service';
import { ToastController, AlertController } from '@ionic/angular';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-stop-info',
  templateUrl: './stop-info.page.html',
  styleUrls: ['./stop-info.page.scss'],
})
export class StopInfoPage implements OnInit {

  lineImgBase = "http://www.emtvalencia.es/EmtEsquemas_graphics/line-icons/";
  id:string;
  info:any;
  isFav:boolean = false;

  constructor( private route:ActivatedRoute, 
    private map:MapService, 
    private toastController:ToastController, 
    private fav:FavoritesService, 
    private alertController:AlertController ) {

    fav.load();

    this.id = route.snapshot.paramMap.get("id");

    for (let entry of fav.favStops){

      if (entry.id == this.id){
        this.isFav = true;
        break;
      }

    }

    this.getScheduleInfo();
  }

  timeLeft(bus:any){

    if (typeof bus.minutos === "string") return bus.minutos;
    if (typeof bus.horaLlegada === "string") return bus.horaLlegada;
    if (typeof bus.error === "string") return bus.error;

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Estimations have been loaded.',
      duration: 2000
    });
    toast.present();
  }

  getScheduleInfo(){

    this.map.getSchedule(this.id).subscribe((data:any) => {
      this.info = data.estimacion;

      if (!Array.isArray(this.info.solo_parada.bus)){
        this.info.solo_parada.bus = [this.info.solo_parada.bus];
      }

      // console.log(this.info);
      this.presentToast();
    });

  }

  switchFavorite(){

    if (!this.isFav){

      this.askNameAlert();

    } else {

      this.fav.removeFavStop(this.id);
      this.isFav = !this.isFav;

    }    

  }

  async askNameAlert() {
    const alert = await this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Stop name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log("Canceled");
          }
        }, {
          text: 'Add',
          handler: (data) => {
            this.fav.addFavStop(this.id, data.name);
            this.isFav = !this.isFav;
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
