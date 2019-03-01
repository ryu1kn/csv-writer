import {CsvWriter} from './csv-writer';
import {CsvStringifierFactory} from './csv-stringifier-factory';

const fs = require('fs');

export class CsvWriterFactory {
    private _csvStringifierFactory: CsvStringifierFactory;

    constructor(params) {
        this._csvStringifierFactory = params.csvStringifierFactory;
    }

    createArrayCsvWriter(params) {
        const csvStringifier = this._csvStringifierFactory.createArrayCsvStringifier({
            header: params.header,
            fieldDelimiter: params.fieldDelimiter
        });
        return new CsvWriter({
            csvStringifier,
            encoding: params.encoding,
            fs,
            path: params.path,
            append: params.append
        });
    }

    createObjectCsvWriter(params) {
        const csvStringifier = this._csvStringifierFactory.createObjectCsvStringifier({
            header: params.header,
            fieldDelimiter: params.fieldDelimiter
        });
        return new CsvWriter({
            csvStringifier,
            encoding: params.encoding,
            fs,
            path: params.path,
            append: params.append
        });
    }

}
