import * as assert from 'assert';
import {resolveDelimiterChar} from '../helper/delimiter';
import {createArrayCsvStringifier} from '../../index';

describe('ArrayCsvStringifier', () => {
    const records = [
        ['FIELD_A1', 'FIELD_B1'],
        ['FIELD_A2', 'FIELD_B2']
    ];

    describe('When field delimiter is comma', generateTestCases());

    describe('When field delimiter is semicolon', generateTestCases(';'));

    describe('When field delimiter is neither comma nor semicolon', () => {
        it('throws an exception', () => {
            assert.throws(() => {
                createArrayCsvStringifier({fieldDelimiter: '/'});
            });
        });
    });

    describe('When records input is an iterable other than an array', () => {
        const stringifier = createArrayCsvStringifier({
            header: ['TITLE_A', 'TITLE_B']
        });
        function * recordGenerator() {
            yield records[0];
            yield records[1];
        }

        it('converts the records into CSV', () => {
            assert.equal(
                stringifier.stringifyRecords(recordGenerator()),
                'FIELD_A1,FIELD_B1\nFIELD_A2,FIELD_B2\n'
            );
        });
    });

    function generateTestCases(fieldDelimiter?: string) {
        const delim = resolveDelimiterChar(fieldDelimiter);
        return () => {
            describe('header is specified as a list of column titles', () => {
                const stringifier = createArrayCsvStringifier({
                    header: ['TITLE_A', 'TITLE_B'],
                    fieldDelimiter
                });

                it(`returns a header line with field separated by "${delim}"`, () => {
                    assert.equal(stringifier.getHeaderString(), `TITLE_A${delim}TITLE_B\n`);
                });

                it(`converts given data records into CSV lines with field separated by "${delim}"`, () => {
                    assert.equal(
                        stringifier.stringifyRecords(records),
                        `FIELD_A1${delim}FIELD_B1\nFIELD_A2${delim}FIELD_B2\n`
                    );
                });
            });

            describe('header is not specified', () => {
                const stringifier = createArrayCsvStringifier({fieldDelimiter});

                it('returns null for header line', () => {
                    assert.equal(stringifier.getHeaderString(), null);
                });

                it(`converts given data records into CSV lines with field separated by "${delim}"`, () => {
                    assert.equal(
                        stringifier.stringifyRecords(records),
                        `FIELD_A1${delim}FIELD_B1\nFIELD_A2${delim}FIELD_B2\n`
                    );
                });
            });
        };
    }
});
