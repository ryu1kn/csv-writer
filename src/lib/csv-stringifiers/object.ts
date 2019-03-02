import {AbstractCsvStringifier} from './abstract';
import {FieldStringifier} from '../field-stringifier';
import {ObjectHeaderItem, ObjectStringifierHeader} from '../record';
import {ObjectMap} from '../lang';

export class ObjectCsvStringifier extends AbstractCsvStringifier<ObjectMap> {
    private readonly _header: ObjectStringifierHeader;

    constructor(header: ObjectStringifierHeader, fieldStringifier: FieldStringifier, fieldDelimiter: string) {
        super(fieldStringifier, fieldDelimiter);
        this._header = header;
    }

    protected _getHeaderRecord(): ObjectMap | null {
        if (!this.isObjectHeader) return null;

        return (this._header as ObjectHeaderItem[]).reduce((memo, field) =>
            Object.assign({}, memo, {[field.id]: field.title}), {});
    }

    protected _getRecordAsArray(record: ObjectMap): string[] {
        return this.fieldIds.map(field => record[field]);
    }

    private get fieldIds(): string[] {
        return this.isObjectHeader ? (this._header as ObjectHeaderItem[]).map(column => column.id) : (this._header as string[]);
    }

    private get isObjectHeader(): boolean {
        return isObject(this._header && this._header[0]);
    }
}

function isObject(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object Object]';
}
