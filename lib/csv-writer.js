
'use strict';

const FIELD_DELIMITER = ',';
const RECORD_DELIMITER = '\n';
const ENCODING = 'utf8';

class CsvWriter {

    constructor(params) {
        this._fs = params.fs;
        this._path = params.path;
        this._fieldStringifier = params.fieldStringifier;
        this._header = params.header;

        this._shouldWriteHeader = isObject(params.header && params.header[0]);
        this._firstWrite = true;
    }

    writeRecords(records) {
        const option = this._getWriteOption();
        const writeString = this._getWriteString(records);
        return this._write(writeString, option)
            .then(() => { this._firstWrite = false; });
    }

    _write(string, options) {
        return new Promise((resolve, reject) => {
            this._fs.writeFile(this._path, string, options, err => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    _getWriteOption() {
        return {
            encoding: ENCODING,
            flag: this._firstWrite ? 'w' : 'a'
        };
    }

    _getWriteString(records) {
        const headerLine = (this._firstWrite && this._shouldWriteHeader) ? this._getHeaderString() : null;
        const dataLines = records.map(record => this._getRecordString(record));
        const lines = headerLine ? [headerLine].concat(dataLines) : dataLines;
        return lines.join(RECORD_DELIMITER) + RECORD_DELIMITER;
    }

    _getHeaderString() {
        const fieldValues = this._header.map(field => field.title);
        return this._getCsvLine(fieldValues);
    }

    _getRecordString(record) {
        const fieldValues = Array.isArray(record) ? record :
            this._header.map(field => record[this._getFieldId(field)]);
        return this._getCsvLine(fieldValues);
    }

    _getCsvLine(fieldValues) {
        return fieldValues
            .map(value => this._fieldStringifier.stringify(value))
            .join(FIELD_DELIMITER);
    }

    _getFieldId(field) {
        return isObject(field) ? field.id : field;
    }

}

function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

module.exports = CsvWriter;
