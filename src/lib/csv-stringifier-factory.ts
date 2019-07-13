import {ArrayCsvStringifier} from './csv-stringifiers/array';
import {createFieldStringifier} from './field-stringifier';
import {ObjectCsvStringifier} from './csv-stringifiers/object';
import {ObjectStringifierHeader} from './record';

const DEFAULT_FIELD_DELIMITER = ',';
const VALID_FIELD_DELIMITERS = [DEFAULT_FIELD_DELIMITER, ';'];

export interface ArrayCsvStringifierParams {
    header?: string[];
    fieldDelimiter?: string;
    recordDelimiter?: string;
    alwaysQuote?: boolean;
}

export interface ObjectCsvStringifierParams {
    header: ObjectStringifierHeader;
    fieldDelimiter?: string;
    recordDelimiter?: string;
    alwaysQuote?: boolean;
}

export class CsvStringifierFactory {

    createArrayCsvStringifier(params: ArrayCsvStringifierParams) {
        const fieldDelimiter = params.fieldDelimiter || DEFAULT_FIELD_DELIMITER;
        _validateFieldDelimiter(fieldDelimiter);
        const fieldStringifier = createFieldStringifier(fieldDelimiter, params.alwaysQuote);
        return new ArrayCsvStringifier(fieldStringifier, params.recordDelimiter, params.header);
    }

    createObjectCsvStringifier(params: ObjectCsvStringifierParams) {
        const fieldDelimiter = params.fieldDelimiter || DEFAULT_FIELD_DELIMITER;
        _validateFieldDelimiter(fieldDelimiter);
        const fieldStringifier = createFieldStringifier(fieldDelimiter, params.alwaysQuote);
        return new ObjectCsvStringifier(fieldStringifier, params.header, params.recordDelimiter);
    }

}

function _validateFieldDelimiter(delimiter: string): void {
    if (VALID_FIELD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error(`Invalid field delimiter \`${delimiter}\` is specified`);
    }
}
