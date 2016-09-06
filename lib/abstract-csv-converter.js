
'use strict';

const FIELD_DELIMITER = ',';
const RECORD_DELIMITER = '\n';

class AbstractCsvConverter {

    constructor(params) {
        this._fieldStringifier = params.fieldStringifier;
    }

    getHeaderString() {
        const headerRecord = this._getHeaderRecord();
        return headerRecord ? this.convert([headerRecord]) : null;
    }

    convert(records) {
        const csvLines = records
            .map(record => this._getRecordAsArray(record))
            .map(record => this._getCsvLine(record));
        return csvLines.join(RECORD_DELIMITER) + RECORD_DELIMITER;
    }

    _getRecordAsArray(_record) {
        throw new Error('Must be overridden in subclasses');
    }

    _getHeaderRecord() {
        throw new Error('Must be overridden in subclasses');
    }

    _getCsvLine(record) {
        return record
            .map(fieldValue => this._fieldStringifier.stringify(fieldValue))
            .join(FIELD_DELIMITER);
    }

}

module.exports = AbstractCsvConverter;
