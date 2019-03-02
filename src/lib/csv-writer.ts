import {AbstractCsvStringifier} from './csv-stringifiers/abstract';

interface FileWriteOption {
    encoding?: string | null;
    mode?: number | string;
    flag?: string;
}

const DEFAULT_ENCODING = 'utf8';
const DEFAULT_INITIAL_APPEND_FLAG = false;

export class CsvWriter<T> {
    private readonly fs: any;
    private readonly path: string;
    private readonly csvStringifier: AbstractCsvStringifier<T>;
    private readonly encoding: string;
    private append: boolean;

    constructor(csvStringifier: AbstractCsvStringifier<T>, path: string, fs: any, encoding?: string, append?: boolean) {
        this.fs = fs;
        this.path = path;
        this.csvStringifier = csvStringifier;
        this.encoding = encoding || DEFAULT_ENCODING;
        this.append = append || DEFAULT_INITIAL_APPEND_FLAG;
    }

    writeRecords(records: T[]): Promise<void> {
        const headerString = !this.append && this.csvStringifier.getHeaderString();
        const recordsString = this.csvStringifier.stringifyRecords(records);
        const writeString = (headerString || '') + recordsString;
        const option = this.getWriteOption();
        return this.write(writeString, option)
            .then(() => { this.append = true; });
    }

    private write(string: string, options: FileWriteOption) {
        return new Promise((resolve, reject) => {
            this.fs.writeFile(this.path, string, options, (err: Error) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    private getWriteOption() {
        return {
            encoding: this.encoding,
            flag: this.append ? 'a' : 'w'
        };
    }
}
