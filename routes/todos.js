var express = require('express');
var router = express.Router();
const todoController = require('../controller/todos');
const Checker = require('../helper/authenticate');
/* GET home page. */

//editTodo
router.get('/',Checker.authenticate,todoController.findAllTodo)
router.post('/:id',todoController.editTodo)
router.delete('/:id',todoController.destroyTodo)
router.post('/',todoController.createTodo)


//deleteTodo


module.exports = router;
