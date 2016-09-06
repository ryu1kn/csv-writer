
const ArrayCsvConverter = require('../../../lib/csv-converters/array');

describe('ArrayCsvConverter', () => {

    describe('#convert', () => {

        it('converts given records into CSV string', () => {
            const converter = new ArrayCsvConverter({
                fieldStringifier: {
                    stringify: str => str
                }
            });
            const records = [
                ['FIELD_A1', 'FIELD_B1'],
                ['FIELD_A2', 'FIELD_B2']
            ];
            expect(converter.convertRecords(records)).to.eql(
                'FIELD_A1,FIELD_B1\nFIELD_A2,FIELD_B2\n'
            );
        });
    });

    describe('#getHeaderString', () => {

        it('returns a header as CSV line', () => {
            const converter = new ArrayCsvConverter({
                header: ['TITLE_A', 'TITLE_B'],
                fieldStringifier: {
                    stringify: str => str
                }
            });
            expect(converter.getHeaderString()).to.eql(
                'TITLE_A,TITLE_B\n'
            );
        });

        it('returns null if header is not available', () => {
            const converter = new ArrayCsvConverter({
                fieldStringifier: {
                    stringify: str => str
                }
            });
            expect(converter.getHeaderString()).to.be.null;
        });
    });
});
