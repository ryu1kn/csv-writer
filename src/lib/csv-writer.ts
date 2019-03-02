import {AbstractCsvStringifier} from './csv-stringifiers/abstract';

interface FileWriteOption {
    encoding?: string | null;
    mode?: number | string;
    flag?: string;
}

const DEFAULT_ENCODING = 'utf8';
const DEFAULT_INITIAL_APPEND_FLAG = false;

export class CsvWriter<T> {
    private readonly _fs: any;
    private readonly _path: string;
    private readonly _csvStringifier: AbstractCsvStringifier<T>;
    private readonly _encoding: string;
    private _append: boolean;

    constructor(csvStringifier: AbstractCsvStringifier<T>, path: string, fs: any, encoding?: string, append?: boolean) {
        this._fs = fs;
        this._path = path;
        this._csvStringifier = csvStringifier;
        this._encoding = encoding || DEFAULT_ENCODING;
        this._append = append || DEFAULT_INITIAL_APPEND_FLAG;
    }

    writeRecords(records: T[]): Promise<void> {
        const headerString = !this._append && this._csvStringifier.getHeaderString();
        const recordsString = this._csvStringifier.stringifyRecords(records);
        const writeString = (headerString || '') + recordsString;
        const option = this._getWriteOption();
        return this._write(writeString, option)
            .then(() => { this._append = true; });
    }

    _write(string: string, options: FileWriteOption) {
        return new Promise((resolve, reject) => {
            this._fs.writeFile(this._path, string, options, (err: Error) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    _getWriteOption() {
        return {
            encoding: this._encoding,
            flag: this._append ? 'a' : 'w'
        };
    }

}
