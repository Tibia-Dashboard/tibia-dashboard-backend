const express = require('express')
const app = express()
const axios = require('axios')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const CharacterLog = require('./models/CharacterLog')
const Character = require('./models/Character')

dotenv.config()

//DB connection
const db = process.env.MONGODB_URI
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

function getApiUrl(name) {
  return `https://api.tibiadata.com/v2/characters/${name}.json`
}

async function searchLogByCharId(id) {
  return CharacterLog.find({"character": id})
    .then(logs => {
      return logs
    })
}

//Ping test
app.get('/', (req, res) => {
  res.send('Pong.')
})

app.get('/log/update', async (req, res) => {

  const characters = await Character.find()
  const results = {}

  for (let i = 0; i < characters.length; i++) {
    try {
      const name = characters[i].name
      const url = getApiUrl(name)

      // Buscar na Tibia API
      const response = await axios.get(url) // Espera a resposta

      const status = response.data.characters.data.status

      // //Offline check
      // if (status == "offline") {
      //   CharacterLog.findOne({"log.characters.data.name": name})
      //   .then(charLog => {
      //     if (charLog.log.characters.data.status == "offline"){
      //       throw name
      //     }
      //   })
      // }

      const newCharacterLog = new CharacterLog({
        character: characters[i]._id,
        log: response.data
      })
      await newCharacterLog.save()
      results[name] = true
    } catch (error) {
        results[name] = false
    }
  }

  res.send({
    successes: Object.values(results).filter(status => status).length,
    failures: Object.values(results).filter(status => !status).length,
    players: results, 
  })

})

//Busca Logs do Personagem
app.get('/character/:name', async (req, res) => {
  const name = req.params.name

  Character.findOne({name})
    .then(async charId =>{
      const result = await searchLogByCharId(charId._id)
      res.send(result)
    })
    .catch(error => {
      res.status(500).send({
        type: 'INTERNAL_ERROR',
        message: 'Not possible to process your request. Try again later.',
      })
    })
  })

app.post('/player/:name', async function (req, res) {
  const name = req.params.name
  const url = getApiUrl(name)

  // Buscar na Tibia API
  const response = await axios.get(url) // Espera a resposta

  // Retornar player
  if (response.data.characters.hasOwnProperty('error')) {
    res.status(404).send({
      type: 'PLAYER_NOT_FOUND',
      message: 'Character not found',
    })
  } else {

    // TODO: Salvar no banco de dados
    const charName = response.data.characters.data.name

    Character.findOneAndUpdate(
      { name: charName },
      { $set: { name: charName } },
      { upsert: true, new: true, useFindAndModify: false }
    ).then(character => {
      res.send(character)
    })
      .catch(error => {
        res.status(500).send({
          type: 'INTERNAL_ERROR',
          message: 'Not possible to process your request. Try again later.',
        })
      })


  }
})

const port = process.env.PORT || 443
app.listen(port, () => console.log(`Server running on port ${port}.`))