import {CsvWriter} from './csv-writer';
import {CsvStringifierFactory} from './csv-stringifier-factory';
import {ObjectStringifierHeader} from './record';
import * as fs from 'fs';

export interface ArrayCsvWriterParams {
    path: string;
    header?: string[];
    fieldDelimiter?: string;
    encoding?: string;
    append?: boolean;
}

export interface ObjectCsvWriterParams {
    path: string;
    header: ObjectStringifierHeader;
    fieldDelimiter?: string;
    encoding?: string;
    append?: boolean;
}

export class CsvWriterFactory {
    private readonly csvStringifierFactory: CsvStringifierFactory;

    constructor(csvStringifierFactory: CsvStringifierFactory) {
        this.csvStringifierFactory = csvStringifierFactory;
    }

    createArrayCsvWriter(params: ArrayCsvWriterParams) {
        const csvStringifier = this.csvStringifierFactory.createArrayCsvStringifier({
            header: params.header,
            fieldDelimiter: params.fieldDelimiter
        });
        return new CsvWriter(csvStringifier, params.path, fs, params.encoding, params.append);
    }

    createObjectCsvWriter(params: ObjectCsvWriterParams) {
        const csvStringifier = this.csvStringifierFactory.createObjectCsvStringifier({
            header: params.header,
            fieldDelimiter: params.fieldDelimiter
        });
        return new CsvWriter(csvStringifier, params.path, fs, params.encoding, params.append);
    }
}
