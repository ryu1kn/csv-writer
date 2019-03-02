import {
    ArrayCsvStringifierParams,
    CsvStringifierFactory,
    ObjectCsvStringifierParams
} from './lib/csv-stringifier-factory';
import {ArrayCsvWriterParams, CsvWriterFactory, ObjectCsvWriterParams} from './lib/csv-writer-factory';

const csvStringifierFactory = new CsvStringifierFactory();
const csvWriterFactory = new CsvWriterFactory(csvStringifierFactory);

export const createArrayCsvStringifier = (params: ArrayCsvStringifierParams) =>
        csvStringifierFactory.createArrayCsvStringifier(params);

export const createObjectCsvStringifier = (params: ObjectCsvStringifierParams) =>
        csvStringifierFactory.createObjectCsvStringifier(params);

export const createArrayCsvWriter = (params: ArrayCsvWriterParams) =>
        csvWriterFactory.createArrayCsvWriter(params);

export const createObjectCsvWriter = (params: ObjectCsvWriterParams) =>
        csvWriterFactory.createObjectCsvWriter(params);
