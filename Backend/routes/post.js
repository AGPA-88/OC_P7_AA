const express = require('express');
const router = express.Router();

const postCtrl = require ('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Middleware

//GET
// router.get('/', auth, sauceCtrl.getSauces);  
// router.get('/:id', auth, sauceCtrl.getSauce);
router.get('/', postCtrl.getPosts);  
//router.get('/:id', postCtrl.getPosts);

//POST
router.post('/', postCtrl.createPost);
//router.post('/:id/like', auth, sauceCtrl.likeSauce);
//router.post('/', auth, multer, sauceCtrl.createSauce);

module.exports = router;
// //PUT
router.put('/update/:id', postCtrl.update);
// //router.put('/:id', auth, sauceCtrl.putSauce);
// router.put('/:id', auth, multer, sauceCtrl.putSauce);
// router.put('/:id', sauceCtrl.putSauce);

//DELETE
//router.delete('/:id', auth, postCtrl.deletePost);
router.delete('/:id', postCtrl.deletePost);

// //API Message
// router.use('/', sauceCtrl.apiMsg);
