const db = require('../../db');

/*
let listExample = [
    {name:'Nominal Friction - Percent Torque',count:3},
    {name:'Engine Fuel Rate',count:3},
    {name:'Hydraulic Temperature',count:3},
    {name:'Net Battery Current',count:3},
    {name:'Pneumatic Supply Pressure',count:3},
    {name:'Washer Fluid Level',count:3},
    {name:'Engine Fuel Rate',count:3}
];*/

const pgnList = function(req, res, next) {
  db.getParsedNameList()
  .then( resList => res.json(resList) );
  };

module.exports = pgnList;