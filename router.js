var express = require('express')
var router = express.Router()
const collection = require('./mongodb')
const controller = require('./controller/routerController');

router.post('/login', controller.userLoginPost);
router.get('/signup', controller.signupPage);
router.post('/signup', controller.signupPost);
router.get('/dashboard', controller.dashboardPage);
router.get('/logout',controller.logOut);



module.exports = router