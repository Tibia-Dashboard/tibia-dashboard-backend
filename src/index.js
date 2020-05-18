const express = require('express')
const app = express()

app.geta('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000)

console.log('Server started')