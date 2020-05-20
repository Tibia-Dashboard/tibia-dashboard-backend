const fs = require('fs')
const axios = require('axios')

const players = fs
  .readFileSync('./players.txt', { encoding: 'utf-8' })
  .split(/\n/)

const savePlayer = async (name) => {
  try {
    const result = await axios.post('https://tibia-dashboard.herokuapp.com/player/' + name)
    console.log(result.data);
  } catch (err) {
    console.log('Erro no player', name)
  }
}

players.forEach(name => {
  savePlayer(name)
})
