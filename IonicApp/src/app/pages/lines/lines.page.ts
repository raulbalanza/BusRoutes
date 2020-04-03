import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.page.html',
  styleUrls: ['./lines.page.scss'],
})
export class LinesPage implements OnInit {

  lineImgBase = "http://www.emtvalencia.es/EmtEsquemas_graphics/line-icons/";
  busLines:any[];

  constructor( private toastController:ToastController, private router:Router, private map:MapService ) { 

    this.busLines = map.getBusLines();

  }

  async askOptions(bus:any) {
    const toast = await this.toastController.create({
      header: 'Select an option',
      // message: 'Click to Close',
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon: 'locate-outline',
          text: 'Track',
          handler: () => {
            this.router.navigateByUrl(`/map/bus/${ bus.linea }`);
          }
        }, {
          side: 'end',
          text: 'Routes',
          icon: 'map-outline',
          handler: () => {
            this.router.navigateByUrl(`/line-info/${ bus.linea }`);
          }
        }
      ]
    });
    toast.present();
  }

  ngOnInit() {
  }

}
