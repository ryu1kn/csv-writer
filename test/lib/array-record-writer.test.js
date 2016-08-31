
const ArrayRecordWriter = require('../../lib/array-record-writer');

describe('ArrayRecordWriter', () => {

    it('writes records given as an array of arrays', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const fieldStringifier = {stringify: string => string};
        const writer = new ArrayRecordWriter({
            fs,
            fieldStringifier,
            path: 'FILE_PATH'
        });

        const records = [
            ['ROW1_FIELD1', 'ROW1_FIELD2'],
            ['ROW2_FIELD1', 'ROW2_FIELD2']
        ];
        return writer.writeRecords(records).then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                'ROW1_FIELD1,ROW1_FIELD2\nROW2_FIELD1,ROW2_FIELD2\n',
                {
                    encoding: 'utf8',
                    flag: 'w'
                }
            ]);
        });
    });

    it('opens a file with append mode when requested to write CSV again', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const fieldStringifier = {stringify: string => string};
        const writer = new ArrayRecordWriter({
            fs,
            fieldStringifier,
            path: 'FILE_PATH'
        });

        const records1 = [['ROW1_FIELD1', 'ROW1_FIELD2']];
        const records2 = [['ROW2_FIELD1', 'ROW2_FIELD2']];
        return Promise.resolve()
            .then(() => writer.writeRecords(records1))
            .then(() => writer.writeRecords(records2))
            .then(() => {
                expect(fs.writeFile.args[1].slice(0, 3)).to.eql([
                    'FILE_PATH',
                    'ROW2_FIELD1,ROW2_FIELD2\n',
                    {
                        encoding: 'utf8',
                        flag: 'a'
                    }
                ]);
            });
    });

    it('writes to a file with the specified encoding', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const fieldStringifier = {stringify: string => string};
        const writer = new ArrayRecordWriter({
            fs,
            encoding: 'ENCODING',
            fieldStringifier,
            path: 'FILE_PATH'
        });

        const records = [
            ['ROW1_FIELD1', 'ROW1_FIELD2'],
            ['ROW2_FIELD1', 'ROW2_FIELD2']
        ];
        return writer.writeRecords(records).then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                'ROW1_FIELD1,ROW1_FIELD2\nROW2_FIELD1,ROW2_FIELD2\n',
                {
                    encoding: 'ENCODING',
                    flag: 'w'
                }
            ]);
        });
    });

    it('throws an error if file write failed', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, new Error('WRITE_FILE_ERROR'))};
        const fieldStringifier = {stringify: value => String(value)};
        const writer = new ArrayRecordWriter({
            fs,
            fieldStringifier,
            path: 'FILE_PATH'
        });

        const records = [
            ['ROW1_FIELD1', 'ROW1_FIELD2'],
            ['ROW2_FIELD1', 'ROW2_FIELD2']
        ];
        return writer.writeRecords(records).then(
            () => new Error('Should have been failed'),
            e => {
                expect(e).to.be.an.error;
                expect(e.message).to.eql('WRITE_FILE_ERROR');
            }
        );
    });
});
