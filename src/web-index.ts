import {
    ArrayCsvStringifierParams,
    CsvStringifierFactory,
    ObjectCsvStringifierParams
} from './lib/csv-stringifier-factory'

const csvStringifierFactory = new CsvStringifierFactory()

export const createArrayCsvStringifier = (params: ArrayCsvStringifierParams) =>
        csvStringifierFactory.createArrayCsvStringifier(params)

export const createObjectCsvStringifier = (params: ObjectCsvStringifierParams) =>
        csvStringifierFactory.createObjectCsvStringifier(params)
