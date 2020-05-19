const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CharacterSchema = new Schema({
  characters: {
    data: {
      name: {
        type: String
      },
      title: {
        type: String
      },
      sex: {
        type: String
      },
      vocation: {
        type: String
      },
      level: {
        type: Number
      },
      achievement_points: {
        type: Number
      },
      world: {
        type: String
      },
      residence: {
        type: String
      },
      married_to: {
        type: String
      },
      guild: {
        name: {
          type: String
        },
        rank: {
          type: String
        }
      },
      last_login: {
        type: []
      },
      account_status: {
        type: String
      },
      status: {
        type: String
      }
    },
    achievements: {
      type: []
    },
    deaths: {
      type: []
    },
    account_information: {
      loyalty_title: {
        type: String
      },
      created: {
        date: {
          type: Date
        },
        timezone_type: {
          type: Number
        },
        timezone: {
          type: String
        }
      }
    },
    other_characters: {
      type: []
    }
  },
  information: {
    api_version: {
      type: Number
    },
    execution_time: {
      type: Number
    },
    last_updated: {
      type: Date
    },
    timestamp: {
      type: Date
    }
  }
})

module.exports = Character = mongoose.model('character', CharacterSchema)