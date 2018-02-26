const mongoose = require('mongoose');

let Schema = mongoose.Schema

let todoSchema = new Schema({
    task        : String,
    status      : String,
    importance  : String,
    reminder    : String,
    createdAt   : {
        type    : Date,
        default : new Date()
    }
})

const Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo;