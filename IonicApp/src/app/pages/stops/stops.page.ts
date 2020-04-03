import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stops',
  templateUrl: './stops.page.html',
  styleUrls: ['./stops.page.scss'],
})
export class StopsPage implements OnInit {

  busStops:any[] = [];
  found:any[] = [];
  
  empty:boolean = true;
  foundText:string = "Type a stop name or ID to search.";

  constructor( private map:MapService, private router:Router ) {

  }

  ngOnInit() {

    fetch('./assets/data/stops.json').then(res => res.json())
    .then(json => {
      this.busStops = json;
      // console.log(this.busStops)
    });

  }

  searchStops(event){
    const value = event.detail.value.toLowerCase();

    this.found = [];

    if (value.length !== 0){

      for (let b of this.busStops){
        if (b.stop_id.toString().startsWith(value) || b.stop_name.toLowerCase().includes(value)){
          this.found.push(b);
        }
      }

    }

    if (this.found.length === 0){

      if (value.length !== 0){
        this.foundText = "No results found.";
      } else {
        this.foundText = "Type a stop name or ID to search.";
      }

      this.empty = true;

    } else this.empty = false;

  }

  getStop(id:string){
    this.router.navigateByUrl(`/stop-info/${ id }`);
  }

}
