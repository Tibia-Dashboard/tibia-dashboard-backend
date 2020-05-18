const express = require('express')
const app = express()
const axios = require('axios')

function getApiUrl (name) {
  return `https://api.tibiadata.com/v2/characters/${name}.json`
}

app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/player/:name', async function (req, res) {
  const name = req.params.name
  const url = getApiUrl(name)

  // Buscar na Tibia API
  const response = await axios.get(url) // Espera a resposta

  // TODO: Salvar no banco de dados

  // Retornar player
  res.send(response.data)
})

app.listen(3000)

console.log('Server started')