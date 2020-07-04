import {resolveDelimiterChar} from '../helper/delimiter'
import {createArrayCsvStringifier} from '../../index'
import {strictEqual, throws} from 'assert'

describe('ArrayCsvStringifier', () => {
    const records = [
        ['VALUE_A1', 'VALUE_B1'],
        ['VALUE_A2', 'VALUE_B2']
    ]

    describe('When field delimiter is comma', generateTestCases(','))

    describe('When field delimiter is semicolon', generateTestCases(';'))

    describe('When field delimiter is neither comma nor semicolon', () => {
        it('throws an exception', () => {
            throws(() => {
                createArrayCsvStringifier({fieldDelimiter: '/'})
            })
        })
    })

    describe('When record delimiter is neither LF nor CR+LF', () => {
        it('throws an exception', () => {
            throws(() => {
                createArrayCsvStringifier({recordDelimiter: '\r'})
            })
        })
    })

    describe('When records input is an iterable other than an array', () => {
        const stringifier = createArrayCsvStringifier({
            header: ['TITLE_A', 'TITLE_B']
        })
        function * recordGenerator() {
            yield records[0]
            yield records[1]
        }

        it('converts the records into CSV', () => {
            strictEqual(
                stringifier.stringifyRecords(recordGenerator()),
                'VALUE_A1,VALUE_B1\nVALUE_A2,VALUE_B2\n'
            )
        })
    })

    describe('When `alwaysQuote` flag is set', () => {
        const stringifier = createArrayCsvStringifier({
            header: ['TITLE_A', 'TITLE_B'],
            alwaysQuote: true
        })

        it('quotes all header fields', () => {
            strictEqual(stringifier.getHeaderString(), '"TITLE_A","TITLE_B"\n')
        })

        it('quotes all data fields', () => {
            strictEqual(stringifier.stringifyRecords(records), '"VALUE_A1","VALUE_B1"\n"VALUE_A2","VALUE_B2"\n')
        })
    })

    function generateTestCases(fieldDelimiter: string) {
        const delim = resolveDelimiterChar(fieldDelimiter)
        return () => {
            describe('header is specified as a list of column titles', () => {
                const stringifier = createArrayCsvStringifier({
                    header: ['TITLE_A', 'TITLE_B'],
                    fieldDelimiter
                })

                it(`returns a header line with field separated by "${delim}"`, () => {
                    strictEqual(stringifier.getHeaderString(), `TITLE_A${delim}TITLE_B\n`)
                })

                it(`converts given data records into CSV lines with field separated by "${delim}"`, () => {
                    strictEqual(
                        stringifier.stringifyRecords(records),
                        `VALUE_A1${delim}VALUE_B1\nVALUE_A2${delim}VALUE_B2\n`
                    )
                })
            })

            describe('header is not specified', () => {
                const stringifier = createArrayCsvStringifier({fieldDelimiter})

                it('returns null for header line', () => {
                    strictEqual(stringifier.getHeaderString(), null)
                })

                it(`converts given data records into CSV lines with field separated by "${delim}"`, () => {
                    strictEqual(
                        stringifier.stringifyRecords(records),
                        `VALUE_A1${delim}VALUE_B1\nVALUE_A2${delim}VALUE_B2\n`
                    )
                })
            })
        }
    }
})
