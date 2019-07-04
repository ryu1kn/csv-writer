import {promisify} from '../../lib/lang/promise';
import {strictEqual} from 'assert';

describe('Promise', () => {
    const greetAsync = (name: string, callback: (err: Error | null, result?: string) => void) => {
        setTimeout(() => {
            if (name === 'foo') callback(null, `Hello, ${name}!`);
            else callback(new Error(`We don't know ${name}`));
        }, 0);
    };

    it('promisify node style callback', async () => {
        const promisifiedFn = promisify(greetAsync);
        strictEqual(await promisifiedFn('foo'), 'Hello, foo!');
    });

    it('raise an error for error', () => {
        const promisifiedFn = promisify(greetAsync);
        return promisifiedFn('bar').then(
            () => new Error('Should not have been called'),
            (e: Error) => { strictEqual(e.message, "We don't know bar"); }
        );
    });
});
