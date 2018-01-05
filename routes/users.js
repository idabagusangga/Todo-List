var express = require('express');
var router = express.Router();

const userController = require('../controller/users');
const todoController = require('../controller/todos');

/* GET users listing. */
router.get('/', userController.findAll)

router.post('/register',userController.createUser)

router.post('/profile',userController.findUser)
router.put('/:id/edit',userController.editUser)
router.delete('/:id/delete',userController.destroyUser)


module.exports = router;
