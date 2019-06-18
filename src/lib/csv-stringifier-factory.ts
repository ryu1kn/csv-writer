import {ArrayCsvStringifier} from './csv-stringifiers/array';
import {FieldStringifier} from './field-stringifier';
import {ObjectCsvStringifier} from './csv-stringifiers/object';
import {ObjectStringifierHeader} from './record';

const DEFAULT_FIELD_DELIMITER = ',';
const VALID_FIELD_DELIMITERS = [DEFAULT_FIELD_DELIMITER, ';'];

const DEFAULT_RECORD_DELIMITER = '\n';
const VALID_RECORD_DELIMITERS = [DEFAULT_RECORD_DELIMITER, '\r\n'];

export interface ArrayCsvStringifierParams {
    header?: string[];
    fieldDelimiter?: string;
    recordDelimiter?: string;
}

export interface ObjectCsvStringifierParams {
    header: ObjectStringifierHeader;
    fieldDelimiter?: string;
    recordDelimiter?: string;
}

export class CsvStringifierFactory {

    createArrayCsvStringifier(params: ArrayCsvStringifierParams) {
        const fieldDelimiter = params.fieldDelimiter || DEFAULT_FIELD_DELIMITER;
        const recordDelimiter = params.recordDelimiter || DEFAULT_RECORD_DELIMITER;
        _validateFieldDelimiter(fieldDelimiter);
        _validateRecordDelimiter(recordDelimiter);
        const fieldStringifier = new FieldStringifier(fieldDelimiter);
        return new ArrayCsvStringifier(fieldStringifier, fieldDelimiter, recordDelimiter, params.header);
    }

    createObjectCsvStringifier(params: ObjectCsvStringifierParams) {
        const fieldDelimiter = params.fieldDelimiter || DEFAULT_FIELD_DELIMITER;
        const recordDelimiter = params.recordDelimiter || DEFAULT_RECORD_DELIMITER;
        _validateFieldDelimiter(fieldDelimiter);
        _validateRecordDelimiter(recordDelimiter);
        const fieldStringifier = new FieldStringifier(fieldDelimiter);
        return new ObjectCsvStringifier(fieldStringifier, fieldDelimiter, recordDelimiter, params.header);
    }

}

function _validateFieldDelimiter(delimiter: string): void {
    if (VALID_FIELD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error(`Invalid field delimiter \`${delimiter}\` is specified`);
    }
}

function _validateRecordDelimiter(delimiter: string): void {
    if (VALID_RECORD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error(`Invalid record delimiter \`${delimiter}\` is specified`);
    }
}
