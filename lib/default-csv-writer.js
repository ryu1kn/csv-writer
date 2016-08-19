
'use strict';

const CsvWriter = require('./csv-writer');
const FieldStringifier = require('./field-stringifier');
const fs = require('fs');

class DefaultCsvWriter extends CsvWriter {

    constructor(params) {
        super(Object.assign({}, params, {
            fs,
            fieldStringifier: new FieldStringifier()
        }));
    }

}

module.exports = DefaultCsvWriter;
