
const expect = require('chai').expect;
const sinon = require('sinon');
const CsvWriter = require('../../lib/csv-writer');

describe('CsvWriter', () => {

    it('throws an error if file write failed', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, new Error('WRITE_FILE_ERROR'))};
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
                expect(e).to.be.an('error');
                expect(e.message).to.eql('WRITE_FILE_ERROR');
            }
        );
    });
});
