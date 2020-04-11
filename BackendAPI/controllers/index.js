const parser = require("xml2json");
const http = require("http");
const https = require("https");
const utmlatlng = require("utm-latlng");
const date = require("../modules/date");
const endpoints = require("../modules/endpoints");

const utm = new utmlatlng();

const getStopList = (req, res) => {

    console.log(date() + " [" + req.connection.remoteAddress + "] Getting stop list");

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    
    let con;
    const ep = endpoints.stopList();

    if (ep.isSecure){
        con = https;
    } else {
        con = http;
    }

    con.get(ep.endpoint, (resp) => {

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

};

const getStopInfo = (req, res) => {

    const id = req.params.stopId;

    console.log(date() + " [" + req.connection.remoteAddress + "] Getting data for stop " + id);

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    
    let con;
    const ep = endpoints.stopInfo(id);

    if (ep.isSecure){
        con = https;
    } else {
        con = http;
    }

    con.get(ep.endpoint, (resp) => {

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

};

const getLineInfo = (req, res) => {

    const id = req.params.lineId;

    console.log(date() + " [" + req.connection.remoteAddress + "] Getting data for line " + id);

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    
    let con;
    const ep = endpoints.lineInfo(id);

    if (ep.isSecure){
        con = https;
    } else {
        con = http;
    }

    con.get(ep.endpoint, (resp) => {
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

};

const getLinePosition = (req, res) => {

    const id = req.params.busLine;

    console.log(date() + " [" + req.connection.remoteAddress + "] Getting data for buses of line " + id);

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    
    let con;
    const ep = endpoints.linePosition(id);

    if (ep.isSecure){
        con = https;
    } else {
        con = http;
    }

    con.get(ep.endpoint, (resp) => {

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

};

module.exports = { getStopList, getStopInfo, getLineInfo, getLinePosition };