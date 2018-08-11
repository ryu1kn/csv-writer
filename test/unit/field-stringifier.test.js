
const assert = require('assert');
const FieldStringifier = require('../../lib/field-stringifier');

describe('FieldStringifier', () => {
    const stringifier = new FieldStringifier();

    it('returns the same string', () => {
        assert.equal(stringifier.stringify('VALUE'), 'VALUE');
    });

    it('preserves the whitespace characters', () => {
        assert.equal(stringifier.stringify(' VALUE\tA  '), ' VALUE\tA  ');
    });

    it('wraps a field value with double quotes if the field contains comma', () => {
        assert.equal(stringifier.stringify('VALUE,A'), '"VALUE,A"');
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

    it('wraps a toString-ed field value with double quote if the value contains comma', () => {
        const obj = {
            name: 'OBJECT,NAME',
            toString: function () { return `Name: ${this.name}`; }
        };
        assert.equal(stringifier.stringify(obj), '"Name: OBJECT,NAME"');
    });

    it('escapes double quotes in a toString-ed field value if the value has double quotes', () => {
        const obj = {
            name: 'OBJECT_NAME"',
            toString: function () { return `Name: ${this.name}`; }
        };
        assert.equal(stringifier.stringify(obj), '"Name: OBJECT_NAME"""');
    });
});
