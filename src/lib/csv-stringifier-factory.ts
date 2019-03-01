import {ArrayCsvStringifier} from './csv-stringifiers/array';
import {FieldStringifier} from './field-stringifier';
import {ObjectCsvStringifier} from './csv-stringifiers/object';

const DEFAULT_FIELD_DELIMITER = ',';
const VALID_FIELD_DELIMITERS = [DEFAULT_FIELD_DELIMITER, ';'];

export class CsvStringifierFactory {

    createArrayCsvStringifier(params) {
        const fieldDelimiter = params.fieldDelimiter || DEFAULT_FIELD_DELIMITER;
        _validateFieldDelimiter(fieldDelimiter);
        return new ArrayCsvStringifier({
            fieldStringifier: new FieldStringifier({fieldDelimiter}),
            fieldDelimiter,
            header: params.header
        });
    }

    createObjectCsvStringifier(params) {
        const fieldDelimiter = params.fieldDelimiter || DEFAULT_FIELD_DELIMITER;
        _validateFieldDelimiter(fieldDelimiter);
        return new ObjectCsvStringifier({
            fieldStringifier: new FieldStringifier({fieldDelimiter}),
            fieldDelimiter,
            header: params.header
        });
    }

}

function _validateFieldDelimiter(delimiter) {
    if (VALID_FIELD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error(`Invalid field delimiter \`${delimiter}\` is specified`);
    }
}
