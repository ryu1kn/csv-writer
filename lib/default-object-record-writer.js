
'use strict';

const ObjectRecordWriter = require('./object-record-writer');
const FieldStringifier = require('./field-stringifier');
const fs = require('fs');

class DefaultObjectRecordWriter extends ObjectRecordWriter {

    constructor(params) {
        super(Object.assign({}, params, {
            fs,
            fieldStringifier: new FieldStringifier()
        }));
    }

}

module.exports = DefaultObjectRecordWriter;
