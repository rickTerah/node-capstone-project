const express = require('express');
const fileUpload = require('express-fileupload');
const GifController = require('../controllers/gif.controller');
const GifCommentController = require('../controllers/gifComment.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(fileUpload({
  useTempFiles: true,
}));


router.post('/v1/gifs', auth, GifController.postGif);
router.get('/v1/gifs', auth, GifController.getAllgifs);
router.get('/v1/gifs/:gifId', auth, GifController.getSingleGif);
router.delete('/v1/gifs/:gifId', auth, GifController.deleteGif);
router.post('/v1/gifs/:gifId/comment', auth, GifCommentController.writeComment);

module.exports = router;
