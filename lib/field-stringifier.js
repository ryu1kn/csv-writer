
'use strict';

class FieldStringifier {

    stringify(value) {
        if (typeof value === 'undefined' || value === null) return '';
        const str = String(value).trim();
        const needsQuotes = str.includes(',') || str.startsWith('"') || str.endsWith('"');
        return needsQuotes ? `"${str.replace(/"/g, '""')}"` : str;
    }

}

module.exports = FieldStringifier;
