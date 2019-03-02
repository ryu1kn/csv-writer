import {Field} from './record';

export class FieldStringifier {
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
