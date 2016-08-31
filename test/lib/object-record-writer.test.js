
const ObjectRecordWriter = require('../../lib/object-record-writer');

describe('ObjectRecordWriter', () => {

    it('writes a header row when it writes the first data row', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const fieldStringifier = {stringify: string => string};
        const header = [
            {id: 'FIELD_A', title: 'TITLE_A'},
            {id: 'FIELD_B', title: 'TITLE_B'}
        ];
        const writer = new ObjectRecordWriter({
            fs,
            fieldStringifier,
            path: 'FILE_PATH',
            header
        });

        const records = [
            {FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1'},
            {FIELD_A: 'VALUE_A2', FIELD_B: 'VALUE_B2'}
        ];
        return writer.writeRecords(records).then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                'TITLE_A,TITLE_B\nVALUE_A1,VALUE_B1\nVALUE_A2,VALUE_B2\n',
                {
                    encoding: 'utf8',
                    flag: 'w'
                }
            ]);
        });
    });

    it('opens a file with append mode and does not write a header again when requested to write CSV again', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const fieldStringifier = {stringify: string => string};
        const header = [
            {id: 'FIELD_A', title: 'TITLE_A'},
            {id: 'FIELD_B', title: 'TITLE_B'}
        ];
        const writer = new ObjectRecordWriter({
            fs,
            fieldStringifier,
            path: 'FILE_PATH',
            header
        });

        const records1 = [{FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1'}];
        const records2 = [{FIELD_A: 'VALUE_A2', FIELD_B: 'VALUE_B2'}];
        return Promise.resolve()
            .then(() => writer.writeRecords(records1))
            .then(() => writer.writeRecords(records2))
            .then(() => {
                expect(fs.writeFile.args[1].slice(0, 3)).to.eql([
                    'FILE_PATH',
                    'VALUE_A2,VALUE_B2\n',
                    {
                        encoding: 'utf8',
                        flag: 'a'
                    }
                ]);
            });
    });

    it('does not write a header row if the first element of the header is not an object', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const fieldStringifier = {stringify: value => String(value)};
        const header = ['FIELD_A', 'FIELD_B'];
        const writer = new ObjectRecordWriter({
            fs,
            fieldStringifier,
            path: 'FILE_PATH',
            header
        });

        const records = [{FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1'}];
        return writer.writeRecords(records).then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                'VALUE_A1,VALUE_B1\n',
                {
                    encoding: 'utf8',
                    flag: 'w'
                }
            ]);
        });
    });

    it('writes to a file with the specified encoding', () => {
        const fs = {writeFile: sinon.stub().callsArgWith(3, null)};
        const fieldStringifier = {stringify: string => string};
        const header = [
            {id: 'FIELD_A', title: 'TITLE_A'},
            {id: 'FIELD_B', title: 'TITLE_B'}
        ];
        const writer = new ObjectRecordWriter({
            fs,
            encoding: 'ENCODING',
            fieldStringifier,
            path: 'FILE_PATH',
            header
        });

        const records = [
            {FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1'},
            {FIELD_A: 'VALUE_A2', FIELD_B: 'VALUE_B2'}
        ];
        return writer.writeRecords(records).then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                'TITLE_A,TITLE_B\nVALUE_A1,VALUE_B1\nVALUE_A2,VALUE_B2\n',
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
        const header = ['FIELD_A', 'FIELD_B'];
        const writer = new ObjectRecordWriter({
            fs,
            fieldStringifier,
            path: 'FILE_PATH',
            header
        });

        const records = [{FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1'}];
        return writer.writeRecords(records).then(
            () => new Error('Should have been failed'),
            e => {
                expect(e).to.be.an.error;
                expect(e.message).to.eql('WRITE_FILE_ERROR');
            }
        );
    });
});
