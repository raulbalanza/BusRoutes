/*
*   In this code, original endpoints have been replaced by a static
*   data sample, as the original APIs are not public.
*/

const express = require("express");
const parser = require("xml2json");
const http = require("https");
const app = express();

app.get("/stop/:stopId", (req, res) => {

    const id = req.params.stopId;

    console.log(new Date().toString() + " Getting data for stop " + id);

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    
    http.get("https://theraulxp.es/busroutes/examples/stop_stopId.xml" /* Static info */, (resp) => {

        let data = '';
        let result = "";

        // A chunk of data has been received
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received.
        resp.on('end', () => {
            try {
                result = parser.toJson(data);
            } catch (e) { console.log("Exception: " + e); }
            res.send(result);
        });

    });

});

app.get("/line/:lineId", (req, res) => {

    const id = req.params.lineId;

    console.log(new Date().toString() + " Getting data for line " + id);

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    
    http.get("https://theraulxp.es/busroutes/examples/line_lineId.xml" /* Static info */, (resp) => {
        let data = '';
        let result = "";

        // A chunk of data has been received
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received.
        resp.on('end', () => {

            try {
                result = parser.toJson(data);
            } catch (e) { console.log("Exception: " + e); }

            res.send(result);
        });

    });

});

app.get("/bus/:busLine", (req, res) => {

    const id = req.params.busLine;

    console.log(new Date().toString() + " Getting data for buses of line " + id);

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    
    http.get("https://theraulxp.es/busroutes/examples/bus_busLine.json" /* Static info */, (resp) => {

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
    console.log("Server running in port 5001");
});