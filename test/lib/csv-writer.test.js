
const expect = require('chai').expect;
const sinon = require('sinon');
const CsvWriter = require('../../lib/csv-writer');

describe('CsvWriter', () => {

    it('writes records to a new file', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const csvStringifier = {
            getHeaderString: () => 'HEADER_STRING',
            stringifyRecords: sinon.stub().returns('RECORDS_STRING')
        };
        const writer = new CsvWriter({
            fs,
            csvStringifier,
            path: 'FILE_PATH'
        });

        return writer.writeRecords('RECORDS').then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                'HEADER_STRINGRECORDS_STRING',
                {
                    encoding: 'utf8',
                    flag: 'w'
                }
            ]);
            expect(csvStringifier.stringifyRecords.args[0][0]).to.eql('RECORDS');
        });
    });

    it('does not write a header if it is not available', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const csvStringifier = {
            getHeaderString: () => null,
            stringifyRecords: sinon.stub().returns('RECORDS_STRING')
        };
        const writer = new CsvWriter({
            fs,
            csvStringifier,
            path: 'FILE_PATH'
        });

        return writer.writeRecords('RECORDS').then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                'RECORDS_STRING',
                {
                    encoding: 'utf8',
                    flag: 'w'
                }
            ]);
        });
    });

    it('opens a file with append mode when requested to write CSV again', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const arrayCsvStringifier = {
            getHeaderString: () => 'HEADER_STRING',
            stringifyRecords: () => 'CSV_STRING'
        };
        const writer = new CsvWriter({
            fs,
            csvStringifier: arrayCsvStringifier,
            path: 'FILE_PATH'
        });

        return Promise.resolve()
            .then(() => writer.writeRecords('RECORDS_1'))
            .then(() => writer.writeRecords('RECORDS_2'))
            .then(() => {
                expect(fs.writeFile.args[1].slice(0, 3)).to.eql([
                    'FILE_PATH',
                    'CSV_STRING',
                    {
                        encoding: 'utf8',
                        flag: 'a'
                    }
                ]);
            });
    });

    it('opens a file in append mode on the first write if `append` flag is specified', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const arrayCsvStringifier = {
            getHeaderString: () => 'HEADER_STRING',
            stringifyRecords: () => 'CSV_STRING'
        };
        const writer = new CsvWriter({
            fs,
            encoding: 'ENCODING',
            csvStringifier: arrayCsvStringifier,
            path: 'FILE_PATH',
            append: true
        });

        return writer.writeRecords('RECORDS').then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                'CSV_STRING',
                {
                    encoding: 'ENCODING',
                    flag: 'a'
                }
            ]);
        });
    });

    it('writes to a file with the specified encoding', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const arrayCsvStringifier = {
            getHeaderString: () => 'HEADER_STRING',
            stringifyRecords: () => 'RECORDS_STRING'
        };
        const writer = new CsvWriter({
            fs,
            encoding: 'ENCODING',
            csvStringifier: arrayCsvStringifier,
            path: 'FILE_PATH'
        });

        return writer.writeRecords('RECORDS').then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                'HEADER_STRINGRECORDS_STRING',
                {
                    encoding: 'ENCODING',
                    flag: 'w'
                }
            ]);
        });
    });

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
