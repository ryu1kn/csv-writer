import * as assert from 'assert';

const fs = require('fs');

export const testFilePath = id => `./test-tmp/${id}.csv`;

export const assertFile = (path, expectedContents, encoding?) => {
    const actualContents = fs.readFileSync(path, encoding || 'utf8');
    assert.equal(actualContents, expectedContents);
};

export const assertContain = (expectedSubstring, actualString) => {
    assert.ok(
        expectedSubstring.includes(actualString),
        `${actualString} does not contain ${expectedSubstring}`
    );
};
