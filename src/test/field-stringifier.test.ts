import * as assert from 'assert';
import {resolveDelimiterChar} from './helper/delimiter';
import {FieldStringifier} from '../lib/field-stringifier';

describe('FieldStringifier', () => {

    describe('When field delimiter is comma', generateTestCases(','));

    describe('When field delimiter is semicolon', generateTestCases(';'));

    function generateTestCases(fieldDelimiter: string) {
        const delim = resolveDelimiterChar(fieldDelimiter);
        return () => {
            const stringifier = new FieldStringifier(fieldDelimiter);

            it('returns the same string', () => {
                assert.equal(stringifier.stringify('VALUE'), 'VALUE');
            });

            it('preserves the whitespace characters', () => {
                assert.equal(stringifier.stringify(' VALUE\tA  '), ' VALUE\tA  ');
            });

            it(`wraps a field value with double quotes if the field contains "${delim}"`, () => {
                assert.equal(stringifier.stringify(`VALUE${delim}A`), `"VALUE${delim}A"`);
            });

            it('wraps a field value with double quotes if the field contains newline', () => {
                assert.equal(stringifier.stringify('VALUE\nA'), '"VALUE\nA"');
            });

            it('wraps a field value with double quotes and escape the double quotes if they are used in the field', () => {
                assert.equal(stringifier.stringify('VALUE"A'), '"VALUE""A"');
            });

            it('escapes double quotes even if double quotes are only on the both edges of the field', () => {
                assert.equal(stringifier.stringify('"VALUE"'), '"""VALUE"""');
            });

            it('converts a number into a string', () => {
                assert.equal(stringifier.stringify(1), '1');
            });

            it('converts undefined into an empty string', () => {
                assert.equal(stringifier.stringify(), '');
            });

            it('converts null into an empty string', () => {
                assert.equal(stringifier.stringify(null), '');
            });

            it('converts an object into toString-ed value', () => {
                const obj = {
                    name: 'OBJECT_NAME',
                    toString: function () { return `Name: ${this.name}`; }
                };
                assert.equal(stringifier.stringify(obj), 'Name: OBJECT_NAME');
            });

            it(`wraps a toString-ed field value with double quote if the value contains "${delim}"`, () => {
                const obj = {
                    name: `OBJECT${delim}NAME`,
                    toString: function () { return `Name: ${this.name}`; }
                };
                assert.equal(stringifier.stringify(obj), `"Name: OBJECT${delim}NAME"`);
            });

            it('escapes double quotes in a toString-ed field value if the value has double quotes', () => {
                const obj = {
                    name: 'OBJECT_NAME"',
                    toString: function () { return `Name: ${this.name}`; }
                };
                assert.equal(stringifier.stringify(obj), '"Name: OBJECT_NAME"""');
            });
        };
    }
});
