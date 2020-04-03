import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import * as utmlatlng from 'utm-latlng';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  API_BASEURL = environment.API_ENDPOINT;

  busLines = [
    { linea: 4, tr1: "PL. DE L'AJUNTAMENT", tr2: "NATZARET-PORT" },
    { linea: 5, tr1: "INTERIOR", tr2: "CIRCULAR" },
    { linea: 6, tr1: "TORREFIEL", tr2: "HOSPITAL LA FE" },
    { linea: 7, tr1: "MERCAT CENTRAL", tr2: "FONTETA ST. LLUIS" },
    { linea: 8, tr1: "PORTA DE LA MAR", tr2: "HOSPITAL LA FE" },
    { linea: 9, tr1: "LA TORRE", tr2: "ALBEREDA" },
    { linea: 10, tr1: "BENIMACLET", tr2: "SANT MARCEL.LI" },
    { linea: 11, tr1: "PATRAIX", tr2: "ORRIOLS" },
    { linea: 12, tr1: "PL. AMERICA", tr2: "CIUTAT ART. FALLER" },
    { linea: 13, tr1: "AV. OEST", tr2: "C.A.C.-LA FONTETA" },
    { linea: 14, tr1: "PL. DE L'AJUNTAMENT", tr2: "CASTELLAR/FORN D'ALCEDO/PINEDO" },
    { linea: 15, tr1: "PL. DE L'AJUNTAMENT", tr2: "PINEDO" },
    { linea: 16, tr1: "PL. DE L'AJUNTAMENT", tr2: "VINALESA" },
    { linea: 18, tr1: "HOSPITAL DR. PESET", tr2: "UNIVERSITATS" },
    { linea: 19, tr1: "PL. DE L'AJUNTAMENT", tr2: "LA MARINA/LA MALVA-ROSA" },
    { linea: 25, tr1: "VALENCIA", tr2: "EL PALMAR/EL PERELLO" },
    { linea: 26, tr1: "POETA QUEROL", tr2: "MONCADA-ALFARA" },
    { linea: 27, tr1: "LA TORRE", tr2: "MERCAT CENTRAL" },
    { linea: 28, tr1: "MERCAT CENTRAL", tr2: "CIUTAT ART. FALLER" },
    { linea: 30, tr1: "HOSPITAL CLINIC", tr2: "NATZARET" },
    { linea: 31, tr1: "POETA QUEROL", tr2: "LA MALVA-ROSA-LA PATACONA" },
    { linea: 32, tr1: "PL. DE L'AJUNTAMENT", tr2: "P. MARITIM" },
    { linea: 35, tr1: "PL. DE L'AJUNTAMENT", tr2: "C.A.C./I. CANARIES" },
    { linea: 40, tr1: "ESTACIO NORD", tr2: "UNIVERSITATS" },
    { linea: 60, tr1: "AV. OEST", tr2: "TORREFIEL" },
    { linea: 62, tr1: "PL. DE L'AJUNTAMENT", tr2: "BENIMAMET/FIRA" },
    { linea: 63, tr1: "CAMPUS BURJASSOT", tr2: "EST. NORD" },
    { linea: 64, tr1: "BENICALAP", tr2: "EST. J.SOROLLA/HOSPITAL LA FE" },
    { linea: 67, tr1: "PL. DE L'AJUNTAMENT", tr2: "NOU CAMPANAR" },
    { linea: 70, tr1: "LA FONTSANTA", tr2: "ALBORAIA" },
    { linea: 71, tr1: "LA LLUM", tr2: "UNIVERSITATS" },
    { linea: 72, tr1: "PL. DE L'AJUNTAMENT", tr2: "SANT ISIDRE" },
    { linea: 73, tr1: "SANT ISIDRE", tr2: "EST.NORD" },
    { linea: 79, tr1: "CIRCULAR", tr2: "GRANS VIES" },
    { linea: 80, tr1: "CIRCULAR", tr2: "GRANS VIES" },
    { linea: 81, tr1: "EST. NORD", tr2: "BLASCO IBAÑEZ" },
    { linea: 89, tr1: "CIRCULAR", tr2: "RONDA TRANSITS" },
    { linea: 90, tr1: "CIRCULAR", tr2: "RONDA TRANSITS" },
    { linea: 92, tr1: "LA MALVA-ROSA", tr2: "CAMPANAR" },
    { linea: 93, tr1: "AV. DEL CID", tr2: "PG. MARITIM" },
    { linea: 94, tr1: "CAMPANAR", tr2: "AV. FRANCIA" },
    { linea: 95, tr1: "PORT", tr2: "HOSPITAL GENERAL" },
    { linea: 98, tr1: "AV. DEL CID", tr2: "EST. DEL CABANYAL-PG. MARITIM" },
    { linea: 99, tr1: "LA MALVA-ROSA", tr2: "PALAU DE CONGRESSOS" },
    { linea: "C1", tr1: "CENTRE", tr2: "CIUTAT" },
    { linea: "N1", tr1: "PL. DE L'AJUNTAMENT", tr2: "BLASCO IBAÑEZ-LA MALVA-ROSA" },
    { linea: "N2", tr1: "PL. DE L'AJUNTAMENT", tr2: "PRIMAT REIG-TAVERNES BLANQUES" },
    { linea: "N3", tr1: "PL. DE L'AJUNTAMENT", tr2: "FERRAN EL CATOLIC-BENIMAMET" },
    { linea: "N4", tr1: "PL. DE L'AJUNTAMENT", tr2: "AV. DEL CID-MISLATA" },
    { linea: "N5", tr1: "PL. DE L'AJUNTAMENT", tr2: "SANT ISIDRE-LA FONTSANTA" },
    { linea: "N6", tr1: "PL. DE L'AJUNTAMENT", tr2: "JESUS-LA TORRE" },
    { linea: "N7", tr1: "PL. DE L'AJUNTAMENT", tr2: "MALILLA-F. DE SANT LLUIS" },
    { linea: "N8", tr1: "PL. DE L'AJUNTAMENT", tr2: "AV. DEL PORT-NATZARET" },
    { linea: "N9", tr1: "PL. DE L'AJUNTAMENT", tr2: "MONT-OLIVET-CABANYAL" },
    { linea: "N10", tr1: "PL. DE L'AJUNTAMENT", tr2: "CTAT.FALLERA-CAMI MONTCADA" },
    { linea: "N89", tr1: "CIRCULAR", tr2: "RONDA TRANSITS" },
    { linea: "N90", tr1: "CIRCULAR", tr2: "RONDA TRANSITS" }
  ];

  constructor( private http: HttpClient ) {

  }

  getStops(){
    
    return this.http.get("http://mapas.valencia.es/lanzadera/opendata/Emt_paradas/JSON");

  }

  getBusLines(){
    return this.busLines;
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
