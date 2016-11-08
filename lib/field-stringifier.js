
'use strict';

class FieldStringifier {

    stringify(value) {
        if (typeof value === 'undefined' || value === null) return '';
        const str = String(value);
        return this._needsQuote(str) ? `"${str.replace(/"/g, '""')}"` : str;
    }

    _needsQuote(str) {
        return str.includes(',') || str.includes('\n') || str.includes('"');
    }

}

module.exports = FieldStringifier;
