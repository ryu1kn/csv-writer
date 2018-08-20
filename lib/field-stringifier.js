
'use strict';

class FieldStringifier {

    constructor(params) {
        this._fieldDelimiter = params.fieldDelimiter;
    }

    stringify(value) {
        if (typeof value === 'undefined' || value === null) return '';
        const str = String(value);
        return this._needsQuote(str) ? `"${str.replace(/"/g, '""')}"` : str;
    }

    _needsQuote(str) {
        return str.includes(this._fieldDelimiter) || str.includes('\n') || str.includes('"');
    }

}

module.exports = FieldStringifier;
