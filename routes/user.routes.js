const {Router} = require('express');
const userController = require('../controllers/user.controller.js');
const router = new Router();


router.get('/login', userController.login);
router.get('/profile', userController.profile);


module.exports = router;