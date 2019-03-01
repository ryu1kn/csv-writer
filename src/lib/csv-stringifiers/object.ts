import {AbstractCsvStringifier} from './abstract';

export class ObjectCsvStringifier extends AbstractCsvStringifier {
    private readonly _header: any[];

    constructor(params) {
        super({
            fieldStringifier: params.fieldStringifier,
            fieldDelimiter: params.fieldDelimiter
        });
        this._header = params.header;
    }

    _getHeaderRecord() {
        const isHeaderAvailable = isObject(this._header && this._header[0]);
        if (!isHeaderAvailable) return null;

        return this._header.reduce((memo, field) =>
            Object.assign({}, memo, {[field.id]: field.title}), {});
    }

    _getRecordAsArray(record) {
        return this._header.map(field => record[this._getFieldId(field)]);
    }

    _getFieldId(field) {
        return isObject(field) ? field.id : field;
    }

}

function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
