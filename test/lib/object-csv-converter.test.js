
const ObjectCsvConverter = require('../../lib/object-csv-converter');

describe('ObjectCsvConverter', () => {

    describe('#convert', () => {

        it('converts given records into CSV string', () => {
            const converter = new ObjectCsvConverter({
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
            expect(converter.convert(records)).to.eql(
                'VALUE_A1,VALUE_B1\nVALUE_A2,VALUE_B2\n'
            );
        });
    });

    describe('#getHeaderString', () => {

        it('returns a header as CSV line', () => {
            const converter = new ObjectCsvConverter({
                header: [
                    {id: 'FIELD_A', title: 'TITLE_A'},
                    {id: 'FIELD_B', title: 'TITLE_B'}
                ],
                fieldStringifier: {
                    stringify: str => str
                }
            });
            expect(converter.getHeaderString()).to.eql(
                'TITLE_A,TITLE_B\n'
            );
        });

        it('returns null if header is not available', () => {
            const converter = new ObjectCsvConverter({
                fieldStringifier: {
                    stringify: str => str
                }
            });
            expect(converter.getHeaderString()).to.be.null;
        });

        it('returns null if header is given as an array of field IDs', () => {
            const converter = new ObjectCsvConverter({
                header: ['FIELD_A_ID', 'FIELD_B_ID'],
                fieldStringifier: {
                    stringify: str => str
                }
            });
            expect(converter.getHeaderString()).to.be.null;
        });
    });
});
