/*
*   In this code, original endpoints have been replaced by a static
*   data sample, as the original APIs are not public.
*
*   isSecure: true if "https" link; otherwise false
*   endpoint: URL of the corresponding API endpoint
*
*/

const stopList = () => {

    return { "isSecure": false, "endpoint": "http://mapas.valencia.es/lanzadera/opendata/Emt_paradas/JSON" };

}

const stopInfo = (id) => {

    return { "isSecure": true, "endpoint": "https://theraulxp.es/busroutes/examples/stop_stopId.xml" /* Static info */ };

}

const lineInfo = (id) => {

    return { "isSecure": true, "endpoint": "https://theraulxp.es/busroutes/examples/line_lineId.xml" /* Static info */ };

}

const linePosition = (id) => {

    return { "isSecure": true, "endpoint": "https://theraulxp.es/busroutes/examples/bus_busLine.json" /* Static info */ };

}

module.exports = { stopList, stopInfo, lineInfo, linePosition };