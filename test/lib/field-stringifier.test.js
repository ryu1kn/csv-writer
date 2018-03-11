
const expect = require('chai').expect;
const FieldStringifier = require('../../lib/field-stringifier');

describe('FieldStringifier', () => {
    const stringifier = new FieldStringifier();

    it('returns the same string', () => {
        expect(stringifier.stringify('VALUE')).to.eql('VALUE');
    });

    it('preserves the whitespace characters', () => {
        expect(stringifier.stringify(' VALUE\tA  ')).to.eql(' VALUE\tA  ');
    });

    it('wraps a field value with double quotes if the field contains comma', () => {
        expect(stringifier.stringify('VALUE,A')).to.eql('"VALUE,A"');
    });

    it('wraps a field value with double quotes if the field contains newline', () => {
        expect(stringifier.stringify('VALUE\nA')).to.eql('"VALUE\nA"');
    });

    it('wraps a field value with double quotes and escape the double quotes if they are used in the field', () => {
        expect(stringifier.stringify('VALUE"A')).to.eql('"VALUE""A"');
    });

    it('escapes double quotes even if double quotes are only on the both edges of the field', () => {
        expect(stringifier.stringify('"VALUE"')).to.eql('"""VALUE"""');
    });

    it('converts a number into a string', () => {
        expect(stringifier.stringify(1)).to.eql('1');
    });

    it('converts undefined into an empty string', () => {
        expect(stringifier.stringify()).to.eql('');
    });

    it('converts null into an empty string', () => {
        expect(stringifier.stringify(null)).to.eql('');
    });

    it('converts an object into toString-ed value', () => {
        const obj = {
            name: 'OBJECT_NAME',
            toString: function () { return `Name: ${this.name}`; }
        };
        expect(stringifier.stringify(obj)).to.eql('Name: OBJECT_NAME');
    });

    it('wraps a toString-ed field value with double quote if the value contains comma', () => {
        const obj = {
            name: 'OBJECT,NAME',
            toString: function () { return `Name: ${this.name}`; }
        };
        expect(stringifier.stringify(obj)).to.eql('"Name: OBJECT,NAME"');
    });

    it('escapes double quotes in a toString-ed field value if the value has double quotes', () => {
        const obj = {
            name: 'OBJECT_NAME"',
            toString: function () { return `Name: ${this.name}`; }
        };
        expect(stringifier.stringify(obj)).to.eql('"Name: OBJECT_NAME"""');
    });
});
