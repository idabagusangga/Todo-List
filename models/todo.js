const mongoose = require('mongoose');

let Schema = mongoose.Schema

let todoSchema = new Schema({
    user        :{
        type    : Schema.Types.ObjectId,
        ref     : 'User'
    },
    task        : String,
    status      : String,
    importance  : String,
    createdAt   : {
        type    : Date,
        default : new Date()
    }
})

const Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo;