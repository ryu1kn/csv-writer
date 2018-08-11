
const assert = require('assert');
const createObjectCsvStringifier = require('../../../index').createObjectCsvStringifier;

describe('ObjectCsvStringifier', () => {

    describe('#stringify', () => {

        it('converts given records into CSV string', () => {
            const stringifier = createObjectCsvStringifier({
                header: [
                    {id: 'FIELD_A', title: 'TITLE_A'},
                    {id: 'FIELD_B', title: 'TITLE_B'}
                ]
            });
            const records = [
                {FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1'},
                {FIELD_A: 'VALUE_A2', FIELD_B: 'VALUE_B2'}
            ];
            assert.equal(
                stringifier.stringifyRecords(records),
                'VALUE_A1,VALUE_B1\nVALUE_A2,VALUE_B2\n'
            );
        });

        it('accepts an array of field ids as header', () => {
            const stringifier = createObjectCsvStringifier({
                header: ['FIELD_A', 'FIELD_B']
            });
            const records = [
                {FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1'},
                {FIELD_A: 'VALUE_A2', FIELD_B: 'VALUE_B2'}
            ];
            assert.equal(stringifier.stringifyRecords(records), 'VALUE_A1,VALUE_B1\nVALUE_A2,VALUE_B2\n');
        });

        it('determines the order of fields from the field order in the given header', () => {
            const stringifier = createObjectCsvStringifier({
                header: [
                    {id: 'FIELD_B', title: 'TITLE_B'},
                    {id: 'FIELD_A', title: 'TITLE_A'}
                ]
            });
            const records = [
                {FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1'},
                {FIELD_A: 'VALUE_A2', FIELD_B: 'VALUE_B2'}
            ];
            assert.equal(stringifier.stringifyRecords(records), 'VALUE_B1,VALUE_A1\nVALUE_B2,VALUE_A2\n');
        });
    });

    describe('#getHeaderString', () => {

        it('returns a header as CSV line', () => {
            const stringifier = createObjectCsvStringifier({
                header: [
                    {id: 'FIELD_A', title: 'TITLE_A'},
                    {id: 'FIELD_B', title: 'TITLE_B'}
                ]
            });
            assert.equal(stringifier.getHeaderString(), 'TITLE_A,TITLE_B\n');
        });

        it('returns null if header is not available', () => {
            const stringifier = createObjectCsvStringifier({});
            assert.equal(stringifier.getHeaderString(), null);
        });

        it('returns null if header is given as an array of field IDs', () => {
            const stringifier = createObjectCsvStringifier({
                header: ['FIELD_A', 'FIELD_B']
            });
            assert.equal(stringifier.getHeaderString(), null);
        });
    });
});
