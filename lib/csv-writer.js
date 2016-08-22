
'use strict';

const DELIMITER = ',';
const NEW_LINE = '\n';

class CsvWriter {

    constructor(params) {
        this._fs = params.fs;
        this._path = params.path;
        this._fieldStringifier = params.fieldStringifier;
        this._header = params.header;

        this._shouldWriteHeader = isObject(params.header && params.header[0]);
        this._firstWrite = true;
    }

    writeRecord(params) {
        const option = this._getWriteOption(this._firstWrite);
        const writeString = [
            (this._firstWrite && this._shouldWriteHeader) ? this._getHeaderString() : '',
            this._getRowString(params)
        ].join('');
        return this._write(writeString, option).then(() => {
            this._firstWrite = false;
        });
    }

    // TODO: Refactoring with `write`
    writeRecords(records) {
        const option = this._getWriteOption(this._firstWrite);
        const writeString = [
            (this._firstWrite && this._shouldWriteHeader) ? this._getHeaderString() : '',
            records.map(record => this._getRowString(record)).join('')
        ].join('');
        return this._write(writeString, option).then(() => {
            this._firstWrite = false;
        });
    }

    writeHeader() {
        return this._write(this._getHeaderString(), {encoding: 'utf8'})
            .then(() => { this._shouldWriteHeader = true; });
    }

    _write(string, options) {
        return new Promise((resolve, reject) => {
            this._fs.writeFile(this._path, string, options, err => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    _getWriteOption(firstWrite) {
        const flagOption = !firstWrite ? {flag: 'a'} : null;
        return Object.assign({encoding: 'utf8'}, flagOption);
    }

    _getHeaderString() {
        return this._header.map(
            field => this._fieldStringifier.stringify(field.title)
        ).join(DELIMITER) + NEW_LINE;
    }

    _getRowString(params) {
        return this._header.map(
            field => this._fieldStringifier.stringify(params[this._getFieldId(field)])
        ).join(DELIMITER) + NEW_LINE;
    }

    _getFieldId(field) {
        return isObject(field) ? field.id : field;
    }

}

function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

module.exports = CsvWriter;
