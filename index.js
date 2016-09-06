
const CsvStringifierFactory = require('./lib/csv-stringifier-factory');
const CsvWriterFactory = require('./lib/csv-writer-factory');

const csvStringifierFactory = new CsvStringifierFactory();
const csvWriterFactory = new CsvWriterFactory({csvStringifierFactory});

module.exports = {

    createArrayCsvStringifier: params =>
        csvStringifierFactory.createArrayCsvStringifier(params),

    createObjectCsvStringifier: params =>
        csvStringifierFactory.createObjectCsvStringifier(params),

    createArrayCsvWriter: params =>
        csvWriterFactory.createArrayCsvWriter(params),

    createObjectCsvWriter: params =>
        csvWriterFactory.createObjectCsvWriter(params)

};
