import {Field} from './record';

export interface FieldStringifier {
    stringify(value?: Field): string;
}

class DefaultFieldStringifier implements FieldStringifier {
    private readonly fieldDelimiter: string;

    constructor(fieldDelimiter: string) {
        this.fieldDelimiter = fieldDelimiter;
    }

    stringify(value?: Field): string {
        if (typeof value === 'undefined' || value === null) return '';
        const str = String(value);
        return this.needsQuote(str) ? `"${str.replace(/"/g, '""')}"` : str;
    }

    private needsQuote(str: string): boolean {
        return str.includes(this.fieldDelimiter) || str.includes('\n') || str.includes('"');
    }
}

class ForceQuoteFieldStringifier implements FieldStringifier {
    stringify(value?: Field): string {
        if (typeof value === 'undefined' || value === null) return '';
        const str = String(value);
        return `"${str.replace(/"/g, '""')}"`;
    }
}

export function createFieldStringifier(fieldDelimiter: string, alwaysQuote?: boolean) {
    return alwaysQuote ? new ForceQuoteFieldStringifier() : new DefaultFieldStringifier(fieldDelimiter);
}
