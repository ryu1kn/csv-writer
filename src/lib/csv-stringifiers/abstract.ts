import {FieldStringifier} from '../field-stringifier';
import {Field} from '../record';

const RECORD_DELIMITER = '\n';

export abstract class CsvStringifier<T> {
    private readonly fieldStringifier: FieldStringifier;
    private readonly fieldDelimiter: string;

    constructor(fieldStringifier: FieldStringifier, fieldDelimiter: string) {
        this.fieldStringifier = fieldStringifier;
        this.fieldDelimiter = fieldDelimiter;
    }

    getHeaderString(): string | null {
        const headerRecord = this.getHeaderRecord();
        return headerRecord ? this.stringifyRecords([headerRecord]) : null;
    }

    stringifyRecords(records: IterableIterator<T> | T[]): string {
        const csvLines = Array.from(records, record => this.getCsvLine(this.getRecordAsArray(record)));
        return csvLines.join(RECORD_DELIMITER) + RECORD_DELIMITER;
    }

    protected abstract getRecordAsArray(_record: T): Field[];

    protected abstract getHeaderRecord(): T | null | undefined;

    private getCsvLine(record: Field[]): string {
        return record
            .map(fieldValue => this.fieldStringifier.stringify(fieldValue))
            .join(this.fieldDelimiter);
    }
}
