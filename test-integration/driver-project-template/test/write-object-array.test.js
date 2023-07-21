const assert = require('assert')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const readFile = require('./helper/read-file').readFile

//case 1
describe('Write object array', () => {
    const OUTPUT_FILE = './output-object-records.csv'
    const csvWriter = createCsvWriter({
        path: OUTPUT_FILE,
        header: [
            { id: 'name', title: 'NAME' },
            { id: 'lang', title: 'LANGUAGE' }
        ],
        alwaysQuote: false,
        shouldAddQuoteWhenEmpty: false
    })

    const records = [
        { name: 'Bob', lang: 'French,English' },
        { name: 'Mary', lang: 'English' }
    ]

    it('writes an object array into a CSV file false false', () => {
        return csvWriter.writeRecords(records)
            .then(() => readFile(OUTPUT_FILE))
            .then(contents => {
                assert.strictEqual(contents, `NAME,LANGUAGE
Bob,"French,English"
Mary,English
`)
            })
    })
})
//case 2
describe('Write object array', () => {
    const OUTPUT_FILE = './output-object-records2.csv'
    const csvWriter = createCsvWriter({
        path: OUTPUT_FILE,
        header: [
            { id: 'name', title: 'NAME' },
            { id: 'lang', title: 'LANGUAGE' }
        ],
        alwaysQuote: true,
        shouldAddQuoteWhenEmpty: false
    })

    const records = [
        { name: 'Bob', lang: 'French,English' },
        { name: 'Mary', lang: '' }
    ]

    it('writes an object array into a CSV file true false', () => {
        return csvWriter.writeRecords(records)
            .then(() => readFile(OUTPUT_FILE))
            .then(contents => {
                assert.strictEqual(contents, `"NAME","LANGUAGE"
"Bob","French,English"
"Mary",
`)
            })
    })
})
//case 3
describe('Write object array', () => {
    const OUTPUT_FILE = './output-object-records4.csv'
    const csvWriter = createCsvWriter({
        path: OUTPUT_FILE,
        header: [
            { id: 'name', title: 'NAME' },
            { id: 'lang', title: 'LANGUAGE' }
        ],
        alwaysQuote: true,
        shouldAddQuoteWhenEmpty: true
    })

    const records = [
        { name: 'Bob', lang: 'French,English' },
        { name: 'Mary', lang: '' }
    ]

    it('writes an object array into a CSV file true true', () => {
        return csvWriter.writeRecords(records)
            .then(() => readFile(OUTPUT_FILE))
            .then(contents => {
                assert.strictEqual(contents, `"NAME","LANGUAGE"
"Bob","French,English"
"Mary",""
`)
            })
    })
})