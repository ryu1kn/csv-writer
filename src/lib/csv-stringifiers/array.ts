import {AbstractCsvStringifier} from './abstract';
import {FieldStringifier} from '../field-stringifier';
import {Field} from '../record';

export class ArrayCsvStringifier extends AbstractCsvStringifier<Field[]> {
    private _header?: string[];

    constructor(fieldStringifier: FieldStringifier, fieldDelimiter: string, header?: string[]) {
        super(fieldStringifier, fieldDelimiter);
        this._header = header;
    }

    _getHeaderRecord() {
        return this._header;
    }

    _getRecordAsArray(record: Field[]): Field[] {
        return record;
    }
}
