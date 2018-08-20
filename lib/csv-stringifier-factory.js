
'use strict';

const ArrayCsvStringifier = require('./csv-stringifiers/array');
const FieldStringifier = require('./field-stringifier');
const ObjectCsvStringifier = require('./csv-stringifiers/object');
const DEFAULT_FIELD_DELIMITER = ',';

class CsvStringifierFactory {

    createArrayCsvStringifier(params) {
        const fieldDelimiter = params.fieldDelimiter || DEFAULT_FIELD_DELIMITER;
        return new ArrayCsvStringifier({
            fieldStringifier: new FieldStringifier({fieldDelimiter}),
            fieldDelimiter,
            header: params.header
        });
    }

    createObjectCsvStringifier(params) {
        const fieldDelimiter = params.fieldDelimiter || DEFAULT_FIELD_DELIMITER;
        return new ObjectCsvStringifier({
            fieldStringifier: new FieldStringifier({fieldDelimiter}),
            fieldDelimiter,
            header: params.header
        });
    }

}

module.exports = CsvStringifierFactory;
