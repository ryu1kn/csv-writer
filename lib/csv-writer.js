
'use strict';

const DEFAULT_ENCODING = 'utf8';

class CsvWriter {

    constructor(params) {
        this._fs = params.fs;
        this._path = params.path;
        this._encoding = params.encoding;
        this._csvStringifier = params.csvStringifier;

        this._firstWrite = true;
    }

    writeRecords(records) {
        const headerString = this._firstWrite && this._csvStringifier.getHeaderString();
        const recordsString = this._csvStringifier.stringifyRecords(records);
        const writeString = (headerString || '') + recordsString;
        const option = this._getWriteOption();
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
            encoding: this._encoding || DEFAULT_ENCODING,
            flag: this._firstWrite ? 'w' : 'a'
        };
    }

}

module.exports = CsvWriter;
