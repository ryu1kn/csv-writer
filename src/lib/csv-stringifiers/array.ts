import {CsvStringifier} from './abstract';
import {FieldStringifier} from '../field-stringifier';
import {Field} from '../record';

export class ArrayCsvStringifier extends CsvStringifier<Field[]> {

    constructor(fieldStringifier: FieldStringifier,
                recordDelimiter?: string,
                private readonly header?: string[]) {
        super(fieldStringifier, recordDelimiter);
    }

    protected getHeaderRecord() {
        return this.header;
    }

    protected getRecordAsArray(record: Field[]): Field[] {
        return record;
    }
}
