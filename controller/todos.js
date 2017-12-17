const User = require('../models/user')
const Todo = require('../models/todo');

class TodoController{
    static findAllTodo(req,res){
        console.log('masuk sini');
        User.findById(req.params.id).populate(['todoList'])
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
    static createTodo(req,res){
        User.findById(req.params.id)
        .then(user=>{
            console.log('ini data user===============',user);
            let newTodo = new Todo({
                task        : req.body.task,
                status      : req.body.status,
                importance  : req.body.importance
            })
            newTodo.save()
            .then(todo=>{
                console.log('ini data todo ==========',todo);
                user.todoList.push(todo._id) 
                user.save()
                .then(result=>{
                    res.status(200).json({msg:'added task to user', taskID: result})
                })
                .catch(err=>{
                    res.status(500).json({msg:'catch error in then newTODOs save' , err:err})
                })
            })
            .catch(err=>{
                res.status(500).json({err:err})
            })
        })
        .catch(err=>{
            res.status(500).json({err:err})
        })
    }
    static editTodo(req,res){
        Todo.findById(req.params.id)
        .then(todo=>{
            todo.task = req.body.task || todo.task
            todo.status = req.body.status || todo.status
            todo.importance = req.body.importance || todo.importance
            todo.save()
            .then(result=>{
                res.status(200).json({
                    msg     : 'task updated',
                    task    : result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error : err
                })
            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
    }
    static destroyTodo(req,res){
        Todo.findByIdAndRemove(req.params.id)
        .then(result=>{
            res.status(200).json({msg:"task deleted"})
        })
        .catch(err=>{
            res.status(500).json({err:err})
        })
    }
}


module.exports = TodoController;