
'use strict';

class FieldStringifier {

    stringify(value) {
        if (typeof value === 'undefined' || value === null) return '';
        const str = String(value).trim();
        return this._needsQuote(str) ? `"${str.replace(/"/g, '""')}"` : str;
    }

    _needsQuote(str) {
        return str.includes(',') || str.includes('\n') || str.startsWith('"') || str.endsWith('"');
    }

}

module.exports = FieldStringifier;
