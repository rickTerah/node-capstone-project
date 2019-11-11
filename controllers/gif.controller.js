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
    if (!file) return res.status(404).json({ message: 'Image is required' });

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

  static async deleteGif(req, res) {
    const { gifId } = req.params;

    const gif = await db.query(`SELECT * FROM gifs WHERE gifId = ${gifId}`);
    if (gif.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        error: 'gif with the specified gifId NOT found',
      });
    }

    if (gif.rows[0].createdby !== req.user.email) {
      return res.status(403).json({
        status: 'error',
        message: 'You cannot delete this Gif',
      });
    }

    await cloudinary.v2.uploader.destroy(gif.rows[0].publicid);


    await db.query(`DELETE FROM gifs WHERE gifId = ${gifId}`);
    if (gif.rowCount === 0) return res.status(404).json({ message: 'Gif Not Found' });
    return res.status(202).json({
      status: 'success',
      data: {
        message: 'Gif post successfully deleted',
      },
    });
  }

  static async getAllgifs(req, res) {
    const gifs = await db.query('SELECT * FROM gifs ORDER BY createdOn DESC');
    res.status(200).json({
      status: 'Success',
      data: gifs.rows,
    });
  }

  static async getSingleGif(req, res) {
    const { gifId } = req.params;
    const gif = await db.query(`SELECT * FROM gifs WHERE gifId = ${gifId}`);
    if (gif.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        error: 'Gif with the specified gifId NOT found',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: gif.rows[0],
    });
  }
}


module.exports = GifController;
