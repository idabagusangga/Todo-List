const User = require('../models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

class Login{
    static createToken(req,res){
        if(req.body.email && req.body.password) {
          User.find({
              email : req.body.email
          })
          .then(user=>{
              console.log(req.body.password, 'ini password dari client');
              bcrypt.compare(req.body.password, user[0].password)
              .then(function(response) {
                console.log(response);
                if (response) {
                  let payload = {
                      id : user[0]._id,
                      email: user[0].email
                  }
                  let token = jwt.sign(payload,process.env.SECRET);
                  console.log(token);
                  res.status(200).json({token:token})
                } else {
                  res.status(500).json({msg:'wrong password'})
                }

              })
              .catch(err=>{
                  console.log(err);
              })
          })
          
          .catch(err=>{
              console.log(err);
              res.status(500).json({msg:'username not found', err:err})
          })
        }

    }
    static register (req, res) {
      let newUser = new User({
        email: req.body.email,
        password: req.body.password
      })
      newUser.save()
      .then(result => {
        res.status(200).json({
          msg: 'User created',
          user: result
        })
      })
      .catch(err => {
        res.status(500).json({
          err: err
        })
      })
    }
    static facebookLogin(req,res){
        User.find({
            email:req.body.email
        })
        .then(user =>{
            let payload = {
                id : user[0]._id,
                email:user[0].email
            }
            let token = jwt.sign(payload,process.env.SECRET)
            res.status(200).json({token:token})
        })
        .catch(err=>{
            let newUser = new User({
                username : req.body.username,
                password : req.body.password,
                email    : req.body.email
            })
            
            newUser.save()
            .then(result=>{
                let payload = {
                    id : result._id,
                    email:result.email
                }
                let token = jwt.sign(payload,process.env.SECRET)
                res.status(200).json({token:token})
                
                //belom di redirect
            })
            .catch(err=>{
                console.log(err);
            })
        })
    }
}

module.exports = Login;