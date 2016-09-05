
'use strict';

const AbstractCsvWriter = require('./abstract-csv-writer');
const ArrayCsvConverter = require('./array-csv-converter');

class ArrayRecordWriter extends AbstractCsvWriter {

    constructor(params) {
        const objectCsvConverter = new ArrayCsvConverter({
            fieldStringifier: params.fieldStringifier,
            header: params.header
        });
        super({
            fs: params.fs,
            path: params.path,
            encoding: params.encoding,
            csvConverter: objectCsvConverter
        });
    }

}

module.exports = ArrayRecordWriter;
