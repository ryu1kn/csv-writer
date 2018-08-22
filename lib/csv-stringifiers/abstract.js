'use strict';

const RECORD_DELIMITER = '\n';

class AbstractCsvStringifier {

    constructor(params) {
        this._fieldStringifier = params.fieldStringifier;
        this._fieldDelimiter = params.fieldDelimiter;
    }

    getHeaderString() {
        const headerRecord = this._getHeaderRecord();
        return headerRecord ? this.stringifyRecords([headerRecord]) : null;
    }

    stringifyRecords(records) {
        const csvLines = Array.from(records, record => this._getCsvLine(this._getRecordAsArray(record)));
        return csvLines.join(RECORD_DELIMITER) + RECORD_DELIMITER;
    }

    /* istanbul ignore next */_getRecordAsArray(_record) {
        throw new Error('Must be overridden in subclasses');
    }

    /* istanbul ignore next */_getHeaderRecord() {
        throw new Error('Must be overridden in subclasses');
    }

    _getCsvLine(record) {
        return record
            .map(fieldValue => this._fieldStringifier.stringify(fieldValue))
            .join(this._fieldDelimiter);
    }

}

module.exports = AbstractCsvStringifier;
