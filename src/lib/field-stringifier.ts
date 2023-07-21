import {Field} from './record'

const DEFAULT_FIELD_DELIMITER = ','
const VALID_FIELD_DELIMITERS = [DEFAULT_FIELD_DELIMITER, ';']

export abstract class FieldStringifier {
    constructor(public readonly fieldDelimiter: string,public readonly alwaysQuote: boolean,public readonly shouldAddQuoteWhenEmpty: boolean) {}
    abstract stringify(value?: Field): string

    protected isEmpty(value?: Field): boolean {
        return typeof value === 'undefined' || value === null || value === ''
    }

    protected quoteField(field: string): string {
        return `"${field.replace(/"/g, '""')}"`
    }
}

class DefaultFieldStringifier extends FieldStringifier {
    stringify(value?: Field): string {
        if (this.isEmpty(value)) return ''
        const str = String(value)
        return this.needsQuote(str) ? this.quoteField(str) : str
    }

    private needsQuote(str: string): boolean {
        return str.includes(this.fieldDelimiter) || str.includes('\r') || str.includes('\n') || str.includes('"')
    }
}

class ForceQuoteFieldStringifier extends FieldStringifier {
    stringify(value?: Field): string {
        return this.isEmpty(value) ? '' : this.quoteField(String(value))
    }
}
class ForceQuoteFieldWhenEmptyStringifier extends FieldStringifier {
    stringify(value?: Field): string {
        if (this.alwaysQuote === true && this.shouldAddQuoteWhenEmpty === true) {
            return this.isEmpty(value) ? '""' : this.quoteField(String(value));
        }
        return '';
    }
}

export function createFieldStringifier(fieldDelimiter: string = DEFAULT_FIELD_DELIMITER, alwaysQuote = false,shouldAddQuoteWhenEmpty = false) {
    _validateFieldDelimiter(fieldDelimiter)
    return alwaysQuote === false && shouldAddQuoteWhenEmpty === false ? new DefaultFieldStringifier(fieldDelimiter,alwaysQuote,shouldAddQuoteWhenEmpty) : alwaysQuote === true && shouldAddQuoteWhenEmpty === true ? new ForceQuoteFieldWhenEmptyStringifier(fieldDelimiter,alwaysQuote,shouldAddQuoteWhenEmpty) : new ForceQuoteFieldStringifier(fieldDelimiter,alwaysQuote,shouldAddQuoteWhenEmpty)
}

function _validateFieldDelimiter(delimiter: string): void {
    if (VALID_FIELD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error(`Invalid field delimiter \`${delimiter}\` is specified`)
    }
}
