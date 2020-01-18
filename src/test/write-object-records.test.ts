import {assertFile, testFilePath} from './helper';
import {CsvWriter} from '../lib/csv-writer';
import {writeFileSync} from 'fs';
import {createObjectCsvWriter} from '../index';
import {ObjectMap} from '../lib/lang/object';

describe('Write object records into CSV', () => {

    const makeFilePath = (id: string) => testFilePath(`object-${id}`);
    const records = [
        {name: 'Bob', lang: 'French', address: {country: 'France'}},
        {name: 'Mary', lang: 'English'}
    ];

    describe('When only path and header ids are given', () => {
        const filePath = makeFilePath('minimum');
        let writer: CsvWriter<ObjectMap<any>>;

        beforeEach(() => {
            writer = createObjectCsvWriter({
                path: filePath,
                header: ['name', 'lang']
            });
        });

        it('writes records to a new file', async () => {
            await writer.writeRecords(records);
            assertFile(filePath, 'Bob,French\nMary,English\n');
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

        it('also writes columns with reverse order', async () => {
            await writer.writeRecords(records);
            assertFile(filePath, 'French,Bob\nEnglish,Mary\n');
        });
    });

    describe('When field header is given with titles', () => {
        const filePath = makeFilePath('header');
        let writer: CsvWriter<ObjectMap<any>>;

        beforeEach(() => {
            writer = createObjectCsvWriter({
                path: filePath,
                header: [{id: 'name', title: 'NAME'}, {id: 'lang', title: 'LANGUAGE'}]
            });
        });

        it('writes a header', async () => {
            await writer.writeRecords(records);
            assertFile(filePath, 'NAME,LANGUAGE\nBob,French\nMary,English\n');
        });

        it('appends records without headers', async () => {
            await writer.writeRecords([records[0]]);
            await writer.writeRecords([records[1]]);
            assertFile(filePath, 'NAME,LANGUAGE\nBob,French\nMary,English\n');
        });
    });

    describe('When `append` flag is specified', () => {
        const filePath = makeFilePath('append');
        writeFileSync(filePath, 'Mike,German\n', 'utf8');
        const writer = createObjectCsvWriter({
            path: filePath,
            header: ['name', 'lang'],
            append: true
        });

        it('do not overwrite the existing contents and appends records to them', async () => {
            await writer.writeRecords([records[1]]);
            assertFile(filePath, 'Mike,German\nMary,English\n');
        });
    });

    describe('When encoding is specified', () => {
        const filePath = makeFilePath('encoding');
        const writer = createObjectCsvWriter({
            path: filePath,
            header: ['name', 'lang'],
            encoding: 'utf16le'
        });

        it('writes to a file with the specified encoding', async () => {
            await writer.writeRecords(records);
            assertFile(filePath, 'Bob,French\nMary,English\n', 'utf16le');
        });
    });

    describe('When semicolon is specified as a field delimiter', () => {
        const filePath = makeFilePath('field-delimiter');
        const writer = createObjectCsvWriter({
            path: filePath,
            header: [{id: 'name', title: 'NAME'}, {id: 'lang', title: 'LANGUAGE'}],
            fieldDelimiter: ';'
        });

        it('uses semicolon instead of comma to separate fields', async () => {
            await writer.writeRecords(records);
            assertFile(filePath, 'NAME;LANGUAGE\nBob;French\nMary;English\n');
        });
    });

    describe('When newline is specified', () => {
        const filePath = makeFilePath('newline');
        const writer = createObjectCsvWriter({
            path: filePath,
            header: ['name', 'lang'],
            recordDelimiter: '\r\n'
        });

        it('writes to a file with the specified newline character', async () => {
            await writer.writeRecords(records);
            assertFile(filePath, 'Bob,French\r\nMary,English\r\n');
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

    describe('When `headerIdDelimiter` flag is set', () => {
        const filePath = makeFilePath('nested');
        const writer = createObjectCsvWriter({
            path: filePath,
            header: [{id: 'name', title: 'NAME'}, {id: 'address.country', title: 'COUNTRY'}],
            headerIdDelimiter: '.'
        });

        it('breaks keys into key paths', async () => {
            await writer.writeRecords(records);
            assertFile(filePath, 'NAME,COUNTRY\nBob,France\nMary,\n');
        });
    });
});
