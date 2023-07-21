import {ArrayCsvStringifier} from './csv-stringifiers/array'
import {createFieldStringifier} from './field-stringifier'
import {ObjectCsvStringifier} from './csv-stringifiers/object'
import {ObjectStringifierHeader} from './record'

export interface ArrayCsvStringifierParams {
    header?: string[]
    fieldDelimiter?: string
    recordDelimiter?: string
    alwaysQuote?: boolean
}

export interface ObjectCsvStringifierParams {
    header: ObjectStringifierHeader
    fieldDelimiter?: string
    recordDelimiter?: string
    headerIdDelimiter?: string
    alwaysQuote?: boolean,
    shouldAddQuoteWhenEmpty?: boolean
}

export class CsvStringifierFactory {

    createArrayCsvStringifier(params: ArrayCsvStringifierParams) {
        const fieldStringifier = createFieldStringifier(params.fieldDelimiter, params.alwaysQuote)
        return new ArrayCsvStringifier(fieldStringifier, params.recordDelimiter, params.header)
    }

    createObjectCsvStringifier(params: ObjectCsvStringifierParams) {
        const fieldStringifier = createFieldStringifier(params.fieldDelimiter, params.alwaysQuote,params.shouldAddQuoteWhenEmpty)
        return new ObjectCsvStringifier(fieldStringifier, params.header, params.recordDelimiter, params.headerIdDelimiter)
    }

}
