const User = require('../models/user')
const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');
const moment = require('moment')

class TodoController{
    static findAllTodo(req,res){
        console.log('masuk sini');
        console.log(req.decoded);
        if(req.decoded){
        
        User.findById(req.decoded.id).populate(['todoList'])
        
        .then(user=>{

      res.status(200).json({

          msg: "user todo list",

          todo: user

      })

  })
                      .catch(err=>{
                          res.status(500).json({err:err})

}) 
    
        }
        else{
            res.status(500).json({msg:'please provide a valid token or log in'})
        }
        
    }
    static createTodo(req,res){
        let decoded = jwt.verify(req.body.token,process.env.SECRET)
        if(decoded){
            console.log(decoded);
            console.log(req.body);
            User.findById(decoded.id).populate(['todoList'])
            .then(user=>{
              
                let newTodo = new Todo ({
                    task : req.body.task,
                    status:'incomplete',
                    reminder: moment().add(Number(req.body.reminder), 'minutes').format()
                })
                // console.log(newTodo.importance);
                newTodo.save()
                .then(todo=>{
                    user.todoList.push(todo._id)
                    user.save()
                    .then(result=>{
                        User.findById(decoded.id).populate(['todoList'])
                        .then(userData => {
                          res.status(200).json({
                            userData: userData
                          })
                        })
                        .catch(err => {
                          console.log(err);
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                })
                .catch(err=>{
                    console.log(err);
                })
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    static editTodo(req,res){
        let decoded = jwt.verify(req.body.token,process.env.SECRET)
            console.log(decoded);
        Todo.findById(req.params.id)
        .then(todo=>{
            todo.task = req.body.task || todo.task
            todo.status = req.body.status || todo.status
            todo.reminder = moment().add(Number(req.body.reminder), 'minutes').format() || todo.reminder
            todo.save()
            .then(result=>{
                User.findById(decoded.id).populate(['todoList'])
                .then(response => {
                  res.status(200).json({
                    data: response
                  })
                })
                .catch(err => {
                  res.status(500).json({
                    err: err
                  })
                })
            })
            .catch(err=>{
                console.log(err)
              })
        })
        .catch(err=>{
            console.log(err);
        })
      
    }
    static destroyTodo(req,res){
        let decoded = jwt.verify(req.headers.token,process.env.SECRET)
            console.log(decoded);
        Todo.findByIdAndRemove(req.params.id)
        .then(result=>{
          User.findById(decoded.id).populate(['todoList'])
            .then(response => {
              res.status(200).json({
                data: response
              })
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err=>{
            res.status(500).json({err:err})
        })
    }
}


module.exports = TodoController;