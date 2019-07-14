import {promisify} from '../../lib/lang/promise';
import {strictEqual} from 'assert';
import {assertRejected} from '../helper';

describe('Promise', () => {
    const greetAsync = (name: string, callback: (err: Error | null, result?: string) => void) => {
        setTimeout(() => {
            if (name === 'foo') callback(null, `Hello, ${name}!`);
            else callback(new Error(`We don't know ${name}`));
        }, 0);
    };
    const promisifiedFn = promisify(greetAsync);

    it('promisify node style callback', async () => {
        strictEqual(await promisifiedFn('foo'), 'Hello, foo!');
    });

    it('raise an error for error', async () => {
        await assertRejected(promisifiedFn('bar'), "We don't know bar");
    });
});
