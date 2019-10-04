  node_xj = require("xls-to-json");
  const process = require('process');
  const fs = require('fs');


/**
 * 
 * @param {String} reolution 
 */
function getResolution(resolution) {
  if (resolution.indexOf('states') > -1) return 1;
  let result = NaN, inputString = resolution.split(' ')[0];
  if (resolution.indexOf('.')>-1) result = parseFloat( inputString ).toFixed(6);
  else if (inputString.indexOf('/') > -1) {
      let f = parseInt( resolution.split('/')[0] );
      let s = parseInt( resolution.split('/')[1] );
      if (isNaN(s)) result = resolution.split('/')[0];
      else result = f/s;
      return result;
  }
  else result = parseInt( inputString );
  if (isNaN(result)){ 
      console.error('Incorrect resolution',resolution);
      return 1;
  }
  return result;
}

function fromJsonToData(sourceJsonFileName) {
      fs.readFile(sourceJsonFileName, 'utf8', function(err, contents) {
        if (err) return console.error(err);
        let jsonFile = JSON.parse(contents);
        let jsonData = {};
        jsonFile.forEach(el => {
            let pgn = el.PGN || 99999;
            let spn = el.SPN || 0;
            if (jsonData[pgn] === undefined){
                jsonData[pgn] = {};
                jsonData[pgn][spn]= {};
                jsonData[pgn][spn].pos = el.pos;
                jsonData[pgn][spn].Name = el.Name;
                jsonData[pgn][spn].SPN_length = el['SPN length'];
                jsonData[pgn][spn].PGN_Length = el['PGN Length'];
                jsonData[pgn][spn].Offset = el.Offset;
                jsonData[pgn][spn].Units = el.Units;
                jsonData[pgn][spn].Resolution = getResolution(el.Resolution);
                jsonData[pgn][spn].Data_Range = el['Data Range'];
            }
        });
        fs.writeFile('PGN_Data.json', 
        JSON.stringify(jsonData), (err) => {if (err) throw err;} );
        console.log('Converted !');
    });
}

function execute() {
    let sourceFileName = process.argv[2] || '';
    let destinationFileName = process.argv[3] || '';
    if (sourceFileName == '') 
      return console.log('Please set source file Example[ node convert.js source.xml destination.json ]');
    if (destinationFileName == '') 
      return console.log('Please set destination file Example[ node convert.js source.xml destination.json ]');
    
      console.log('Open source file', process.argv[2]);

      node_xj({
        input: sourceFileName ,  // input xls "PGN/sae_j_1939.xls"
        output: destinationFileName, // output json "j_1939.json"
        sheet: "Sheet1",  // specific sheetname
        rowsToSkip: 0 // number of rows to skip at the top of the sheet; defaults to 0
      }, function(err, result) {
        if(err) {
          console.error(err);
        } else {
          console.log(result);
        }
      });
    
}

execute();