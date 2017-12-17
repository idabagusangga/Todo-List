var express = require('express');
var router = express.Router();


const loginController = require('../controller/login');

router.post('/',loginController.createToken)



module.exports = router;