import {CsvWriter} from '../lib/csv-writer';
import {assertContain} from './helper';
import {mockType} from './helper';
import {CsvStringifier} from '../lib/csv-stringifiers/abstract';
import {Field} from '../lib/record';

describe('CsvWriter', () => {

    it('throws an error if file write failed', () => {
        const fs = {writeFile: function () {
            arguments[3](new Error('WRITE_FILE_ERROR'));
        }};
        const arrayCsvStringifier = mockType<CsvStringifier<Field[]>>({
            getHeaderString: () => 'HEADER_STRING',
            stringifyRecords: () => 'CSV_STRING'
        });
        const writer = new CsvWriter(arrayCsvStringifier,'FILE_PATH', fs);

        return writer.writeRecords([['RECORDS']]).then(
            () => new Error('Should have been failed'),
            e => {
                assertContain(e.message, 'WRITE_FILE_ERROR');
            }
        );
    });
});
