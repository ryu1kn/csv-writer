import {ArrayCsvStringifier} from './csv-stringifiers/array';
import {ObjectCsvStringifier} from './csv-stringifiers/object';

const DEFAULT_ENCODING = 'utf8';
const DEFAULT_INITIAL_APPEND_FLAG = false;

export class CsvWriter {
    private _fs: any;
    private _path: string;
    private _csvStringifier: ArrayCsvStringifier | ObjectCsvStringifier;
    private _encoding: string;
    private _append: boolean;

    constructor(params) {
        this._fs = params.fs;
        this._path = params.path;
        this._csvStringifier = params.csvStringifier;
        this._encoding = params.encoding || DEFAULT_ENCODING;
        this._append = params.append || DEFAULT_INITIAL_APPEND_FLAG;
    }

    writeRecords(records) {
        const headerString = !this._append && this._csvStringifier.getHeaderString();
        const recordsString = this._csvStringifier.stringifyRecords(records);
        const writeString = (headerString || '') + recordsString;
        const option = this._getWriteOption();
        return this._write(writeString, option)
            .then(() => { this._append = true; });
    }

    _write(string, options) {
        return new Promise((resolve, reject) => {
            this._fs.writeFile(this._path, string, options, err => {
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
