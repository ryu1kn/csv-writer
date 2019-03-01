import {FieldStringifier} from '../field-stringifier';

const RECORD_DELIMITER = '\n';

export abstract class AbstractCsvStringifier {
    private _fieldStringifier: FieldStringifier;
    private _fieldDelimiter: string;

    constructor(params) {
        this._fieldStringifier = params.fieldStringifier;
        this._fieldDelimiter = params.fieldDelimiter;
    }

    getHeaderString() {
        const headerRecord = this._getHeaderRecord();
        return headerRecord ? this.stringifyRecords([headerRecord]) : null;
    }

    stringifyRecords(records) {
        const csvLines = Array.from(records, record => this._getCsvLine(this._getRecordAsArray(record)));
        return csvLines.join(RECORD_DELIMITER) + RECORD_DELIMITER;
    }

    abstract _getRecordAsArray(_record): any;

    abstract _getHeaderRecord(): any;

    _getCsvLine(record) {
        return record
            .map(fieldValue => this._fieldStringifier.stringify(fieldValue))
            .join(this._fieldDelimiter);
    }

}
