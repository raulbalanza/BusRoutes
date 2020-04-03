import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  public favStops:any[] = [];

  constructor() {

    this.load();

  }

  addFavStop(stopId:string, name:string){

    this.favStops.push({

      "id": stopId,
      "name": name

    });

    this.save();

  }

  removeFavStop(id:string){

    let pos = -1;

    for (let i=0; i<this.favStops.length; i++){
      if (this.favStops[i].id == id){
        pos = i;
        break;
      }
    }

    if (pos != -1){ this.favStops.splice(pos, 1); }
    else console.error("Cannot delete favorite, it was not found.");

    this.save();

  }

  save(){

    localStorage.setItem("favStops", JSON.stringify(this.favStops));

  }

  load(){

    if (localStorage.getItem("favStops") != null)
      this.favStops = JSON.parse(localStorage.getItem("favStops"));

  }

}
