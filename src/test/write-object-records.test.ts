import {assertFile, testFilePath} from './helper';
import {CsvWriter} from '../lib/csv-writer';

const fs = require('fs');
const createObjectCsvWriter = require('../index').createObjectCsvWriter;

describe('Write object records into CSV', () => {

    const makeFilePath = (id: string) => testFilePath(`object-${id}`);
    const records = [
        {name: 'Bob', lang: 'French'},
        {name: 'Mary', lang: 'English'}
    ];

    describe('When only path and header ids are given', () => {
        'use strict';

        const filePath = makeFilePath('minimum');
        let writer: CsvWriter<{[k: string]: string}>;

        beforeEach(() => {
            writer = createObjectCsvWriter({
                path: filePath,
                header: ['name', 'lang']
            });
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

    describe('When header ids are given with reverse order', () => {
        const filePath = makeFilePath('column-order');
        const writer = createObjectCsvWriter({
            path: filePath,
            header: ['lang', 'name']
        });

        it('also writes columns with reverse order', () => {
            return writer.writeRecords(records).then(() => {
                assertFile(filePath, 'French,Bob\nEnglish,Mary\n');
            });
        });
    });

    describe('When field header is given with titles', () => {
        const filePath = makeFilePath('header');
        let writer: CsvWriter<{[k: string]: string}>;

        beforeEach(() => {
            writer = createObjectCsvWriter({
                path: filePath,
                header: [{id: 'name', title: 'NAME'}, {id: 'lang', title: 'LANGUAGE'}]
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
        const writer = createObjectCsvWriter({
            path: filePath,
            header: ['name', 'lang'],
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
        const writer = createObjectCsvWriter({
            path: filePath,
            header: ['name', 'lang'],
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
        const writer = createObjectCsvWriter({
            path: filePath,
            header: [{id: 'name', title: 'NAME'}, {id: 'lang', title: 'LANGUAGE'}],
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
        const writer = createObjectCsvWriter({
            path: filePath,
            header: ['name', 'lang'],
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
        const writer = createObjectCsvWriter({
            path: filePath,
            header: [{id: 'name', title: 'NAME'}, {id: 'lang', title: 'LANGUAGE'}],
            alwaysQuote: true
        });

        it('quotes all fields', async () => {
            await writer.writeRecords(records);
            assertFile(filePath, '"NAME","LANGUAGE"\n"Bob","French"\n"Mary","English"\n');
        });
    });
});
