
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

writer.writeRecords(data);     // returns a promise

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Ryuichi,"Japanese, English"
//   Michael,English
```

### Write array

```js
var CsvWriter = require('csv-writer');
var writer = new CsvWriter({
    path: 'path/to/file.csv'
});

var data = [    // Here, `data` is an array of arrays
    ['NAME', 'LANGUAGE'],
    ['Ryuichi', 'Japanese, English'],
    ['Michael', 'English']
];

writer.writeRecords(data);     // returns a promise

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Ryuichi,"Japanese, English"
//   Michael,English
```
