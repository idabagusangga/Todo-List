const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.pre('save',function(callback){
    let plainPassword = this.password
    bcrypt.hash(plainPassword,10)
    .then(hash=>{
        this.password = hash
        callback()
    })
    .catch(callback)
})




const User = mongoose.model('User', userSchema);

module.exports = User;