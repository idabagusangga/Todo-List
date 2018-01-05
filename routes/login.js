var express = require('express');
var router = express.Router();


const loginController = require('../controller/login');

router.post('/',loginController.createToken)
router.post('/FB',loginController.facebookLogin)


module.exports = router;