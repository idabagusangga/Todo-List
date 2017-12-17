const mongoose = require('mongoose');

let Schema = mongoose.Schema

let userSchema = new Schema({
    username: String,
    password: String,
    email   : String,
    todoList    : [{
        type:Schema.Types.ObjectId,
        ref :'Todo'
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;