
'use strict';

const AbstractCsvStringifier = require('./abstract');

class ObjectCsvStringifier extends AbstractCsvStringifier {

    constructor(params) {
        super({fieldStringifier: params.fieldStringifier});
        this._header = params.header;
    }

    _getHeaderRecord() {
        const isHeaderAvailable = isObject(this._header && this._header[0]);
        if (!isHeaderAvailable) return null;

        return this._header.reduce((memo, field) =>
            Object.assign({}, memo, {[field.id]: field.title}), {});
    }

    _getRecordAsArray(record) {
        return this._header.map(field => {
            const fieldId = this._getFieldId(field);
            if (fieldId.charAt('.') !== -1) {
                return fieldId.split('.').reduce((nestedValue, nestedField) => {
                    nestedValue = nestedValue[nestedField];
                    return nestedValue;
                }, record);
            }
            return record[fieldId];
        });
    }

    _getFieldId(field) {
        return isObject(field) ? field.id : field;
    }

}

function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

module.exports = ObjectCsvStringifier;
