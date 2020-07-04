const fs = require('fs')

exports.readFile = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) reject(err)
        else resolve(data)
    })
})
