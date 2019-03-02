import {CsvStringifier} from './abstract';
import {FieldStringifier} from '../field-stringifier';
import {Field} from '../record';

export class ArrayCsvStringifier extends CsvStringifier<Field[]> {
    private readonly header?: string[];

    constructor(fieldStringifier: FieldStringifier, fieldDelimiter: string, header?: string[]) {
        super(fieldStringifier, fieldDelimiter);
        this.header = header;
    }

    protected getHeaderRecord() {
        return this.header;
    }

    protected getRecordAsArray(record: Field[]): Field[] {
        return record;
    }
}
