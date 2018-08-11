
const expect = require('chai').expect;
const createArrayCsvStringifier = require('../../../index').createArrayCsvStringifier;

describe('ArrayCsvStringifier', () => {

    describe('#stringify', () => {

        it('converts given records into CSV string', () => {
            const stringifier = createArrayCsvStringifier({});
            const records = [
                ['FIELD_A1', 'FIELD_B1'],
                ['FIELD_A2', 'FIELD_B2']
            ];
            expect(stringifier.stringifyRecords(records)).to.eql(
                'FIELD_A1,FIELD_B1\nFIELD_A2,FIELD_B2\n'
            );
        });
    });

    describe('#getHeaderString', () => {

        it('returns a header as CSV line', () => {
            const stringifier = createArrayCsvStringifier({
                header: ['TITLE_A', 'TITLE_B']
            });
            expect(stringifier.getHeaderString()).to.eql(
                'TITLE_A,TITLE_B\n'
            );
        });

        it('returns null if header is not available', () => {
            const stringifier = createArrayCsvStringifier({});
            expect(stringifier.getHeaderString()).to.be.null;
        });
    });
});
