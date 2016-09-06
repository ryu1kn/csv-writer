
const CsvConverterFactory = require('./lib/csv-converter-factory');
const CsvWriterFactory = require('./lib/csv-writer-factory');

const csvConverterFactory = new CsvConverterFactory();
const csvWriterFactory = new CsvWriterFactory({csvConverterFactory});

module.exports = {

    createArrayCsvConverter: params =>
        csvConverterFactory.createArrayCsvConverter(params),

    createObjectCsvConverter: params =>
        csvConverterFactory.createObjectCsvConverter(params),

    createArrayCsvWriter: params =>
        csvWriterFactory.createArrayCsvWriter(params),

    createObjectCsvWriter: params =>
        csvWriterFactory.createObjectCsvWriter(params)

};
