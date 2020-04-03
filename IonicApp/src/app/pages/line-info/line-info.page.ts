import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-line-info',
  templateUrl: './line-info.page.html',
  styleUrls: ['./line-info.page.scss'],
})
export class LineInfoPage implements OnInit {

  @ViewChild(IonList, null) lista:IonList;

  lineImgBase = "http://www.emtvalencia.es/EmtEsquemas_graphics/line-icons/";
  id:string;

  rutaIda:any[] = [];
  rutaVuelta:any[] = [];
  ruta = this.rutaIda;

  constructor( private map:MapService, private route:ActivatedRoute, private router:Router ) {

    this.id = route.snapshot.paramMap.get("id");
    this.map.getLineRoutes(this.id).subscribe((data:any) => {
      this.splitRoutes(data.linea.paradas.parada);
    });

  }

  loadList(event){

    if(event.detail.value === "ida"){
      this.ruta = this.rutaIda;
    } else {
      this.ruta = this.rutaVuelta;
    }

  }
  
  loadStop(id:string){
    this.lista.closeSlidingItems();
    this.router.navigateByUrl(`/stop-info/${ id }`);
  }

  splitRoutes(data:any){

    for (let p of data){

      let corresp = [];

      if (p.lineas_parada.linea_parada){
        corresp = p.lineas_parada.linea_parada;
        if (typeof corresp === "string"){ corresp = [corresp]; }
      }

      if (p.sentido_parada === "I"){
        
        this.rutaIda.push({
          id: p.id_parada,
          nombre: p.nombre_parada,
          activa: (p.activa === "S") ? true : false,
          desvio: (p.desvio === "S") ? true : false,
          corresp: corresp
        });

      } else {

        this.rutaVuelta.push({
          id: p.id_parada,
          nombre: p.nombre_parada,
          activa: (p.activa === "S") ? true : false,
          desvio: (p.desvio === "S") ? true : false,
          corresp: corresp
        });

      }

    }

    // console.log(this.rutaIda);
    // console.log(this.rutaVuelta);

  }

  ngOnInit() {
  }

}
