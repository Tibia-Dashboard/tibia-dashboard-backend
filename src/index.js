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
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

function getApiUrl (name) {
  return `https://api.tibiadata.com/v2/characters/${name}.json`
}


app.post('/log', (req, res) => {

  

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

    Character.findOneAndUpdate({name: charName}, {$set: {name: charName}} ,{upsert: true, new: true, useFindAndModify: false})
      .then(character => {
        res.send(character)
      })
      .catch(error => {
         res.status(500).send({
            type: 'INTERNAL_ERROR',
            message: 'Not possible to process your request. Try again later.',
          })
        })

    // CharacterLog.findOne({"characters.data.name" : charName})
    // .then(character => {
    //   if (character) {
    //     res.status(400).send({
    //       type: 'CHARACTER_ALREADY_EXISTS',
    //       message: 'Character already exists',
    //     })
    //   } else {
    //     const newCharacter = new CharacterLog({
    //       log: response.data
    //     })
    //     newCharacter.save()
    //       .then(character => res.send(character))
    //       .catch(error => res.send({
    //         type: 'ERROR',
    //        message: error,
    //       }))        
    //   }
    // })
  }
})

const port = process.env.PORT || 443
app.listen(port, () => console.log(`Server running on port ${port}.`))
