
'use strict';

const CsvWriter = require('./csv-writer');
const fs = require('fs');

class CsvWriterFactory {

    constructor(params) {
        this._csvConverterFactory = params.csvConverterFactory;
    }

    createArrayCsvWriter(params) {
        const csvConverter = this._csvConverterFactory.createArrayCsvConverter({
            header: params.header
        });
        return new CsvWriter({
            csvConverter,
            encoding: params.encoding,
            fs,
            path: params.path
        });
    }

    createObjectCsvWriter(params) {
        const csvConverter = this._csvConverterFactory.createObjectCsvConverter({
            header: params.header
        });
        return new CsvWriter({
            csvConverter,
            encoding: params.encoding,
            fs,
            path: params.path
        });
    }

}

module.exports = CsvWriterFactory;
