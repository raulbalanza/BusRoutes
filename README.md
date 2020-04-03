# BusRoutes
Mobile application to get information about public transport in Valencia (Spain), created using Ionic. The app is capable of getting real time positions and scheduling for buses and bus stops.

It is made by two components:
- A *frontend* component (the **mobile application** itself), coded using Ionic (Angular-based)
- A *backend* component (an **API**, that gets information and parses it appropriately), coded using Node

[ [Screenshot gallery](https://theraulxp.es/busroutes/) ]

![Bus Routes](https://theraulxp.es/legacy/app_landing.png)

## About the backend API

Some of the endpoints used to develop this application are not public, so they have been removed from the version that can be found on this repository. Instead, they have been replaced by a sample static response from my private server. The application will return the same information for any query unless actual endpoints are set in the ```BackendAPI/index.js``` file.

## Installation

To get this application up and running, the next steps must be followed:

1. Clone the repository ( ```git clone https://github.com/raulbalanza/BusRoutes.git``` )
2. Open both the **IonicApp** and the **BackendAPI** folders, and install Node modules ( ```npm install``` )
3. **Backend**: Setup the backend in your server, using correct endpoints* in the ```index.js``` file and execute it ( ```node index.js``` )
4. **Application**: Navigate to the *IonicAPP/src/environments* folder, and set the ```API_ENDPOINT``` address to your server's address. Then, compile the application:
   1. Android: ```ionic cordova build android --prod```
   2. iOS *(not tested)*: ```ionic cordova build ios --prod```
5. Install the application in your mobile device.

**NOTE:** If the application cannot connect to the Internet in Android, you will need to modify the ```IonicApp/resources/android/xml/network_security_config.xml``` file, add your domain according to [this documentation page](https://developer.android.com/training/articles/security-config), and compile it again.

## Data sources

Some of the information about bus stops and locations used in this project has been extracted from the public [open data website](https://datos.gob.es/) of the Spanish Government, specifically the following datasets:

- [Bus stop locations](https://datos.gob.es/es/catalogo/l01462508-paradas-emt)
- [Bus stop names](https://datos.gob.es/es/catalogo/l01462508-google-transit-lineas-paradas-horarios-de-autobuses-de-la-emt-de-valencia)
