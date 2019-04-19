import {CsvStringifier} from './csv-stringifiers/abstract';
import {FileWriter} from './file-writer';

const DEFAULT_INITIAL_APPEND_FLAG = false;

export class CsvWriter<T> {
    private readonly csvStringifier: CsvStringifier<T>;
    private readonly fileWriter: FileWriter;
    private append: boolean;

    constructor(csvStringifier: CsvStringifier<T>, path: string, encoding?: string, append?: boolean) {
        this.append = append || DEFAULT_INITIAL_APPEND_FLAG;
        this.fileWriter = new FileWriter(path, this.append, encoding);
        this.csvStringifier = csvStringifier;
    }

    async writeRecords(records: T[]): Promise<void> {
        const recordsString = this.csvStringifier.stringifyRecords(records);
        const writeString = this.headerString + recordsString;
        await this.fileWriter.write(writeString);
        this.append = true;
    }

    private get headerString(): string {
        const headerString = !this.append && this.csvStringifier.getHeaderString();
        return headerString || '';
    }
}
