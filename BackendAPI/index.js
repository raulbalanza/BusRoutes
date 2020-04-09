/*
*   In this code, original endpoints have been replaced by a static
*   data sample, as the original APIs are not public.
*/

const express = require("express");
const parser = require("xml2json");
const utmlatlng = require("utm-latlng");
const http = require("http");
const https = require("https");

const app = express();
const utm = new utmlatlng();

function date(){

    let d = new Date();

    return "(" + parse(d.getDate()) + "/" + parse(d.getMonth()+1) + "/" + d.getFullYear() + " - " + 
        parse(d.getHours()) + ":" + parse(d.getMinutes()) + ":" + parse(d.getSeconds()) + ")";

}

function parse(number){

    return (number >= 10) ? number : "0" + number;

}

app.get("/stop_list", (req, res) => {

    console.log(date() + " [" + req.connection.remoteAddress + "] Getting stop list");

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    
    http.get(`http://mapas.valencia.es/lanzadera/opendata/Emt_paradas/JSON`, (resp) => {

        let data = "";

        // A chunk of data has been received
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received.
        resp.on('end', () => {
            data = JSON.parse(data);
            
            for (let dat of data.features){
  
                let newCoords = utm.convertUtmToLatLng(dat.geometry.coordinates[0], dat.geometry.coordinates[1], 30, "S");
                dat.geometry.coordinates = [newCoords.lng, newCoords.lat];
        
            }

            res.send(data);
        });

    });

});

app.get("/stop/:stopId", (req, res) => {

    const id = req.params.stopId;

    console.log(date() + " [" + req.connection.remoteAddress + "] Getting data for stop " + id);

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    
    https.get("https://theraulxp.es/busroutes/examples/stop_stopId.xml" /* Static info */, (resp) => {

        let data = '';

        // A chunk of data has been received
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received.
        resp.on('end', () => {
            try {
                data = parser.toJson(data);
            } catch (e) { console.log("Exception: " + e); }
            res.send(data);
        });

    });

});

app.get("/line/:lineId", (req, res) => {

    const id = req.params.lineId;

    console.log(date() + " [" + req.connection.remoteAddress + "] Getting data for line " + id);

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    
    https.get("https://theraulxp.es/busroutes/examples/line_lineId.xml" /* Static info */, (resp) => {
        let data = '';

        // A chunk of data has been received
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received.
        resp.on('end', () => {

            try {
                data = parser.toJson(data);
            } catch (e) { console.log("Exception: " + e); }

            res.send(data);
        });

    });

});

app.get("/bus/:busLine", (req, res) => {

    const id = req.params.busLine;

    console.log(date() + " [" + req.connection.remoteAddress + "] Getting data for buses of line " + id);

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    
    https.get("https://theraulxp.es/busroutes/examples/bus_busLine.json" /* Static info */, (resp) => {

        let data = '';
        let buses = "";
        let debug = "";
        let result = {
            "type": "FeatureCollection",
            "features": []
        };

        // A chunk of data has been received
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received.
        resp.on('end', () => {
            
            try {

                data = JSON.parse(data);
                buses = data.buses;
                debug = JSON.parse(data.debug).buses;

                for (let i=0; i<buses.length; i++){

                    result.features.push({

                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                buses[i].lon,
                                buses[i].lat
                            ]
                        },
                        "properties": {
                            "cod": debug[i].cod,
                            "num": buses[i].num,
                            "lin": buses[i].lin,
                            "tra": buses[i].tra,
                            "pUlt": buses[i].pUlt,
                            "pSig": buses[i].pSig,
                            "ts": buses[i].ts
                        }

                    });

                }

            } catch (e){ console.log("Exception: " + e); }

            res.send(result);
        });

    });

});

app.get('/', function (req, res) {
    res.send('You must call the API with the appropriate parameters.');
  });

app.listen(5001, () => {
    console.log(date() + " Server running on port 5001");
});