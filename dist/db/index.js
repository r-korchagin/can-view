// const dbm = require('./mongodb');

class Data {
    constructor() {
        this.parsedData = [];
        this.notFound = [];
        this.fileCount = 0;
        this.carName = 'Unknown Vehicle';
    }
    
    /**
     * @returns {String} carName
     */
    getCarName() {
        return new Promise(r => { r(this.carName); });
    }

    /**
     * @param {String} name 
     */
    setCarName(name){
        return new Promise(r => { this.carName = name; r('ok'); });
    }


    setParsedData(d) {
        console.log('set');
        return new Promise(r => { this.parsedData = d; r(); });
    }

    /**
     * 
     * @param {Array} d 
     */
    appendParsedData(d) {
        return new Promise(r => { this.parsedData = [...this.parsedData,...d]; r(this.parsedData.length); });
    }

    /**
     * 
     * @param {Array} d 
     */
    appendNotFound(d) { 
        return new Promise(r => { this.notFound = [...this.notFound,...d]; r(this.parsedData.length); });
    }

    getParsedNameList() {
        let list = this
            .parsedData
            .reduce((acc, val) => {
                acc[val.pgnName] = acc[val.pgnName] === undefined ? 1 : acc[val.pgnName] += 1;
                return acc;
            }, {});
        let pgnList = Object
            .keys(list)
            .map(key => {return {name:key, count:list[key]};} )
            .sort((a,b)=>b.count-a.count); 

        return new Promise(r => { r(pgnList); });
    }


    getParsedDataByPGN(pgnName, limit, offset) {
        return new Promise(r => { 
            if (pgnName == '') return r([]);
            r(
                this.parsedData
                .filter( (v)=>v.pgnName.indexOf(pgnName)>-1 )
                .sort( (a,b) =>  (a.pngIndx - b.pngIndx) )
                .slice(offset,offset+limit) 
            ); 
        });
    }

    clearParcedData() {
        return new Promise(r => { this.parsedData = []; r('ok'); });
    }

    setNotFound(d) {
        this.notFound = d;
    }

    getNotFound(){
        return this.notFound;
    }

    clearNotFound() {
        return new Promise(r => { this.notFound = []; r('ok'); });
    }

    setFileCount(n) {
        return new Promise(r => { this.fileCount +=n; r(); });
    }

    getFileCount() {
        return new Promise(r => r(this.fileCount));
    }

    clearFileCount() {
        return new Promise(r => { this.fileCount = 0; r('ok'); });
    }
}

const data = new Data();

/**
 * Mongo DB
 */
// module.exports = dbm;

/**
 * Local Memory
 */
 module.exports = data;