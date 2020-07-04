const assert = require('assert')
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier

describe('Stringify object array', () => {
    const csvStringifier = createCsvStringifier({
        header: [
            {id: 'name', title: 'NAME'},
            {id: 'lang', title: 'LANGUAGE'}
        ]
    })
    const records = [
        {name: 'Bob',  lang: 'French, English'},
        {name: 'Mary', lang: 'English'}
    ]

    it('stringifies a header', () => {
        assert.deepEqual(csvStringifier.getHeaderString(), 'NAME,LANGUAGE\n')
    })

    it('stringifies records', () => {
        assert.deepEqual(csvStringifier.stringifyRecords(records), 'Bob,"French, English"\nMary,English\n')
    })
})
