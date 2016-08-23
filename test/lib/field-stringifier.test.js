
const FieldStringifier = require('../../lib/field-stringifier');

describe('FieldStringifier', () => {

    it('returns the same string', () => {
        const stringifier = new FieldStringifier();
        expect(stringifier.stringify('VALUE')).to.eql('VALUE');
    });

    it('wraps a field value with double quotes if the field contains comma', () => {
        const stringifier = new FieldStringifier();
        expect(stringifier.stringify('VALUE,A')).to.eql('"VALUE,A"');
    });

    it('escapes double quotes if it is used on the edge of the field value', () => {
        const stringifier = new FieldStringifier();
        expect(stringifier.stringify('"VALUE')).to.eql('"""VALUE"');
    });

    it('does not double quote or escape double quotes if it is used not on the edge of the field value', () => {
        const stringifier = new FieldStringifier();
        expect(stringifier.stringify('VALUE"A')).to.eql('VALUE"A');
    });

    it('converts a number into a string', () => {
        const stringifier = new FieldStringifier();
        expect(stringifier.stringify(1)).to.eql('1');
    });

    it('converts undefined into an empty string', () => {
        const stringifier = new FieldStringifier();
        expect(stringifier.stringify()).to.eql('');
    });

    it('converts null into an empty string', () => {
        const stringifier = new FieldStringifier();
        expect(stringifier.stringify(null)).to.eql('');
    });

    it('converts an object into toString-ed value', () => {
        const stringifier = new FieldStringifier();
        const obj = {
            name: 'OBJECT_NAME',
            toString: function () { return `Name: ${this.name}`; }
        };
        expect(stringifier.stringify(obj)).to.eql('Name: OBJECT_NAME');
    });

    it('wraps a toString-ed field value with double quote if the value contains comma', () => {
        const stringifier = new FieldStringifier();
        const obj = {
            name: 'OBJECT,NAME',
            toString: function () { return `Name: ${this.name}`; }
        };
        expect(stringifier.stringify(obj)).to.eql('"Name: OBJECT,NAME"');
    });

    it('escapes double quotes in a toString-ed field value if the value has double quotes on the edge', () => {
        const stringifier = new FieldStringifier();
        const obj = {
            name: 'OBJECT_NAME"',
            toString: function () { return `Name: ${this.name}`; }
        };
        expect(stringifier.stringify(obj)).to.eql('"Name: OBJECT_NAME"""');
    });
});
