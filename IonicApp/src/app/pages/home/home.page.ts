import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( public fav:FavoritesService, private router:Router ) { 

  }

  removeFavStop(stop:any){

    this.fav.removeFavStop(stop.id);

  }

  stopInfo(stop:any){

    const id = stop.id;
    this.router.navigateByUrl(`/stop-info/${ id }`);

  }

  ngOnInit() {
  }

}
