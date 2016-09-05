
'use strict';

const FIELD_DELIMITER = ',';
const RECORD_DELIMITER = '\n';

class ArrayCsvConverter {

    constructor(params) {
        this._fieldStringifier = params.fieldStringifier;
        this._header = params.header;
    }

    getHeaderString() {
        return this._header ? this.convert([this._header]) : null;
    }

    convert(records) {
        const csvLines = records.map(record => this._getCsvLine(record));
        return csvLines.join(RECORD_DELIMITER) + RECORD_DELIMITER;
    }

    _getCsvLine(record) {
        return record
            .map(fieldValue => this._fieldStringifier.stringify(fieldValue))
            .join(FIELD_DELIMITER);
    }

}

module.exports = ArrayCsvConverter;
