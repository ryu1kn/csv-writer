
'use strict';

const CsvWriter = require('./csv-writer');
const fs = require('fs');

class CsvWriterFactory {

    constructor(params) {
        this._csvStringifierFactory = params.csvStringifierFactory;
    }

    createArrayCsvWriter(params) {
        const csvStringifier = this._csvStringifierFactory.createArrayCsvStringifier({
            header: params.header
        });
        return new CsvWriter({
            csvStringifier,
            encoding: params.encoding,
            fs,
            path: params.path,
            append: params.append
        });
    }

    createObjectCsvWriter(params) {
        const csvStringifier = this._csvStringifierFactory.createObjectCsvStringifier({
            header: params.header
        });
        return new CsvWriter({
            csvStringifier,
            encoding: params.encoding,
            fs,
            path: params.path,
            append: params.append
        });
    }

}

module.exports = CsvWriterFactory;
