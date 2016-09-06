
# CSV Writer

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

You can keep writing records to the same file by using `writeRecords` (but need to wait for the fulfillment
of the `promise` of the previous `writeRecords` call)

```js
Promise.resolve()
    .then(() => csvWriter.writeRecords(records1))
    .then(() => csvWriter.writeRecords(records2))
    ...
```

If you don't want to write a header raw, don't give `title` for header elements and just give field id as a string.

```js
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'path/to/write-file.csv',
    header: ['name', 'lang']
});
```

If each record is defined as an array, you `createArrayCsvWriter` to get an `csvWriter`.

```js
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const csvWriter = createCsvWriter({
    header: ['NAME', 'LANGUAGE'],
    path: 'path/to/file.csv'
});

var data = [
    ['Bob',  'French, English'],
    ['Mary', 'English']
];

csvWriter.writeRecords(data)       // returns a promise
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
you can use `createObjectCsvConverter` (or `createArrayCsvConverter`)
to get an `csvConverter`.

```js
const createCsvConverter = require('csv-writer').createObjectCsvConverter;
const csvConverter = createCsvConverter({
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'},
    ]
});

const records = [
    {name: 'Bob',  lang: 'French, English'},
    {name: 'Mary', lang: 'English'}
];

console.log(csvConverter.getHeaderString());
// => 'NAME,LANGUAGE\n'

console.log(csvConverter.convertRecords(records));
// => 'Bob,"French, English"\nMary,English\n'
```


## API

### createObjectCsvWriter

#### Parameters:

* params `<Object>`
  * path `<string>`

      Path to a write file

  * header `<Array<{id, title}|string>>`

      Array of object (`id` and `title` properties) or a string (`id`)

  * encoding `<string>` (optional)

#### Returns:

* `<CsvWriter>`


### createArrayCsvWriter

#### Parameters:

* params `<Object>`
  * path `<string>`

      Path to a write file

  * header `<Array<string>>` (optional)

      Array of field titles

  * encoding `<string>` (optional)

#### Returns:

* `<CsvWriter>`


### createObjectCsvConverter

#### Parameters:

* params `<Object>`
  * header `<Array<{id, title}|string>>`

      Array of object (`id` and `title` properties) or a string (`id`)

#### Returns:

* `<ObjectCsvConverter>`

### ObjectCsvConverter#getHeaderString()

#### Returns:

* `<string>`

### ObjectCsvConverter#converterRecords(records)

#### Parameters:

* records `<Array<Object>>`

#### Returns:

* `<string>`

### createArrayCsvConverter

#### Parameters:

* params `<Object>`
  * header `<Array<string>>` (optional)

      Array of field titles

#### Returns:

* `<ArrayCsvConverter>`

### ArrayCsvConverter#getHeaderString()

#### Returns:

* `<string>`

### ArrayCsvConverter#converterRecords(records)

#### Parameters:

* records `<Array<Array<string>>>`

#### Returns:

* `<string>`
