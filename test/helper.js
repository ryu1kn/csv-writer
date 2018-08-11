const fs = require('fs');
const assert = require('assert');

exports.assertFile = (path, expectedContents, encoding) => {
    const actualContents = fs.readFileSync(path, encoding || 'utf8');
    assert.equal(actualContents, expectedContents);
};
