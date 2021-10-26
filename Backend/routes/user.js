const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.getUsers);  
router.get('/:id', userCtrl.getUser);
router.put('/update/:id', userCtrl.update);
router.delete('/:id',userCtrl.delete)

module.exports = router;