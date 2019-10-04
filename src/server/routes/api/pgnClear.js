const db = require('../../db');

const pgnClear = function(req, res, next) {
   db.clearParcedData()
      .then( db.clearNotFound() )
      .then( db.clearFileCount() )
      .then( res.send('ok') );
};

module.exports = pgnClear;