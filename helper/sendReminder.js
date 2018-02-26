const UserModel = require('../models/user')
const moment = require('moment')
const Mailer = require('../mailer')

class CronMailer {
  static reminder () {
    UserModel.find().populate(['todoList'])
    .then(result => {
      for(let i = 0; i < result.length;i++) {
        for(let j = 0; j < result[i].todoList.length; j++){
          console.log(result[i].todoList[j].reminder);
          if(result[i].todoList[j].reminder == moment().format()){
            let mail = new Mailer (result[i].email, result[i].username)
            console.log('sent email to: ', result[i].email);
          }
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = CronMailer;