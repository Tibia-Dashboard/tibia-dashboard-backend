const express = require('express')
const app = express()
const axios = require('axios')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

//DB connection
const db = process.env.MONGODB_URI
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

function getApiUrl (name) {
  return `https://api.tibiadata.com/v2/characters/${name}.json`
}

app.post('/player/:name', async function (req, res) {
  const name = req.params.name
  const url = getApiUrl(name)

  // Buscar na Tibia API
  const response = await axios.get(url) // Espera a resposta

  // TODO: Salvar no banco de dados

  // Retornar player

  if (response.data.characters.hasOwnProperty('error')) {
    res.status(404).send({ 
      type: 'PLAYER_NOT_FOUND',
      message: 'Character not found',
    })
  } else {
    res.send(response.data)
  }
})

app.listen(process.env.PORT || 443)

console.log('Server started')