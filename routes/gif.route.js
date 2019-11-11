const express = require('express');
const fileUpload = require('express-fileupload');
const GifController = require('../controllers/gif.controller');
const GifCommentController = require('../controllers/gifComment.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(fileUpload({
  useTempFiles: true,
}));


router.post('/', auth, GifController.postGif);
router.get('/', auth, GifController.getAllgifs);
router.get('/:gifId', auth, GifController.getSingleGif);
router.delete('/:gifId', auth, GifController.deleteGif);
router.post('/:gifId/comment', auth, GifCommentController.writeComment);

module.exports = router;
