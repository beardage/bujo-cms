
var mongoose = require('mongoose')

// Define collection and schema for task item

var task = new mongoose.Schema({
  name: {
    type: String
  },

  done: {
    type: Boolean
  }
},

  {
    collection: 'tasks'
  }
)

module.exports = mongoose.model('Task', task)
