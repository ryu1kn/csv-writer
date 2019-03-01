import {CsvStringifierFactory} from './lib/csv-stringifier-factory';
import {CsvWriterFactory} from './lib/csv-writer-factory';

const csvStringifierFactory = new CsvStringifierFactory();
const csvWriterFactory = new CsvWriterFactory({csvStringifierFactory});

export const createArrayCsvStringifier = params =>
        csvStringifierFactory.createArrayCsvStringifier(params);

export const createObjectCsvStringifier = params =>
        csvStringifierFactory.createObjectCsvStringifier(params);

export const createArrayCsvWriter = params =>
        csvWriterFactory.createArrayCsvWriter(params);

export const createObjectCsvWriter = params =>
        csvWriterFactory.createObjectCsvWriter(params);
