import * as assert from 'assert';
import {resolveDelimiterChar} from '../helper/delimiter';
import {createObjectCsvStringifier} from '../../index';

describe('ObjectCsvStringifier', () => {
    const records = [
        {FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1'},
        {FIELD_A: 'VALUE_A2', FIELD_B: 'VALUE_B2'}
    ];

    describe('When field delimiter is comma', generateTestCases());

    describe('When field delimiter is semicolon', generateTestCases(';'));

    describe('When field delimiter is neither comma nor semicolon', () => {
        it('throws an exception', () => {
            assert.throws(() => {
                createObjectCsvStringifier({
                    header: ['FIELD_A', 'FIELD_B'],
                    fieldDelimiter: '/'
                });
            });
        });
    });

    describe('When records input is an iterable other than an array', () => {
        const stringifier = createObjectCsvStringifier({
            header: ['FIELD_A', 'FIELD_B']
        });
        function * recordGenerator() {
            yield records[0];
            yield records[1];
        }

        it('converts the records into CSV', () => {
            assert.equal(
                stringifier.stringifyRecords(recordGenerator()),
                'VALUE_A1,VALUE_B1\nVALUE_A2,VALUE_B2\n'
            );
        });
    });

    function generateTestCases(fieldDelimiter?: string) {
        const delim = resolveDelimiterChar(fieldDelimiter);
        return () => {
            describe('header is specified with title', () => {
                const stringifier = createObjectCsvStringifier({
                    header: [
                        {id: 'FIELD_A', title: 'TITLE_A'},
                        {id: 'FIELD_B', title: 'TITLE_B'}
                    ],
                    fieldDelimiter
                });

                it(`returns a header line with field separated by "${delim}"`, () => {
                    assert.equal(stringifier.getHeaderString(), `TITLE_A${delim}TITLE_B\n`);
                });

                it(`converts given data records into CSV lines with field separated by "${delim}"`, () => {
                    assert.equal(
                        stringifier.stringifyRecords(records),
                        `VALUE_A1${delim}VALUE_B1\nVALUE_A2${delim}VALUE_B2\n`
                    );
                });
            });

            describe('header is specified without title', () => {
                const stringifier = createObjectCsvStringifier({
                    header: ['FIELD_A', 'FIELD_B'],
                    fieldDelimiter
                });

                it('returns null for header line', () => {
                    assert.equal(stringifier.getHeaderString(), null);
                });

                it(`converts given data records into CSV lines with field separated by "${delim}"`, () => {
                    assert.equal(
                        stringifier.stringifyRecords(records),
                        `VALUE_A1${delim}VALUE_B1\nVALUE_A2${delim}VALUE_B2\n`
                    );
                });
            });

            describe('header columns are given with reverse order', () => {
                const stringifier = createObjectCsvStringifier({
                    header: [
                        {id: 'FIELD_B', title: 'TITLE_B'},
                        {id: 'FIELD_A', title: 'TITLE_A'}
                    ],
                    fieldDelimiter
                });

                it(`layouts fields with the order of headers given with field separated by "${delim}"`, () => {
                    assert.equal(
                        stringifier.stringifyRecords(records),
                        `VALUE_B1${delim}VALUE_A1\nVALUE_B2${delim}VALUE_A2\n`
                    );
                });
            });
        };
    }
});
