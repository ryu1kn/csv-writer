const assert = require('assert')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const readFile = require('./helper/read-file').readFile

describe('Write object array', () => {
    const OUTPUT_FILE = './output-object-records.csv'
    const csvWriter = createCsvWriter({
        path: OUTPUT_FILE,
        header: [
            {id: 'name', title: 'NAME'},
            {id: 'lang', title: 'LANGUAGE'}
        ]
    })
    const records = [
        {name: 'Bob', lang: 'French, English'},
        {name: 'Mary', lang: 'English'}
    ]

    it('writes an object array into a CSV file', () => {
        return csvWriter.writeRecords(records)
            .then(() => readFile(OUTPUT_FILE))
            .then(contents => {
                assert.strictEqual(contents, `NAME,LANGUAGE
Bob,"French, English"
Mary,English
`)
            })
    })
})
