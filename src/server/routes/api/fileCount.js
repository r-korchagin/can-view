const db = require('../../db');

const fileCount = function(req, res, next) {
    db.getFileCount()
    .then(n=>res.json({count:n}));
};


module.exports = fileCount;