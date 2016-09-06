
'use strict';

const ArrayCsvConverter = require('./csv-converters/array');
const FieldStringifier = require('./field-stringifier');
const ObjectCsvConverter = require('./csv-converters/object');

class CsvConverterFactory {

    createArrayCsvConverter(params) {
        return new ArrayCsvConverter({
            fieldStringifier: new FieldStringifier(),
            header: params.header
        });
    }

    createObjectCsvConverter(params) {
        return new ObjectCsvConverter({
            fieldStringifier: new FieldStringifier(),
            header: params.header
        });
    }

}

module.exports = CsvConverterFactory;
