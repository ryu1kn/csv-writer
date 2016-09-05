
'use strict';

const AbstractCsvWriter = require('./abstract-csv-writer');
const ObjectCsvConverter = require('./object-csv-converter');

class ObjectRecordWriter extends AbstractCsvWriter {

    constructor(params) {
        const objectCsvConverter = new ObjectCsvConverter({
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

module.exports = ObjectRecordWriter;
