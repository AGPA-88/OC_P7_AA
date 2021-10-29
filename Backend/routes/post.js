const express = require('express');
const router = express.Router();

const postCtrl = require ('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Middleware

//GET
router.get('/:id', auth, postCtrl.getPost);
router.get('/', auth, postCtrl.getPosts);  


//POST
router.post('/', auth, multer, postCtrl.createPost);

module.exports = router;
// //PUT
router.put('/update/:id', auth, multer, postCtrl.update);

//DELETE
router.delete('/:id', auth, postCtrl.deletePost);
