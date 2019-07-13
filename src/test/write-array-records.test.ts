import {assertFile, testFilePath} from './helper';
import {CsvWriter} from '../lib/csv-writer';

const fs = require('fs');
const createArrayCsvWriter = require('../index').createArrayCsvWriter;

describe('Write array records into CSV', () => {

    const makeFilePath = (id: string) => testFilePath(`array-${id}`);
    const records = [
        ['Bob', 'French'],
        ['Mary', 'English']
    ];

    describe('When only path is specified', () => {
        'use strict';

        const filePath = makeFilePath('minimum');
        let writer: CsvWriter<string[]>;

        beforeEach(() => {
            writer = createArrayCsvWriter({path: filePath});
        });

        it('writes records to a new file', () => {
            return writer.writeRecords(records).then(() => {
                assertFile(filePath, 'Bob,French\nMary,English\n');
            });
        });

        it('appends records when requested to write to the same file', async () => {
            await writer.writeRecords([records[0]]);
            await writer.writeRecords([records[1]]);
            assertFile(filePath, 'Bob,French\nMary,English\n');
        });
    });

    describe('When field header is given', () => {
        const filePath = makeFilePath('header');
        let writer: CsvWriter<string[]>;

        beforeEach(() => {
            writer = createArrayCsvWriter({
                path: filePath,
                header: ['NAME', 'LANGUAGE']
            });
        });

        it('writes a header', () => {
            return writer.writeRecords(records).then(() => {
                assertFile(filePath, 'NAME,LANGUAGE\nBob,French\nMary,English\n');
            });
        });

        it('appends records without headers', async () => {
            await writer.writeRecords([records[0]]);
            await writer.writeRecords([records[1]]);
            assertFile(filePath, 'NAME,LANGUAGE\nBob,French\nMary,English\n');
        });
    });

    describe('When `append` flag is specified', () => {
        const filePath = makeFilePath('append');
        fs.writeFileSync(filePath, 'Mike,German\n', 'utf8');
        const writer = createArrayCsvWriter({
            path: filePath,
            append: true
        });

        it('do not overwrite the existing contents and appends records to them', () => {
            return writer.writeRecords([records[1]]).then(() => {
                assertFile(filePath, 'Mike,German\nMary,English\n');
            });
        });
    });

    describe('When encoding is specified', () => {
        const filePath = makeFilePath('encoding');
        const writer = createArrayCsvWriter({
            path: filePath,
            encoding: 'utf16le'
        });

        it('writes to a file with the specified encoding', () => {
            return writer.writeRecords(records).then(() => {
                assertFile(filePath, 'Bob,French\nMary,English\n', 'utf16le');
            });
        });
    });

    describe('When semicolon is specified as a field delimiter', () => {
        const filePath = makeFilePath('field-delimiter');
        const writer = createArrayCsvWriter({
            path: filePath,
            header: ['NAME', 'LANGUAGE'],
            fieldDelimiter: ';'
        });

        it('uses semicolon instead of comma to separate fields', () => {
            return writer.writeRecords(records).then(() => {
                assertFile(filePath, 'NAME;LANGUAGE\nBob;French\nMary;English\n');
            });
        });
    });

    describe('When newline is specified', () => {
        const filePath = makeFilePath('newline');
        const writer = createArrayCsvWriter({
            path: filePath,
            recordDelimiter: '\r\n'
        });

        it('writes to a file with the specified newline character', () => {
            return writer.writeRecords(records).then(() => {
                assertFile(filePath, 'Bob,French\r\nMary,English\r\n');
            });
        });
    });

    describe('When `alwaysQuote` flag is set', () => {
        const filePath = makeFilePath('always-quote');
        const writer = createArrayCsvWriter({
            path: filePath,
            header: ['NAME', 'LANGUAGE'],
            alwaysQuote: true
        });

        it('quotes all fields', async () => {
            await writer.writeRecords(records);
            assertFile(filePath, '"NAME","LANGUAGE"\n"Bob","French"\n"Mary","English"\n');
        });
    });
});
