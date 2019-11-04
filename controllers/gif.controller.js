require('dotenv').config();
const cloudinary = require('cloudinary');
const generateId = require('../starters/identity');
require('../models/db/gif')();
const db = require('../models/db/index');


cloudinary.config({
  cloud_name: 'terahpatrick',
  api_key: '895228937862312',
  api_secret: 'MxRRWkDUgcXya-RaSafuEaxKlMU',
});

class GifController {
  static async postGif(req, res) {
    const file = req.files.image;
    if (!file) return res.status(200).json({ message: 'Image is required' });

    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'title is required' });

    const gifcloud = await cloudinary.v2.uploader.upload(file.tempFilePath);
    const { secure_url: secureUrl, created_at: createdOn, public_id: publicId } = gifcloud;

    const identity = generateId(100000);

    const createdBy = req.user.email;

    await db.query(
      `INSERT INTO gifs (gifId, title, imageUrl, createdOn, publicId, createdBy) 
        VALUES ($1, $2, $3, $4, $5, $6)`,
      [identity, title, secureUrl, createdOn, publicId, createdBy],
    );
    return res.status(201).json({
      status: 'sucess',
      data: {
        gifId: identity,
        message: 'GIF image successfully posted.',
        createdOn,
        title,
        imageUrl: secureUrl,
        createdBy,
      },
    });
  }
}


module.exports = GifController;
