import {FieldStringifier} from '../field-stringifier';
import {Field} from '../record';

const DEFAULT_RECORD_DELIMITER = '\n';
const VALID_RECORD_DELIMITERS = [DEFAULT_RECORD_DELIMITER, '\r\n'];

export abstract class CsvStringifier<T> {

    constructor(private readonly fieldStringifier: FieldStringifier,
                private readonly recordDelimiter = DEFAULT_RECORD_DELIMITER) {
        _validateRecordDelimiter(recordDelimiter);
    }

    getHeaderString(): string | null {
        const headerRecord = this.getHeaderRecord();
        return headerRecord ? this.joinRecords([this.getCsvLine(headerRecord)]) : null;
    }

    stringifyRecords(records: IterableIterator<T> | T[]): string {
        const csvLines = Array.from(records, record => this.getCsvLine(this.getRecordAsArray(record)));
        return this.joinRecords(csvLines);
    }

    protected abstract getRecordAsArray(_record: T): Field[];

    protected abstract getHeaderRecord(): string[] | null | undefined;

    private getCsvLine(record: Field[]): string {
        return record
            .map(fieldValue => this.fieldStringifier.stringify(fieldValue))
            .join(this.fieldStringifier.fieldDelimiter);
    }

    private joinRecords(records: string[]) {
        return records.join(this.recordDelimiter) + this.recordDelimiter;
    }
}

function _validateRecordDelimiter(delimiter: string): void {
    if (VALID_RECORD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error(`Invalid record delimiter \`${delimiter}\` is specified`);
    }
}
