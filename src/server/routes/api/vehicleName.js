const db = require('../../db');

const getVehicleName = function(req, res, next) {
    db.getCarName()
        .then( carName => res.json({name:carName}));
};

const changeVehicleName = function (req,res,next) {
    if (req.body.name) 
        db.setCarName(req.body.name)
            .then(answer => res.send(answer));
};

module.exports.getVehicleName = getVehicleName;
module.exports.changeVehicleName = changeVehicleName;