const express = require('express');
const fileUpload = require('express-fileupload');
const GifController = require('../controllers/gif.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(fileUpload({
  useTempFiles: true,
}));


router.post('/', auth, GifController.postGif);

module.exports = router;
