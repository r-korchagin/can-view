var express = require('express');
var router = express.Router();
const pgnList = require('./pgnList');
const pgnClear = require('./pgnClear');
const fileCount = require('./fileCount');
const pgnLoad = require('./pgnLoad');
const upload = require('./fileUpload');
const multer = require('multer');
const uploadMulter = multer({ dest: './uploads/' });
const vehicleName = require('./vehicleName');


/* GET pgns. */
router.get('/pgnlist', pgnList);

/* GET clearData */
router.get('/pgnclear', pgnClear);

/* GET clearData */
router.get('/fileCount', fileCount);

/* GET VehicleName */
router.get('/vehicleName', vehicleName.getVehicleName);

/* GET PGN */
router.get('/loadpgn',pgnLoad);

/* POST Change vehicle name */
router.post('/changeName', vehicleName.changeVehicleName);

// POST /upload for single file upload
router.post('/upload', uploadMulter.single('file'), upload);


module.exports = router;