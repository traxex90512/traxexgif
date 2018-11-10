var express = require('express');
var router = express.Router();

var loginController = require('../controllers/loginController');


/* ahaha pages */
router.get('/', loginController.index);
router.get('/login', loginController.login);
router.post('/main', loginController.main);
router.post('/signup', loginController.signup);
router.get('/register', loginController.register);
router.post('/fileUpload', loginController.upload);

module.exports = router;