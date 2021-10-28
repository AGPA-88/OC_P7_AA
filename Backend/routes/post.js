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
router.post('/', auth, postCtrl.createPost);

module.exports = router;
// //PUT
router.put('/update/:id', auth, postCtrl.update);
// //router.put('/:id', auth, postCtrl.putSauce);
// router.put('/:id', auth, multer, postCtrl.putSauce);
// router.put('/:id', sauceCtrl.putSauce);

//DELETE
router.delete('/:id', auth, postCtrl.deletePost);

// //API Message
// router.use('/', sauceCtrl.apiMsg);
