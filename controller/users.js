const User = require('../models/user')

class UserController{
    static findAll(req,res){
        User.find()
        .then(users=>{
            res.status(200).json({title:"User Collection" , dataUser:users})
        })
        .catch(err=>{
            res.status(500).json({err: err})
        })
    }
    
    static createUser(req,res){
        let newUser = new User({
            username : req.body.username,
            password : req.body.password,
            email    : req.body.email
        })
        
        newUser.save()
        .then(user=>{
            res.status(200).json({message:"New User Created",userData:user})
        })
        .catch(err=>{
            res.status(200).json({err: err})
        })
    }
    
    static editUser(req,res){
        User.findById(req.params.id)
        .then(user=>{
            user.password = req.body.password || user.password
            
            user.save()
            .then(user=>{
                //user data ntar  harus  ilang. cuman  harus  nampilin message doang
                res.status(200).json({
                    msg:"Password Updated",
                    userData:user
                })
            })
            .catch(err=>{
                res.status(500).json({
                    err : err
                })
            })
        })
        .catch(err=>{
            res.status(500).json({
                err : err
            })
        })
    }
    static destroyUser(req,res){
        User.findByIdAndRemove(req.params.id)
        .then(result=>{
            res.status(200).json({msg:'user deleted'})
        })
        .catch(err=>{
            res.status(500).json({msg:'user not found'})
        })
    }
}


module.exports = UserController;