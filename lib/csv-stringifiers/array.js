
'use strict';

const AbstractCsvStringifier = require('./abstract');

class ArrayCsvStringifier extends AbstractCsvStringifier {

    constructor(params) {
        super({
            fieldStringifier: params.fieldStringifier,
            fieldDelimiter: params.fieldDelimiter
        });
        this._header = params.header;
    }

    _getHeaderRecord() {
        return this._header;
    }

    _getRecordAsArray(record) {
        return record;
    }

}

module.exports = ArrayCsvStringifier;
