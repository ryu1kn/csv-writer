import {AbstractCsvStringifier} from './abstract';

export class ArrayCsvStringifier extends AbstractCsvStringifier {
    private _header: any[];

    constructor(params) {
        super({
            fieldStringifier: params.fieldStringifier,
            fieldDelimiter: params.fieldDelimiter
        });
        this._header = params.header;
    }

    _getHeaderRecord() {
        return this._header;
    }

    _getRecordAsArray(record) {
        return record;
    }

}
