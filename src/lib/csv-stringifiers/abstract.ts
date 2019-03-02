import {FieldStringifier} from '../field-stringifier';
import {Field} from '../record';

const RECORD_DELIMITER = '\n';

export abstract class AbstractCsvStringifier<T> {
    private _fieldStringifier: FieldStringifier;
    private _fieldDelimiter: string;

    constructor(fieldStringifier: FieldStringifier, fieldDelimiter: string) {
        this._fieldStringifier = fieldStringifier;
        this._fieldDelimiter = fieldDelimiter;
    }

    getHeaderString() {
        const headerRecord = this._getHeaderRecord();
        return headerRecord ? this.stringifyRecords([headerRecord]) : null;
    }

    stringifyRecords(records: IterableIterator<T> | T[]): string {
        const csvLines = Array.from(records, record => this._getCsvLine(this._getRecordAsArray(record)));
        return csvLines.join(RECORD_DELIMITER) + RECORD_DELIMITER;
    }

    abstract _getRecordAsArray(_record: T): Field[];

    abstract _getHeaderRecord(): T | null | undefined;

    _getCsvLine(record: Field[]): string {
        return record
            .map(fieldValue => this._fieldStringifier.stringify(fieldValue))
            .join(this._fieldDelimiter);
    }

}
