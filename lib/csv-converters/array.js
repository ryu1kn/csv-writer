
'use strict';

const AbstractCsvConverter = require('./abstract');

class ArrayCsvConverter extends AbstractCsvConverter {

    constructor(params) {
        super({fieldStringifier: params.fieldStringifier});
        this._header = params.header;
    }

    _getHeaderRecord() {
        return this._header;
    }

    _getRecordAsArray(record) {
        return record;
    }

}

module.exports = ArrayCsvConverter;
