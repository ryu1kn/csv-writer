const fs = require('fs');
const assert = require('assert');

exports.testFilePath = id => `./test-tmp/${id}.csv`;

exports.assertFile = (path, expectedContents, encoding) => {
    const actualContents = fs.readFileSync(path, encoding || 'utf8');
    assert.equal(actualContents, expectedContents);
};

exports.assertContain = (expectedSubstring, actualString) => {
    assert.ok(
        expectedSubstring.includes(actualString),
        `${actualString} does not contain ${expectedSubstring}`
    );
};
