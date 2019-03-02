import * as assert from 'assert';

const fs = require('fs');

export const testFilePath = (id: string) => `./test-tmp/${id}.csv`;

export const assertFile = (path: string, expectedContents: string, encoding?: string) => {
    const actualContents = fs.readFileSync(path, encoding || 'utf8');
    assert.equal(actualContents, expectedContents);
};

export const assertContain = (expectedSubstring: string, actualString: string) => {
    assert.ok(
        expectedSubstring.includes(actualString),
        `${actualString} does not contain ${expectedSubstring}`
    );
};

export function mockType<T>(params?: any): T {
    return Object.assign({} as T, params);
}
