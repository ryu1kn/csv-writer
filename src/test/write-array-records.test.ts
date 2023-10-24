import {assertFile, testFilePath} from './helper'
import {CsvWriter} from '../lib/csv-writer'
import {writeFileSync} from 'fs'
import {createArrayCsvWriter} from '../index'

describe('Write array records into CSV', () => {

    const makeFilePath = (id: string) => testFilePath(`array-${id}`)
    const records = [
        ['Bob', 'French'],
        ['Mary', 'English']
    ]

    const recordsWithEmpty = [
        ...records,
        ["Jack", undefined],
        [null, "German"]]

    describe('When only path is specified', () => {
        const filePath = makeFilePath('minimum')
        let writer: CsvWriter<string[]>

        beforeEach(() => {
            writer = createArrayCsvWriter({path: filePath})
        })

        it('writes records to a new file', async () => {
            await writer.writeRecords(records)
            assertFile(filePath, 'Bob,French\nMary,English\n')
        })

        it('appends records when requested to write to the same file', async () => {
            await writer.writeRecords([records[0]])
            await writer.writeRecords([records[1]])
            assertFile(filePath, 'Bob,French\nMary,English\n')
        })
    })

    describe('When field header is given', () => {
        const filePath = makeFilePath('header')
        let writer: CsvWriter<string[]>

        beforeEach(() => {
            writer = createArrayCsvWriter({
                path: filePath,
                header: ['NAME', 'LANGUAGE']
            })
        })

        it('writes a header', async () => {
            await writer.writeRecords(records)
            assertFile(filePath, 'NAME,LANGUAGE\nBob,French\nMary,English\n')
        })

        it('appends records without headers', async () => {
            await writer.writeRecords([records[0]])
            await writer.writeRecords([records[1]])
            assertFile(filePath, 'NAME,LANGUAGE\nBob,French\nMary,English\n')
        })
    })

    describe('When `append` flag is specified', () => {
        const filePath = makeFilePath('append')
        writeFileSync(filePath, 'Mike,German\n', 'utf8')
        const writer = createArrayCsvWriter({
            path: filePath,
            append: true
        })

        it('do not overwrite the existing contents and appends records to them', async () => {
            await writer.writeRecords([records[1]])
            assertFile(filePath, 'Mike,German\nMary,English\n')
        })
    })

    describe('When encoding is specified', () => {
        const filePath = makeFilePath('encoding')
        const writer = createArrayCsvWriter({
            path: filePath,
            encoding: 'utf16le'
        })

        it('writes to a file with the specified encoding', async () => {
            await writer.writeRecords(records)
            assertFile(filePath, 'Bob,French\nMary,English\n', 'utf16le')
        })
    })

    describe('When semicolon is specified as a field delimiter', () => {
        const filePath = makeFilePath('field-delimiter')
        const writer = createArrayCsvWriter({
            path: filePath,
            header: ['NAME', 'LANGUAGE'],
            fieldDelimiter: ';'
        })

        it('uses semicolon instead of comma to separate fields', async () => {
            await writer.writeRecords(records)
            assertFile(filePath, 'NAME;LANGUAGE\nBob;French\nMary;English\n')
        })
    })

    describe('When newline is specified', () => {
        const filePath = makeFilePath('newline')
        const writer = createArrayCsvWriter({
            path: filePath,
            recordDelimiter: '\r\n'
        })

        it('writes to a file with the specified newline character', async () => {
            await writer.writeRecords(records)
            assertFile(filePath, 'Bob,French\r\nMary,English\r\n')
        })
    })

    describe('When `alwaysQuote` flag is set', () => {
        const filePath = makeFilePath('always-quote')
        const writer = createArrayCsvWriter({
            path: filePath,
            header: ['NAME', 'LANGUAGE'],
            alwaysQuote: true
        })

        it('quotes all fields', async () => {
            await writer.writeRecords(records)
            assertFile(filePath, '"NAME","LANGUAGE"\n"Bob","French"\n"Mary","English"\n')
        })
    })

    describe('When `quoteEmptyFields` flag is set', () => {
        const filePath = makeFilePath('quote-empty-fields')

        const writer = createArrayCsvWriter({
            path: filePath,
            header: ['NAME', 'LANGUAGE'],
            quoteEmptyFields: true
        })

        it('quotes all empty fields', async () => {
            await writer.writeRecords(recordsWithEmpty)
            assertFile(filePath, 'NAME,LANGUAGE\nBob,French\nMary,English\nJack,""\n"",German\n')
        })
    })

    describe('When `quoteEmptyFields` and `alwaysQuote` flag is set', () => {
        const filePath = makeFilePath('quote-empty-fields-and-always-quote')

        const writer = createArrayCsvWriter({
            path: filePath,
            header: ['NAME', 'LANGUAGE'],
            quoteEmptyFields: true,
            alwaysQuote: true
        })

        it('quotes all fields including empties', async () => {
            await writer.writeRecords(recordsWithEmpty)
            assertFile(filePath, '"NAME","LANGUAGE"\n"Bob","French"\n"Mary","English"\n"Jack",""\n"","German"\n')
        })
    })
})
