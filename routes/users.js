var express = require('express');
var router = express.Router();

const userController = require('../controller/users');

/* GET users listing. */
router.get('/', userController.findAll)
router.post('/register',userController.createUser)
router.post('/:id/edit',userController.editUser)
router.get('/:id/delete',userController.destroyUser)

module.exports = router;
