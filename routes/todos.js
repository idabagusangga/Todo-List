var express = require('express');
var router = express.Router();
const todoController = require('../controller/todos');
/* GET home page. */

//editTodo
router.post('/:id',todoController.editTodo)
router.delete('/:id',todoController.destroyTodo)


//deleteTodo


module.exports = router;
