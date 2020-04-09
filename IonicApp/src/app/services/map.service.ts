import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import * as mapboxgl from 'mapbox-gl';
import * as utmlatlng from 'utm-latlng';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  API_BASEURL = environment.API_ENDPOINT;

  map: mapboxgl.Map;

  constructor( private http: HttpClient ) {

    mapboxgl.accessToken = "pk.eyJ1IjoidGhlcmF1bHhwIiwiYSI6ImNqeGRpbnZlYjAyMzUzcnMwYjRyamE5dDUifQ.xnO52vASfal6uD07AtnPkQ";

  }

  initMap(){

    if (this.map != undefined && this.map.loaded()){
      
      this.map.remove();

    }

    this.map = new mapboxgl.Map({

      container: 'map',
      center: [-0.3773900, 39.4697500],
      zoom: 13,
      style: 'mapbox://styles/mapbox/streets-v11' 

    });
    
    return this.map;

  }

  getStops(){
    
    return this.http.get(`${ this.API_BASEURL }/stop_list`);

  }

  getSchedule(id:string){

    return this.http.get(`${ this.API_BASEURL }/stop/${ id }`);

  }

  getLineRoutes(id:string){

    return this.http.get(`${ this.API_BASEURL }/line/${ id }`);

  }

  getBusLocation(id:string){

    return this.http.get(`${ this.API_BASEURL }/bus/${ id }`);

  }

}
