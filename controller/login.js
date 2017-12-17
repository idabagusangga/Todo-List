const User = require('../models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')

class Login{
    static createToken(req,res){
        console.log('------------------------------');
        User.find({
            username : req.body.username
        })
        .then(user=>{
            console.log(user[0].username);
            console.log('masuk then login',user[0].password," ",req.body.password);
            
            if(user[0].password == req.body.password){
                console.log('masuk if');
                let payload = {
                    id         : user[0]._id,
                    username   : user[0].username
                }
                console.log(payload);
                let token = jwt.sign(payload,process.env.SECRET)

                res.status(200).json({msg:'token created',token:token})
            }else{
                res.status(401).json({msg:"incorrect password"})
            }
        })
        .catch(err=>{
            res.status(500).json({msg:'username not found', err:err})
        })
    }
}

module.exports = Login;