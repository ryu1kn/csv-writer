
'use strict';

const FIELD_DELIMITER = ',';
const RECORD_DELIMITER = '\n';
const DEFAULT_ENCODING = 'utf8';

class AbstractCsvWriter {

    constructor(params) {
        this._fs = params.fs;
        this._path = params.path;
        this._encoding = params.encoding;
        this._fieldStringifier = params.fieldStringifier;

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
            encoding: this._encoding || DEFAULT_ENCODING,
            flag: this._firstWrite ? 'w' : 'a'
        };
    }

    _getWriteString(records) {
        const recordStrings = records.map(record => {
            const fields = this._getRecordAsArray(record);
            return this._getCsvLine(fields);
        });
        return recordStrings.join(RECORD_DELIMITER) + RECORD_DELIMITER;
    }

    _getRecordAsArray(_record) {
        throw new Error('Must be overriden');
    }

    _getCsvLine(fieldValues) {
        return fieldValues
            .map(value => this._fieldStringifier.stringify(value))
            .join(FIELD_DELIMITER);
    }

}

module.exports = AbstractCsvWriter;
