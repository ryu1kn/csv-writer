import {promisify} from './lang/promise';
import {writeFile} from 'fs';

const writeFilePromise = promisify(writeFile);

const DEFAULT_ENCODING = 'utf8';

export class FileWriter {

    constructor(private readonly path: string,
                private append: boolean,
                private readonly encoding = DEFAULT_ENCODING) {
    }

    async write(string: string): Promise<void> {
        await writeFilePromise(this.path, string, this.getWriteOption());
        this.append = true;
    }

    private getWriteOption() {
        return {
            encoding: this.encoding,
            flag: this.append ? 'a' : 'w'
        };
    }
}
