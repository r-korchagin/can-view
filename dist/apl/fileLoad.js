const fs = require('fs');
const parser = require('./parser');

function load(fileName) {
    if (fileName == '') return console.log('Please set file');
    console.log('Open file', fileName);
    fs.readFile(fileName, 'utf8', function(err, contents) {
        if (err) return console.error(err);
        fs.readFile('apl/pgn/PGN_Data.json', 'utf8', function(err, pgnJson) {
            if (err) return console.error(err);
            parser(contents.split('\n'),JSON.parse(pgnJson), fileName);
        });
    });
}

module.exports = load;