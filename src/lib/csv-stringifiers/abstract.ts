import {FieldStringifier} from '../field-stringifier';
import {Field} from '../record';

export abstract class CsvStringifier<T> {
    private readonly fieldStringifier: FieldStringifier;
    private readonly fieldDelimiter: string;
    private readonly recordDelimiter: string;

    constructor(fieldStringifier: FieldStringifier, fieldDelimiter: string, recordDelimiter: string) {
        this.fieldStringifier = fieldStringifier;
        this.fieldDelimiter = fieldDelimiter;
        this.recordDelimiter = recordDelimiter;
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
