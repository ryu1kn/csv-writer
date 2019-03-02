import {CsvWriter} from './csv-writer';
import {CsvStringifierFactory} from './csv-stringifier-factory';

const fs = require('fs');

export interface ArrayCsvWriterParams {
    path: string;
    header: [];
    fieldDelimiter?: string;
    encoding?: string;
    append?: boolean;
}

export interface ObjectCsvWriterParams {
    path: string;
    header: [];
    fieldDelimiter?: string;
    encoding?: string;
    append?: boolean;
}

export class CsvWriterFactory {
    private readonly _csvStringifierFactory: CsvStringifierFactory;

    constructor(csvStringifierFactory: CsvStringifierFactory) {
        this._csvStringifierFactory = csvStringifierFactory;
    }

    createArrayCsvWriter(params: ArrayCsvWriterParams) {
        const csvStringifier = this._csvStringifierFactory.createArrayCsvStringifier({
            header: params.header,
            fieldDelimiter: params.fieldDelimiter
        });
        return new CsvWriter(csvStringifier, params.path, fs, params.encoding, params.append);
    }

    createObjectCsvWriter(params: ObjectCsvWriterParams) {
        const csvStringifier = this._csvStringifierFactory.createObjectCsvStringifier({
            header: params.header,
            fieldDelimiter: params.fieldDelimiter
        });
        return new CsvWriter(csvStringifier, params.path, fs, params.encoding, params.append);
    }

}
