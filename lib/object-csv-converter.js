
'use strict';

const FIELD_DELIMITER = ',';
const RECORD_DELIMITER = '\n';

class ObjectCsvConverter {

    constructor(params) {
        this._fieldStringifier = params.fieldStringifier;
        this._header = params.header;
    }

    getHeaderString() {
        const isHeaderAvailable = isObject(this._header && this._header[0]);
        return isHeaderAvailable ? this.convert([this._getHeaderRecord()]) : null;
    }

    _getHeaderRecord() {
        return this._header.reduce((memo, field) =>
            Object.assign({}, memo, {[field.id]: field.title}),
            {}
        );
    }

    convert(records) {
        const arrayRecords = records.map(this._getRecordAsArray, this);
        const csvLines = arrayRecords.map(record => this._getCsvLine(record));
        return csvLines.join(RECORD_DELIMITER) + RECORD_DELIMITER;
    }

    _getRecordAsArray(record) {
        return this._header.map(field => record[this._getFieldId(field)]);
    }

    _getFieldId(field) {
        return isObject(field) ? field.id : field;
    }

    _getCsvLine(record) {
        return record
            .map(fieldValue => this._fieldStringifier.stringify(fieldValue))
            .join(FIELD_DELIMITER);
    }

}

function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

module.exports = ObjectCsvConverter;
