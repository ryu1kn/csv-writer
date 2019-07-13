import {Field} from './record';

const DEFAULT_FIELD_DELIMITER = ',';
const VALID_FIELD_DELIMITERS = [DEFAULT_FIELD_DELIMITER, ';'];

export abstract class FieldStringifier {
    private readonly _fieldDelimiter: string;

    constructor(fieldDelimiter: string) {
        this._fieldDelimiter = fieldDelimiter;
    }

    get fieldDelimiter(): string {
        return this._fieldDelimiter;
    }

    abstract stringify(value?: Field): string;

    protected isEmpty(value?: Field): boolean {
        return typeof value === 'undefined' || value === null || value === '';
    }

    protected quoteField(field: string): string {
        return `"${field.replace(/"/g, '""')}"`;
    }
}

class DefaultFieldStringifier extends FieldStringifier {
    stringify(value?: Field): string {
        if (this.isEmpty(value)) return '';
        const str = String(value);
        return this.needsQuote(str) ? this.quoteField(str) : str;
    }

    private needsQuote(str: string): boolean {
        return str.includes(this.fieldDelimiter) || str.includes('\n') || str.includes('"');
    }
}

class ForceQuoteFieldStringifier extends FieldStringifier {
    stringify(value?: Field): string {
        return this.isEmpty(value) ? '' : this.quoteField(String(value));
    }
}

export function createFieldStringifier(fieldDelimiter: string = DEFAULT_FIELD_DELIMITER, alwaysQuote = false) {
    _validateFieldDelimiter(fieldDelimiter);
    return alwaysQuote ? new ForceQuoteFieldStringifier(fieldDelimiter) : new DefaultFieldStringifier(fieldDelimiter);
}

function _validateFieldDelimiter(delimiter: string): void {
    if (VALID_FIELD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error(`Invalid field delimiter \`${delimiter}\` is specified`);
    }
}
