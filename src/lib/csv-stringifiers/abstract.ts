import {FieldStringifier} from '../field-stringifier';
import {Field} from '../record';

const DEFAULT_RECORD_DELIMITER = '\n';
const VALID_RECORD_DELIMITERS = [DEFAULT_RECORD_DELIMITER, '\r\n'];

export abstract class CsvStringifier<T> {
    private readonly fieldStringifier: FieldStringifier;
    private readonly fieldDelimiter: string;
    private readonly recordDelimiter: string;

    constructor(fieldStringifier: FieldStringifier, recordDelimiter?: string) {
        this.fieldStringifier = fieldStringifier;
        this.fieldDelimiter = fieldStringifier.fieldDelimiter;
        this.recordDelimiter = recordDelimiter || DEFAULT_RECORD_DELIMITER;
        _validateRecordDelimiter(this.recordDelimiter);
    }

    getHeaderString(): string | null {
        const headerRecord = this.getHeaderRecord();
        return headerRecord ? this.stringifyRecords([headerRecord]) : null;
    }

    stringifyRecords(records: IterableIterator<T> | T[]): string {
        const csvLines = Array.from(records, record => this.getCsvLine(this.getRecordAsArray(record)));
        return csvLines.join(this.recordDelimiter) + this.recordDelimiter;
    }

    protected abstract getRecordAsArray(_record: T): Field[];

    protected abstract getHeaderRecord(): T | null | undefined;

    private getCsvLine(record: Field[]): string {
        return record
            .map(fieldValue => this.fieldStringifier.stringify(fieldValue))
            .join(this.fieldDelimiter);
    }
}

function _validateRecordDelimiter(delimiter: string): void {
    if (VALID_RECORD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error(`Invalid record delimiter \`${delimiter}\` is specified`);
    }
}
