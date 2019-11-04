const express = require('express');
const fileUpload = require('express-fileupload');
const GifController = require('../controllers/gif.controller');

const router = express.Router();

router.use(fileUpload({
  useTempFiles: true,
}));


router.post('/', GifController.postGif);

module.exports = router;
