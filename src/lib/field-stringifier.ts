import {Field} from './record';

export class FieldStringifier {
    private readonly _fieldDelimiter: string;

    constructor(fieldDelimiter: string) {
        this._fieldDelimiter = fieldDelimiter;
    }

    stringify(value?: Field): string {
        if (typeof value === 'undefined' || value === null) return '';
        const str = String(value);
        return this._needsQuote(str) ? `"${str.replace(/"/g, '""')}"` : str;
    }

    private _needsQuote(str: string): boolean {
        return str.includes(this._fieldDelimiter) || str.includes('\n') || str.includes('"');
    }
}
