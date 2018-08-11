const CsvWriter = require('../../lib/csv-writer');
const assertContain = require('../helper').assertContain;

describe('CsvWriter', () => {

    it('throws an error if file write failed', () => {
        const fs = {writeFile: function () {
            arguments[3](new Error('WRITE_FILE_ERROR'));
        }};
        const arrayCsvStringifier = {
            getHeaderString: () => 'HEADER_STRING',
            stringifyRecords: () => 'CSV_STRING'
        };
        const writer = new CsvWriter({
            fs,
            csvStringifier: arrayCsvStringifier,
            path: 'FILE_PATH'
        });

        return writer.writeRecords('RECORDS').then(
            () => new Error('Should have been failed'),
            e => {
                assertContain(e.message, 'WRITE_FILE_ERROR');
            }
        );
    });
});
