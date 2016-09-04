
# CSV Writer

## API

### createObjectRecordWriter

#### Parameters:

* params `<Object>`
  * path `<string>`

      Path to a write file

  * header `<Array<Object|string>>`

      Array of object (`id` and `title` properties) or a string (`id`)

  * encoding `<string>` (optional)

#### Returns:

* `<ObjectRecordWriter>`


### ObjectRecordWriter#writeRecords(records)

#### Parameters:

* records `<Array<Object>>`

#### Returns:

* `<Promise>`

#### Example:

```js
var createCsvWriter = require('.csv-writer').createObjectRecordWriter;
var writer = createCsvWriter({
    path: 'path/to/write-file.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'},
    ]
});

var data = [
    {name: 'Ryuichi', lang: 'Japanese, English'},
    {name: 'Michael', lang: 'English'}
];

writer.writeRecords(data);     // returns a promise

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Ryuichi,"Japanese, English"
//   Michael,English
```


### createArrayRecordWriter

#### Parameters:

* params `<Object>`
  * path `<string>`

      Path to a write file

  * encoding `<string>` (optional)

#### Returns:

* `<ArrayRecordWriter>`

### ArrayRecordWriter#writeRecords(records)

#### Parameters:

* records `<Array<Array>>`

#### Returns:

* `<Promise>`


#### Example:

```js
const createCsvWriter = require('csv-writer').createArrayRecordWriter;
const writer = createCsvWriter({
    path: 'path/to/write-file.csv'
});

var data = [    // Here, `data` is an array of arrays
    ['NAME', 'LANGUAGE'],
    ['Ryuichi', 'Japanese, English'],
    ['Michael', 'English']
];

writer.writeRecords(data);     // returns a promise

// This will produce a file path/to/write-file.csv with following contents:
//
//   NAME,LANGUAGE
//   Ryuichi,"Japanese, English"
//   Michael,English
```
