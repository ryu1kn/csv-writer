
'use strict';

const AbstractCsvWriter = require('./abstract-csv-writer');

class ObjectRecordWriter extends AbstractCsvWriter {

    constructor(params) {
        super(params);
        this._header = params.header;
        this._shouldWriteHeader = isObject(params.header && params.header[0]);
    }

    writeRecords(records) {
        const headerRecord = this._getHeaderAsArray();
        const finalRecords = headerRecord ? [headerRecord].concat(records) : records;
        return super.writeRecords(finalRecords);
    }

    _getRecordAsArray(record) {
        return this._header.map(field => record[this._getFieldId(field)]);
    }

    _getHeaderAsArray() {
        if (this._firstWrite && this._shouldWriteHeader) {
            return this._header.reduce((memo, field) =>
                Object.assign({}, memo, {[field.id]: field.title}),
                {}
            );
        }
    }

    _getFieldId(field) {
        return isObject(field) ? field.id : field;
    }

}

function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

module.exports = ObjectRecordWriter;
