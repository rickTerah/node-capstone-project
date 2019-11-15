const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const users = require('./routes/user.route');
const gifs = require('./routes/gif.route');
const categories = require('./routes/category.route');
const articles = require('./routes/article.route');


app.use(bodyParser.json());
app.use('/api', users);
app.use('/api', gifs);
app.use('/api', categories);
app.use('/api', articles);

const port = process.env.PORT || 2500;
const server = app.listen(port, console.log(`Listening to port ${port}...`));

module.exports = server;
