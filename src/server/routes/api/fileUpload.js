const fileParser = require('../../apl/fileLoad');
const db = require('../../db');

const upload = function(req, res, next) {
    if (req.file) {
        var filename = req.file.originalname;
        console.log('Uploading file...', filename);
    } else {
        console.log('No File Uploaded');
        // var filename = 'FILE NOT UPLOADED';
    }

    /* ===== Add the function to save filename to database ===== */
    let tmp_path = req.file.path;
    
    fileParser(tmp_path);
    db.setFileCount(1).then(
      res.send('Ok')
    );

    /** A better way to copy the uploaded file. **/
    /** The original name of the uploaded file
      stored in the variable "originalname". **/
    /*  var target_path = 'uploads/' + req.file.originalname;
        var tmp_path = req.file.path;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', function() { res.render('complete'); });
        src.on('error', function(err) { res.render('error'); });
    */
    
  };

module.exports = upload;