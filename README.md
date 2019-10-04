# CANView

Parse and view CAN messages according J1939

<img src="https://raw.githubusercontent.com/r-korchagin/can-view/master/face.PNG" width="800" alt="" />

## Install

This server requires [Node.js](http://nodejs.org/) 8.0 or higher.
To install, execute:
* `git clone https://github.com/r-korchagin/can-view.git`
* `cd can-view/dist`
* `npm install`
* `npm start`
* Open http://localhost:3000/

To use with MongoDB, change file /dist/db/index.js. 
Add const dbm = require('./mongodb'), change module.export and set dbLink in mongodb.js

## Use

Open folder, select *.trc files and click on PGN at left side of window.
