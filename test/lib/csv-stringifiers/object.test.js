
const expect = require('chai').expect;
const ObjectCsvStringifier = require('../../../lib/csv-stringifiers/object');

describe('ObjectCsvStringifier', () => {

    describe('#stringify', () => {

        it('converts given records into CSV string', () => {
            const stringifier = new ObjectCsvStringifier({
                fieldStringifier: {
                    stringify: str => str
                },
                header: [
                    {id: 'FIELD_A', title: 'TITLE_A'},
                    {id: 'FIELD_B', title: 'TITLE_B'}
                ]
            });
            const records = [
                {FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1'},
                {FIELD_A: 'VALUE_A2', FIELD_B: 'VALUE_B2'}
            ];
            expect(stringifier.stringifyRecords(records)).to.eql(
                'VALUE_A1,VALUE_B1\nVALUE_A2,VALUE_B2\n'
            );
        });

        it('accepts an array of field ids as header', () => {
            const stringifier = new ObjectCsvStringifier({
                fieldStringifier: {
                    stringify: str => str
                },
                header: ['FIELD_A', 'FIELD_B']
            });
            const records = [
                {FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1'},
                {FIELD_A: 'VALUE_A2', FIELD_B: 'VALUE_B2'}
            ];
            expect(stringifier.stringifyRecords(records)).to.eql(
                'VALUE_A1,VALUE_B1\nVALUE_A2,VALUE_B2\n'
            );
        });

        it('determines the order of fields from the field order in the given header', () => {
            const stringifier = new ObjectCsvStringifier({
                fieldStringifier: {
                    stringify: str => str
                },
                header: [
                    {id: 'FIELD_B', title: 'TITLE_B'},
                    {id: 'FIELD_A', title: 'TITLE_A'}
                ]
            });
            const records = [
                {FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1'},
                {FIELD_A: 'VALUE_A2', FIELD_B: 'VALUE_B2'}
            ];
            expect(stringifier.stringifyRecords(records)).to.eql(
                'VALUE_B1,VALUE_A1\nVALUE_B2,VALUE_A2\n'
            );
        });
    });

    describe('#getHeaderString', () => {

        it('returns a header as CSV line', () => {
            const stringifier = new ObjectCsvStringifier({
                header: [
                    {id: 'FIELD_A', title: 'TITLE_A'},
                    {id: 'FIELD_B', title: 'TITLE_B'}
                ],
                fieldStringifier: {
                    stringify: str => str
                }
            });
            expect(stringifier.getHeaderString()).to.eql(
                'TITLE_A,TITLE_B\n'
            );
        });

        it('returns null if header is not available', () => {
            const stringifier = new ObjectCsvStringifier({
                fieldStringifier: {
                    stringify: str => str
                }
            });
            expect(stringifier.getHeaderString()).to.be.null;
        });

        it('returns null if header is given as an array of field IDs', () => {
            const stringifier = new ObjectCsvStringifier({
                header: ['FIELD_A', 'FIELD_B'],
                fieldStringifier: {
                    stringify: str => str
                }
            });
            expect(stringifier.getHeaderString()).to.be.null;
        });
    });
});
