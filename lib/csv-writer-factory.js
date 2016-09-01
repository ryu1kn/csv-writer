
'use strict';

const ArrayRecordWriter = require('./array-record-writer');
const ObjectRecordWriter = require('./object-record-writer');
const FieldStringifier = require('./field-stringifier');
const fs = require('fs');

class CsvWriterFactory {

    createArrayRecordWriter(params) {
        const finalParams = Object.assign({}, params, {
            fs,
            fieldStringifier: new FieldStringifier()
        });
        return new ArrayRecordWriter(finalParams);
    }

    createObjectRecordWriter(params) {
        const finalParams = Object.assign({}, params, {
            fs,
            fieldStringifier: new FieldStringifier()
        });
        return new ObjectRecordWriter(finalParams);
    }

}

module.exports = CsvWriterFactory;
