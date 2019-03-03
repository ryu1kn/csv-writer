import {ArrayCsvStringifier} from './csv-stringifiers/array';
import {FieldStringifier} from './field-stringifier';
import {ObjectCsvStringifier} from './csv-stringifiers/object';
import {ObjectStringifierHeader} from './record';

const DEFAULT_FIELD_DELIMITER = ',';
const VALID_FIELD_DELIMITERS = [DEFAULT_FIELD_DELIMITER, ';'];

export interface ArrayCsvStringifierParams {
    header?: string[];
    fieldDelimiter?: string;
}

export interface ObjectCsvStringifierParams {
    header: ObjectStringifierHeader;
    fieldDelimiter?: string;
}

export class CsvStringifierFactory {

    createArrayCsvStringifier(params: ArrayCsvStringifierParams) {
        const fieldDelimiter = params.fieldDelimiter || DEFAULT_FIELD_DELIMITER;
        _validateFieldDelimiter(fieldDelimiter);
        const fieldStringifier = new FieldStringifier(fieldDelimiter);
        return new ArrayCsvStringifier(fieldStringifier, fieldDelimiter, params.header);
    }

    createObjectCsvStringifier(params: ObjectCsvStringifierParams) {
        const fieldDelimiter = params.fieldDelimiter || DEFAULT_FIELD_DELIMITER;
        _validateFieldDelimiter(fieldDelimiter);
        const fieldStringifier = new FieldStringifier(fieldDelimiter);
        return new ObjectCsvStringifier(fieldStringifier, fieldDelimiter, params.header);
    }

}

function _validateFieldDelimiter(delimiter: string): void {
    if (VALID_FIELD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error(`Invalid field delimiter \`${delimiter}\` is specified`);
    }
}
