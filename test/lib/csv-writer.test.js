
const CsvWriter = require('../../lib/csv-writer');

describe('CsvWriter', () => {

    it('writes records to a new file', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const csvConverter = {
            getHeaderString: () => 'HEADER_STRING',
            convertRecords: sinon.stub().returns('RECORDS_STRING')
        };
        const writer = new CsvWriter({
            fs,
            csvConverter,
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
            expect(csvConverter.convertRecords.args[0][0]).to.eql('RECORDS');
        });
    });

    it('does not write a header if it is not available', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const csvConverter = {
            getHeaderString: () => null,
            convertRecords: sinon.stub().returns('RECORDS_STRING')
        };
        const writer = new CsvWriter({
            fs,
            csvConverter,
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
        const arrayCsvConverter = {
            getHeaderString: () => 'HEADER_STRING',
            convertRecords: () => 'CSV_STRING'
        };
        const writer = new CsvWriter({
            fs,
            csvConverter: arrayCsvConverter,
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

    it('writes to a file with the specified encoding', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const arrayCsvConverter = {
            getHeaderString: () => 'HEADER_STRING',
            convertRecords: () => 'RECORDS_STRING'
        };
        const writer = new CsvWriter({
            fs,
            encoding: 'ENCODING',
            csvConverter: arrayCsvConverter,
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
        const arrayCsvConverter = {
            getHeaderString: () => 'HEADER_STRING',
            convertRecords: () => 'CSV_STRING'
        };
        const writer = new CsvWriter({
            fs,
            csvConverter: arrayCsvConverter,
            path: 'FILE_PATH'
        });

        return writer.writeRecords('RECORDS').then(
            () => new Error('Should have been failed'),
            e => {
                expect(e).to.be.an.error;
                expect(e.message).to.eql('WRITE_FILE_ERROR');
            }
        );
    });
});
