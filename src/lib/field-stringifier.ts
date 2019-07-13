import {Field} from './record';

export abstract class FieldStringifier {
    private readonly _fieldDelimiter: string;

    constructor(fieldDelimiter: string) {
        this._fieldDelimiter = fieldDelimiter;
    }

    get fieldDelimiter(): string {
        return this._fieldDelimiter;
    }

    abstract stringify(value?: Field): string;
}

class DefaultFieldStringifier extends FieldStringifier {
    stringify(value?: Field): string {
        if (typeof value === 'undefined' || value === null) return '';
        const str = String(value);
        return this.needsQuote(str) ? `"${str.replace(/"/g, '""')}"` : str;
    }

    private needsQuote(str: string): boolean {
        return str.includes(this.fieldDelimiter) || str.includes('\n') || str.includes('"');
    }
}

class ForceQuoteFieldStringifier extends FieldStringifier {
    stringify(value?: Field): string {
        if (typeof value === 'undefined' || value === null) return '';
        const str = String(value);
        return `"${str.replace(/"/g, '""')}"`;
    }
}

export function createFieldStringifier(fieldDelimiter: string, alwaysQuote?: boolean) {
    return alwaysQuote ? new ForceQuoteFieldStringifier(fieldDelimiter) : new DefaultFieldStringifier(fieldDelimiter);
}
