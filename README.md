[![Build Status](https://travis-ci.org/ryu1kn/csv-writer.svg?branch=master)](https://travis-ci.org/ryu1kn/csv-writer) [![Code Climate](https://codeclimate.com/github/ryu1kn/csv-writer/badges/gpa.svg)](https://codeclimate.com/github/ryu1kn/csv-writer) [![Test Coverage](https://codeclimate.com/github/ryu1kn/csv-writer/badges/coverage.svg)](https://codeclimate.com/github/ryu1kn/csv-writer/coverage)

# CSV Writer

Convert objects/arrays into a CSV string or write them into a file.

## Prerequisite

* Node version 4 or above

## Usage

The example below shows how you can write records defined as the array of objects into a file.

```js
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'path/to/file.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'},
    ]
});

const records = [
    {name: 'Bob',  lang: 'French, English'},
    {name: 'Mary', lang: 'English'}
];

csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Bob,"French, English"
//   Mary,English
```

You can keep writing records into the same file by calling `writeRecords` multiple times
(but need to wait for the fulfillment of the `promise` of the previous `writeRecords` call).

```js
Promise.resolve()
    .then(() => csvWriter.writeRecords(records1))
    .then(() => csvWriter.writeRecords(records2))
    ...
```

However, if you need to keep writing large data to a certain file, you would want to create
node's transform stream and use `CsvStringifier`, which is explained later, inside it
, and pipe the stream into a file write stream.

If you don't want to write a header line, don't give `title` to header elements and just give field IDs as a string.

```js
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'path/to/file.csv',
    header: ['name', 'lang']
});
```

If each record is defined as an array, use `createArrayCsvWriter` to get an `csvWriter`.

```js
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const csvWriter = createCsvWriter({
    header: ['NAME', 'LANGUAGE'],
    path: 'path/to/file.csv'
});

const records = [
    ['Bob',  'French', 'English'],
    ['Mary', 'English']
];

csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Bob,"French, English"
//   Mary,English
```

If you just want to get a CSV string but don't want to write into a file,
you can use `createObjectCsvStringifier` (or `createArrayCsvStringifier`)
to get an `csvStringifier`.

```js
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const csvStringifier = createCsvStringifier({
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'},
    ]
});

const records = [
    {name: 'Bob',  lang: 'French, English'},
    {name: 'Mary', lang: 'English'}
];

console.log(csvStringifier.getHeaderString());
// => 'NAME,LANGUAGE\n'

console.log(csvStringifier.stringifyRecords(records));
// => 'Bob,"French, English"\nMary,English\n'
```


## API

### createObjectCsvWriter(params)

##### Parameters:

* params `<Object>`
  * path `<string>`

      Path to a write file

  * header `<Array<{id, title}|string>>`

      Array of objects (`id` and `title` properties) or strings (field IDs).
      A header line will be written to the file only if given as an array of objects.

  * encoding `<string>` (optional)

      Default: `utf8`.

  * append `<boolean>` (optional)

      Default: `false`. When `true`, it will append CSV records to the specified file.
      If the file doesn't exist, it will create one.

      **NOTE:** A header line will not be written to the file if `true` is given.

##### Returns:

* `<CsvWriter>`


### createArrayCsvWriter(params)

##### Parameters:

* params `<Object>`
  * path `<string>`

      Path to a write file

  * header `<Array<string>>` (optional)

      Array of field titles

  * encoding `<string>` (optional)

      Default: `utf8`.

  * append `<boolean>` (optional)

      Default: `false`. When `true`, it will append CSV records to the specified file.
      If the file doesn't exist, it will create one.

      **NOTE:** A header line will not be written to the file if `true` is given.

##### Returns:

* `<CsvWriter>`


### CsvWriter#writeRecords(records)

##### Parameters:

* records `<Array<Object|Array>>`

    Depending on which function was used to create a `csvWriter` (i.e. `createObjectCsvWriter` or `createArrayCsvWriter`),
    records will be either an array of objects or arrays

##### Returns:

* `<Promise>`


### createObjectCsvStringifier(params)

##### Parameters:

* params `<Object>`
  * header `<Array<{id, title}|string>>`

      Array of objects (`id` and `title` properties) or strings (field IDs)

##### Returns:

* `<ObjectCsvStringifier>`

### ObjectCsvStringifier#getHeaderString()

##### Returns:

* `<string>`

### ObjectCsvStringifier#stringifyRecords(records)

##### Parameters:

* records `<Array<Object>>`

##### Returns:

* `<string>`

### createArrayCsvStringifier(params)

##### Parameters:

* params `<Object>`
  * header `<Array<string>>` (optional)

      Array of field titles

##### Returns:

* `<ArrayCsvStringifier>`

### ArrayCsvStringifier#getHeaderString()

##### Returns:

* `<string>`

### ArrayCsvStringifier#stringifyRecords(records)

##### Parameters:

* records `<Array<Array<string>>>`

##### Returns:

* `<string>`
