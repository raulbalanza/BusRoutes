import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from 'src/app/services/map.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  lineImgBase = "http://www.emtvalencia.es/EmtEsquemas_graphics/line-icons/";
  
  map: mapboxgl.Map;
  stops:any;
  buses:any;
  source:any;
  
  type:string;
  id:string;

  bus:any;

  stopNumber:string;
  stopElem:any;

  constructor( private service:MapService, private router:Router, private route:ActivatedRoute ) {

    this.type = route.snapshot.paramMap.get("type");
    this.id = route.snapshot.paramMap.get("id");
    this.stopNumber = "None selected";

    this.bus = { tra: "Select a bus", cod: "-", pSig: "-" };

    if (this.type === "stops"){
  
      this.service.getStops().subscribe((data:any) => { 
        this.stops = data;
      });

    } else {

      this.service.getBusLocation(this.id).subscribe((data:any) => {
        this.buses = data;
      });

    }

  }

  ionViewDidEnter() {

    setTimeout(() => {
      
      this.map = this.service.initMap();

      this.map.on("load", () => {

        this.loadInfoMap();
  
      });

    }, 500);

  }

  loadInfoMap() {

    if (this.type === "stops"){

      this.map.addSource("stops", {

        type: "geojson",
        data: this.stops
  
      });
  
      this.map.addLayer({
  
          'id': 'point',
          'source': 'stops',
          'type': 'circle',
          'paint': {
          'circle-radius': 5,
          'circle-color': '#007cbf'
  
        }
      });

      this.map.on("click", "point", (e) => {

        this.stopElem = e;
        this.stopNumber = e.features[0].properties["id_parada"];
        // console.log(e.features[0].properties);
  
      });

    } else {

      this.map.loadImage("assets/lines/" + this.id + ".gif", (error, image) => {
        if (error) throw error;
        this.map.addImage("busIcon", image);
      });

      this.map.addSource("buses", {

        type: "geojson",
        data: this.buses
  
      });
  
      this.map.addLayer({
    
        "id": "paradas",
        "source": "buses",
        "type": "symbol",
        "layout": {
            "icon-image": "busIcon",
            "icon-size": 0.35,
            "icon-ignore-placement": true,
            "icon-allow-overlap": true,
            "icon-keep-upright": true
        }
    
      });

      this.map.on("click", "paradas", (e) => {

        this.bus = e.features[0].properties;

      });

    }

  }

  reloadInfo(){

    this.service.getBusLocation(this.id).subscribe((data:any) => {

      this.map.getSource("buses").setData(data);

    });

  }

  getStopDetails(){
    if (this.stopNumber !== "None selected") this.router.navigateByUrl(`/stop-info/${ this.stopNumber }`);
  }

  openInGMaps(){
    if (this.stopNumber === "None selected") return;
    const coords = this.stopElem.lngLat;
    window.open(`https://www.google.com/maps/search/?api=1&query=${ coords.lat },${ coords.lng }`);
  }

  ngOnInit() {
  }

}
