
# CSV Writer

Convert objects/arrays into a CSV string or write them into a file.

## Prerequisite

* Node version 4 or above

## Usage

The example below shows how you can write records defined as the array of objects into a file.

```js
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'path/to/write-file.csv',
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

You can keep writing records into the same file by calling `writeRecords` multiple times (but need to wait for the fulfillment
of the `promise` of the previous `writeRecords` call)

```js
Promise.resolve()
    .then(() => csvWriter.writeRecords(records1))
    .then(() => csvWriter.writeRecords(records2))
    ...
```

If you don't want to write a header line, don't give `title` to header elements and just give field ids as a string.

```js
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'path/to/write-file.csv',
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

var records = [
    ['Bob',  'French, English'],
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

      Array of objects (`id` and `title` properties) or strings (field ids)

  * encoding `<string>` (optional)

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

      Array of objects (`id` and `title` properties) or strings (field ids)

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
