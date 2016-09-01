
'use strict';

const AbstractCsvWriter = require('./abstract-csv-writer');

class ArrayRecordWriter extends AbstractCsvWriter {

    _getRecordAsArray(record) {
        return record;
    }

}

module.exports = ArrayRecordWriter;
