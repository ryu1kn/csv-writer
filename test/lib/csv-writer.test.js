
const CsvWriter = require('../../lib/csv-writer');

describe('CsvWriter', () => {

    it('writes a header row', () => {
        const fs = {
            writeFile: sinon.stub().callsArgWith(3, null)
        };
        const fieldStringifier = {stringify: string => string};
        const header = [
            {id: 'FIELD_A', title: 'TITLE_A'},
            {id: 'FIELD_B', title: 'TITLE_B'}
        ];
        const writer = new CsvWriter({
            fs,
            fieldStringifier,
            path: 'FILE_PATH',
            header
        });

        return writer.writeHeader().then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                'TITLE_A,TITLE_B\n',
                {encoding: 'utf8'}
            ]);
        });
    });

    it('writes a header row before it writes the first row', () => {
        const fs = {
            writeFile: sinon.stub().callsArgWith(3, null)
        };
        const fieldStringifier = {stringify: string => string};
        const header = [
            {id: 'FIELD_A', title: 'TITLE_A'},
            {id: 'FIELD_B', title: 'TITLE_B'}
        ];
        const writer = new CsvWriter({
            fs,
            fieldStringifier,
            path: 'FILE_PATH',
            header
        });

        const row = {
            FIELD_A: 'VALUE_A1',
            FIELD_B: 'VALUE_B1'
        };
        return writer.write(row).then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                'TITLE_A,TITLE_B\n',
                {encoding: 'utf8'}
            ]);
            expect(fs.writeFile.args[1].slice(0, 3)).to.eql([
                'FILE_PATH',
                'VALUE_A1,VALUE_B1\n',
                {
                    encoding: 'utf8',
                    flag: 'a'
                }
            ]);
        });
    });

    it('stringifies header values', () => {
        const fs = {
            writeFile: sinon.stub().callsArgWith(3, null)
        };
        const fieldStringifier = {stringify: value => String(value)};
        const header = [
            {id: 'FIELD_A', title: 3},
            {id: 'FIELD_B', title: 'TITLE_B'}
        ];
        const writer = new CsvWriter({
            fs,
            fieldStringifier,
            path: 'FILE_PATH',
            header
        });

        return writer.writeHeader().then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                '3,TITLE_B\n',
                {encoding: 'utf8'}
            ]);
        });
    });

    it('stringifies field values', () => {
        const fs = {
            writeFile: sinon.stub().callsArgWith(3, null)
        };
        const fieldStringifier = {stringify: value => String(value)};
        const header = [
            {id: 'FIELD_A', title: 'TITLE_A'},
            {id: 'FIELD_B', title: 'TITLE_B'}
        ];
        const writer = new CsvWriter({
            fs,
            fieldStringifier,
            path: 'FILE_PATH',
            header
        });

        const row = {
            FIELD_A: 3,
            FIELD_B: 'VALUE_B1'
        };
        return writer.write(row).then(() => {
            expect(fs.writeFile.args[1].slice(0, 3)).to.eql([
                'FILE_PATH',
                '3,VALUE_B1\n',
                {
                    encoding: 'utf8',
                    flag: 'a'
                }
            ]);
        });
    });

    it('writes no header row if it is not given', () => {
        const fs = {
            writeFile: sinon.stub().callsArgWith(3, null)
        };
        const fieldStringifier = {stringify: value => String(value)};
        const header = ['FIELD_A', 'FIELD_B'];
        const writer = new CsvWriter({
            fs,
            fieldStringifier,
            path: 'FILE_PATH',
            header
        });

        const row = {
            FIELD_A: 'VALUE_A1',
            FIELD_B: 'VALUE_B1'
        };
        return writer.write(row).then(() => {
            expect(fs.writeFile.args[0].slice(0, 3)).to.eql([
                'FILE_PATH',
                'VALUE_A1,VALUE_B1\n',
                {
                    encoding: 'utf8',
                    flag: 'a'
                }
            ]);
        });
    });
});
