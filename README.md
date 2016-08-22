
# CSV Writer

## Usage

```js
var CsvWriter = require('csv-writer');
var writer = new CsvWriter({
    path: 'path/to/file.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'},
    ]
});

var data = [
    {name: 'Ryuichi', lang: 'Japanese, English'},
    {name: 'Michael', lang: 'English'}
];

data.reduce(function (promise, person) {
    return writer.write(person);
}, Promise.resolve());

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Ryuichi,"Japanese, English"
//   Michael,English
```

### Write multiple records at once

```js
var data = [
    {name: 'Ryuichi', lang: 'Japanese, English'},
    {name: 'Michael', lang: 'English'}
];

writer.writeRecords(data);     // return a promise

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Ryuichi,"Japanese, English"
//   Michael,English
```

## Future plans

### Write array

```js
var CsvWriter = require('csv-writer');
var writer = new CsvWriter({
    path: 'path/to/file.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'},
    ]
});

var data = [
    ['Ryuichi', 'Japanese, English'],
    ['Michael', 'English']
];

data.reduce(function (promise, record) {
    return writer.write(record);
}, Promise.resolve());

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Ryuichi,"Japanese, English"
//   Michael,English
```
