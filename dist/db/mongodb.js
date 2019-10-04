const mongoose = require('mongoose');
const dbLink = 'mongodb://localhost:27017/canview';


mongoose.connect(dbLink, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection to %s is done',dbLink);
});

const parsedSchema = new mongoose.Schema({
  userid:Number,
  idStr:Number,
  time:String,
  pgnName:String,
  pgnData:Number,
  pgnUnit:String,
  pngIndx:Number,
});

const notFoundSchema = new mongoose.Schema({
  userid:Number,
  idStr:Number,
  time:String,
  pgnName:String,
  pgnData:String,
  pgnUnit:String,
  pngIndx:Number,
});

const carPropSchema = new mongoose.Schema({
  userid:Number,
  fileCount:Number,
  carName:String
});

const parsed = mongoose.model('Parsed', parsedSchema);
const notfound = mongoose.model('NotFound', notFoundSchema);
const carProp = mongoose.model('CarProp', carPropSchema);
const userId = 1;

class Data {
  constructor() {
  }
  
  /**
   * @returns {String} carName
   */
  getCarName() {
    return carProp
      .findOne( {userid : userId })
      .exec()
      .then(d=>d.carName===undefined? 'Unknown Vehicle': d.carName);
  }

  /**
   * @param {String} name 
   */
  setCarName(name){
      return carProp
      .update( {userid : userId }, {carName : name}, {upsert : true})
      .exec()
      .then('ok');
  }


  /**
   * 
   * @param {Array} d 
   */
  setParsedData(d) {
    let data = d.map(el => {el.userid = userId; return el;});
    return parsed.create(data);
  }

  /**
   * 
   * @param {Array} d 
   */
  appendParsedData(d) {
    let data = d.map(el => {el.userid = userId; return el;});
    return parsed.create(data);
  }

  /**
   * 
   * @param {Array} d 
   */
  appendNotFound(d) {
    let data = d.map(el => {el.userid = userId; return el;});
    return notfound.create(data); 
  }

  /**
   * @returns {Array}
   */
  getParsedNameList() {
    return parsed.aggregate([
      {
          $match: {
            userid:userId
          }
      },
      { $unwind: "$pgnName" },
      {
          $group: {
              _id: '$pgnName',
              count: { $sum: 1 }
          }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1
        }
      },
      { $sort : { count : -1} },
      { $limit : 100 }
  ])
  .exec();
  /* Alternative:
   return parsed
      .find({userid:userId})
      .exec()
      .then(
        list => {
          return list.reduce((acc, val) => {
            acc[val.pgnName] = acc[val.pgnName] === undefined ? 1 : acc[val.pgnName] += 1;
            return acc;
            }, {});
      }).then(
        list => {
         return Object
        .keys(list)
        .map(key => {return {name:key, count:list[key]};} )
        .sort((a,b)=>b.count-a.count);
        }); */
  }

/**
 * 
 * @param {String} pgnName 
 * @param {Number} limit 
 * @param {Number} offset 
 */
  getParsedDataByPGN(pgnName,limit,offset) {
    return parsed
      .find({userid : userId, pgnName : pgnName})
      .sort({pngIndx: -1})
      .limit(limit)
      .skip(offset)
      .exec();
  }

  clearParcedData() {
    return parsed.remove({userid : userId}).exec();
  }
/*
  getNotFound(){
      return this.notFound;
  }
*/
  clearNotFound() {
    return notfound.remove({userid : userId}).exec();
  }

  /**
   * 
   * @param {Number} n 
   */
  setFileCount(n) {
    return carProp
      .findOne( {userid : userId })
      .exec()
      .then( d=> { d.fileCount = isNaN(d.fileCount)? n : d.fileCount + n; return d; } )
      .then( d=> carProp.update({userid : userId}, d, {upsert : true}).exec() );
  }

  /**
   * @returns {Number}
   */
  getFileCount() {
    return carProp
      .findOne( {userid : userId })
      .exec()
      .then(d=> isNaN(d.fileCount)? 0 : d.fileCount);
  }


  clearFileCount() {
    return carProp
      .find( {userid : userId })
      .exec()
      .then( d=> { d.fileCount = 0; return d; } )
      .then( d=> carProp.update({userid : userId},d).exec() );
  }
}

const da = new Data();

module.exports = da;